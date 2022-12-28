import React from "react";
import countStore from "../../zustand/countStore";

export interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const count = countStore((state) => state.count);

  return <div>Login{count}</div>;
};

export default Login;
