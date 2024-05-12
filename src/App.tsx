import { FC, ReactElement } from "react";
import AppRoutes from "./routes/AppRoutes/AppRoutes";
import UserContextPovider from "./components/context/UserContextProvider";
import { getLoggedInUser } from "./services/authServices";

const App: FC = (): ReactElement => {
  const loggedInUser = getLoggedInUser();
  return (
    <>
      <UserContextPovider user={loggedInUser}>
        <AppRoutes user={loggedInUser} />
      </UserContextPovider>
    </>
  );
};

export default App;
