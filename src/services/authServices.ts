import Axios from "./axiosConfig";

export interface IDataLocalStorage {
  token: string;
  userData: IUserDataLocalStorage
}

export interface IUserDataLocalStorage {
  sub: string;
  email: string;
}

export function userLogin(email: string, password: string) {
  const rqstBody = {
    email: email,
    password: password,
  };
  return Axios.post("/auth/login", rqstBody, {
    headers: { "Content-Type": "application/json" },
  });
}

export function setUserToLocalStorage({ token, ...user }:IDataLocalStorage) {
  localStorage.setItem("token", token);
  localStorage.setItem("userData", JSON.stringify(user));
}

export function getLoggedInUser(): IUserDataLocalStorage | null {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) as IUserDataLocalStorage : null ;
  // return  valid token if it is in local storage
  if (token && userData) {
    return userData;
  } else return null;
}

export function getUserToken() : string{
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else return "";
}

export function clearUserStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
}
export function userLogout(redirectLocation = "/login") {
  clearUserStorage();
  window.location.replace(redirectLocation);
}
