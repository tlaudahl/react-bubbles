import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const newArr = colors.map(color => {
          if(color.id === colorToEdit.id) {
            return colorToEdit
          } else {
            return color;
          }
        })
        updateColors(newArr);
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    // console.log(color);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(item => item.id !== res.data));
        setEditing(false);
      })
      .catch(err => console.log(err))
  };


  const handleNewColor = e => {
    if(e.target.name === 'code') {
      setNewColor({
        ...newColor,
        code: {
          hex: e.target.value
        }
      })
    } else if (e.target.name === 'color') {
      setNewColor({
        ...newColor,
        [e.target.name]: e.target.value
      })
    }
  }


  const addNewColor = e => {
    e.preventDefault();
    console.log(newColor);
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err));
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} >
            
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
            <span id='colorSpan' onClick={() => editColor(color)}>
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addNewColor} className='newColor'>
        <label>Add New Color</label>
        <input type='text' name='color' placeholder='Color Name...' onChange={handleNewColor} />
        <input type='text' name='code' placeholder='Color Hex Code...' onChange={handleNewColor} />
        <button>Add Color!</button>
      </form>
    </div>
  );
};

export default ColorList;
