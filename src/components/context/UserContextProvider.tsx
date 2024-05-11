import React from "react";
import { IUserDataLocalStorage, getLoggedInUser } from "../../services/authServices";

interface UserContextProviderProps{
    user: IUserDataLocalStorage | null;
}
const UserContext = React.createContext(getLoggedInUser());

const UserContextPovider: React.FC<React.PropsWithChildren<UserContextProviderProps>> = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContextPovider;
