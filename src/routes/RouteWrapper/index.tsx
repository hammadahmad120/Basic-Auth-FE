import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { IUserDataLocalStorage } from "../../services/authServices";

interface WrapperProps {
  path: string;
  user: IUserDataLocalStorage | null;
}

interface AuthRouteProps extends WrapperProps{
  component: FunctionComponent<RouteComponentProps>;
}

interface ProtectedRouteProps extends WrapperProps{
  component: FunctionComponent<RouteComponentProps>;
}

export const ProtectedRoute = ({ path, component: Component, user }:ProtectedRouteProps) => {
  return (
    <Route
      path={path}
      exact
      render={(props) => {
        const isAuthenticated = !!user; // if user authenticated then allow to visit page, otherwise redirect to login
        //console.log("Props",props)
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export const AuthRoute = ({ path, component: Component, user }:AuthRouteProps) => {
  return (
    <Route
      path={path}
      exact
      render={(props) => {
        const isAuthenticated = !!user; // if already authenticated(logged in) then redirect to home page if try to visit login/signup
        if (isAuthenticated) {
          return <Redirect to="/dashboard" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
