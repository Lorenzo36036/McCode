/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children, auth }: any) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useGetCredentials = () => useContext(AuthContext);
