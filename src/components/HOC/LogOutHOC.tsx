import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { loginProvider } from "../../providers/login-provider";

interface LogOutHOCProps {
  children: ReactNode;
}

export const LogOutHOC: FC<LogOutHOCProps> = ({ children }) => {
  const token = loginProvider.getUserId();

  if (token) {
    return <Navigate to="/home" />;
  }

  return <div>{children}</div>;
};
