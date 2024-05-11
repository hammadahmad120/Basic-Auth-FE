import axios,{AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import { getUserToken, userLogout } from "../services/authServices";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});


export const AuthAxios = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

AuthAxios.defaults.headers["content-type"] = "application/json";
AuthAxios.defaults.headers["accept"] = "application/json";
AuthAxios.defaults.headers["authorization"] = `Bearer ${getUserToken()}`;

AuthAxios.interceptors.request.use((req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // if user is logged in from some other tab with some other account then token will be different and we reload to update token in current tab as well
  if (req.headers["authorization"] !== `Bearer ${getUserToken()}`) {
    window.location.replace("/dashboard");
  }
    return req;
});

AuthAxios.interceptors.response.use(
  (response:AxiosResponse): AxiosResponse => {
    return response;
  },
  (error:AxiosError): Promise<AxiosError> => {
    console.log("Interceptor content----",error.response?.status && (error.response?.data as any)?.error)
    if (
      error.response &&
      (error.response.status === 401 && (error.response?.data as any)?.error === "")
    ) {
      userLogout("/login");
    }

    return Promise.reject(error);
  }
);

export default Axios;
