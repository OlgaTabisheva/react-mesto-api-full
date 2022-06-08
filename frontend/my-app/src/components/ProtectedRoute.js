import React from "react";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
  return (
    <Route>
      {() => {
        console.log(props.isLoggedIn)
        return props.isLoggedIn ? <Component {...props} /> : <Redirect to="./sign-in"/>
      }
      }
    </Route>
  );
};

export default ProtectedRoute;