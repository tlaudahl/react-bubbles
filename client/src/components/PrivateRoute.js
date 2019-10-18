import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest}) {
    return (
        <div>
            <Route {...rest} render={props => {
                if(localStorage.getItem('token')) {
                    return <Component {...props} />
                } else {
                    return <Redirect to='/' />
                }
            }} />
        </div>
    )
}
