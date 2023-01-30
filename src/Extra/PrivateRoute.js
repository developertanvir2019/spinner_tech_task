import React, { useEffect, useState } from 'react';
import { Route, Router } from 'react-router-dom';
import Login from '../pages/authentication/Login';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = await Login();
                setIsAuthenticated(true);
                // Store the JWT in local storage or a cookie for future requests
                localStorage.setItem('token', token);
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    return (
        <Router>
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        props.history.push('/login')
                    )
                }
            />
        </Router>
    );
};

export default PrivateRoute;



