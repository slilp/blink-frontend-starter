import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login, register, info } from "api/userServices";
import { setAuth, removeAuth, getAuth } from "./authStorage";

interface AuthContextType {
  user: string;
  loginUser: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<string>("");

  const initialSession = async () => {
    try {
      const response = await info();
      setUser("Hello");
    } catch (error) {}
  };

  const connection = async () => {
    if (getAuth()) {
      initialSession();
    }
  };

  useEffect(() => {
    connection();
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await login({ username, password });
      setUser(response.account.firstName + " " + response.account.lastName);
      setAuth(response.token.accessToken);
      // navigate("/", { replace: true });
    } catch (error) {}
  };

  const signUp = async (username: string, password: string) => {
    try {
      await register({ username, password });
      // navigate("/login", { replace: true });
    } catch (error) {}
  };

  const logout = () => {
    setUser("");
    removeAuth();
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loginUser,
      signUp,
      logout,
    }),
    []
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
