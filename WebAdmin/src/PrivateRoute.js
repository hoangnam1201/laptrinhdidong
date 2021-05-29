import React, { useReducer } from "react";
import reducer from "./reducers/Reducer";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useReducer(reducer);
  let user = state;
  return (
    <Route {...rest}>
      {user ? <Component /> : <Redirect to={{ pathname: "/login" }} />}
    </Route>
  );
};
export default PrivateRoute;
