import { http } from "services";
import { IApi } from "types";

export const Login = (params: IApi.Auth.Login.Request) =>
	http.post<IApi.Auth.Login.Response>("/auth", params);

export const Register = (params: IApi.Auth.Register.Request) =>
	http.post<IApi.Auth.Register.Response>("/users", params);

export const GetMe = () => http.get<IApi.Auth.GetMe.Response>("/users/me");
