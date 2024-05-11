import Axios from "./axiosConfig";

export interface IDataLocalStorage extends IUserDataLocalStorage {
  token: string;
}

export interface IUserDataLocalStorage {
  sub: string;
  email: string;
}

interface LoginResponse {
  accessToken:string;
  userId: string;
  email: string;
  name: string;
}

export const userLogin = async(email: string, password: string):Promise<LoginResponse> => {
  const rqstBody = {
    email: email,
    password: password,
  };
  try{
  const res = await Axios.post("/auth/login", rqstBody, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data as LoginResponse;
}catch(err){
 return Promise.reject(err);
}
}

export const setUserToLocalStorage =({ token, ...user }:IDataLocalStorage) => {
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
