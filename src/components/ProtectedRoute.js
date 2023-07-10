import React from "react";
import {Navigate, Route} from "react-router-dom";

const ProtectedRoute = ({loggedIn, children, path, exact}) => {
    return (
        <Route exact path={path}>
            {loggedIn ? children : <Navigate to="/sign-in"/>}
        </Route>
    )
}

export default ProtectedRoute;