import request from "./publicRequest";
import requestAuth from "./request";
import { ILogin, IRegister, IUser, ILoginResponse } from "./types/UserTypes";

export const login = async (req: ILogin): Promise<ILoginResponse> => {
  const response = await request.post<ILogin, ILoginResponse>(
    "/user/login",
    req
  );
  return response.data;
};

export const register = async (req: IRegister): Promise<IUser> => {
  const response = await request.post<IRegister, IUser>("/user/register", req);
  return response.data;
};

export const info = async (): Promise<IUser> => {
  const response = await requestAuth.get<IUser>("/user");
  return response.data;
};
