export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export interface ILoginResponse {
  account: IUser;
  token: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}

enum Role {
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}
