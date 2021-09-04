import { createContext, useState } from "react";

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({ userID: "" });

  // Perform login process for the user & save authID, etc
  const login = function (userID) {
    setUser({ userID: userID });
    setAuth(true);
  };

  const logout = function (email, password) {
    setUser({ userID: "" });
    setAuth(false);
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout };

  // We can use this component to wrap any content we want to share this context
  return <authContext.Provider value={userData}>{props.children}</authContext.Provider>;
}

export const authContext = createContext();
