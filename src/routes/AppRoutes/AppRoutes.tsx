import  { Suspense, lazy } from "react";
import { Switch, Redirect } from "react-router-dom";
import {ProtectedRoute, AuthRoute } from "../RouteWrapper";
import Spinner from "../../components/shared/spinner/Spinner";
import { IUserDataLocalStorage } from "../../services/authServices";
const Login = lazy(() => import("../../containers/auth/login/Login"));
const RegisterUser = lazy(() => import("../../containers/auth/register-user/RegisterUser"));
const Dashboard = lazy(() => import("../../containers/dashboard/Dashboard"));

// const NotFoundPage = lazy(() =>
//   import("../../containers/NotFoundPage/NotFoundPage")
// );

const AppRoutes = ({ user }:{user: IUserDataLocalStorage | null}) => {
  return (
    <Suspense fallback={<Spinner isCenter={true} />}>
      <Switch>
        <AuthRoute path="/login" component={Login} user={user} />
        <AuthRoute path="/register" component={RegisterUser} user={user} />

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
