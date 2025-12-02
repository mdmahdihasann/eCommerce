import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.user ? "user Login" : "logout"));
  return useContext(AuthContext);
};
