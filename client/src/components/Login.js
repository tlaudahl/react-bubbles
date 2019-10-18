import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({});



  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage')
      })
      .catch(err => console.log(err));
  }


  return (
    <div className='loginPage'>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='Username...' onChange={handleChange} />
        <input type='text' name='password' placeholder='Password...' onChange={handleChange} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
