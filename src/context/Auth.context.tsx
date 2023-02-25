import React, { createContext, useEffect, useState } from "react";
import { loginThunk, validatedThunk } from "../app/actions/auth.action";
import { logoutAction } from "../app/slices/admin.slice";
import { useAppDispatch, useAppSelector } from "../hooks";

export type typeAuthContext = {
  infoSession: string | null;
  login: (object: any) => void;
  logout: () => void;
  isLogged: () => boolean;
};
export const AuthContext = createContext<typeAuthContext>({
  infoSession: "aa",
  login: (object: any) => { },
  logout: () => { },
  isLogged: () => false,
});

const AuthProvider = ({ children }: any): JSX.Element => {
  const adminSelector = useAppSelector((state) => state.admins);
  const clientDispatch = useAppDispatch();

  const [infoSession, setInfo] = useState(
    JSON.parse(localStorage.getItem("infoSession") || "[]") || null
  );

  useEffect(() => {
    clientDispatch(validatedThunk());
  }, []);

  const contextValue = {
    infoSession,
    login(object: any) {
      clientDispatch(loginThunk(object));
    },
    logout() {
      clientDispatch(logoutAction());
    },
    isLogged(): boolean {
      return adminSelector.isAuthenticated
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
