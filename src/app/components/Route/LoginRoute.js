import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginLayout from 'app/layouts/LoginLayout';

const LoginRoute = ({component,...props}) => {
    const Component = component;
    return (
        <Route {...props} render={ matchProps => (
            <LoginLayout>
                <div>
                    <Component {...matchProps}></Component>
                </div>
            </LoginLayout>
        )} />
    )
}

export default LoginRoute;