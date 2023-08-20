import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState({ username: "ohad", id: "1" });
  const [debug, setDebug] = useState(true);

  const baseUrl = debug ? "http://127.0.0.1:3000/" : "/";
  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
      //const decoded = jwt_decode(token);
      localStorage.setItem("username", "decoded.username");
      setUsername(token.username);
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("balance");
      setUsername(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        baseUrl: baseUrl,
        name: username,
        token: token,
        setToken: setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
