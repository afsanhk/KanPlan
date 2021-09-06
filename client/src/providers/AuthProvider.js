import { createContext, useState } from "react";

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [userID, setUserID] = useState(0);

  // Perform login process for the user & save authID, etc
  const login = function (ID) {
    console.log("This is the ID passed into login", ID);
    setUserID(Number(ID));
    setAuth(true);
  };

  const logout = function () {
    setUserID(0);
    setAuth(false);
  };

  // authContext will expose these items
  const userData = { auth, userID, login, logout };

  // We can use this component to wrap any content we want to share this context
  return <authContext.Provider value={userData}>{props.children}</authContext.Provider>;
}

export const authContext = createContext();
