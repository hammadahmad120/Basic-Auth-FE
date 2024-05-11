import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {ProtectedRoute, AuthRoute } from "../RouteWrapper";
import Spinner from "../../components/shared/spinner/Spinner";
import { IUserDataLocalStorage } from "../../services/authServices";
const Login = lazy(() => import("../../containers/auth/login/Login"));
const Dashboard = lazy(() => import("../../containers/dashboard/Dashboard"));

// const NotFoundPage = lazy(() =>
//   import("../../containers/NotFoundPage/NotFoundPage")
// );

const AppRoutes = ({ user }:{user: IUserDataLocalStorage | null}) => {
  return (
    <Suspense fallback={<Spinner isCenter={true} />}>
      <Switch>
        <AuthRoute path="/login" component={Login} user={user} />

        <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          user={user}
        />

        {/* <Route path="/not-found" component={NotFoundPage} /> */}
        <Redirect from="/" to="/login" exact />
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
