import React, { FC, ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginProvider } from "../../providers/login-provider";
import { useAppDispatch } from "../../store";
import { getUsers } from "../../services/requests/users/requests";
import { MainLayout } from "../mainLayout";

interface AuthHOCProps {
  children: ReactNode | null;
}

export const AuthHOC: FC<AuthHOCProps> = ({ children }) => {
  const token = loginProvider.getUserId();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return <MainLayout>{children}</MainLayout>;
};
