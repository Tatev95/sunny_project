import React, { FC, ReactNode, useEffect } from "react";
import { Header } from "./components/header";
import "./mainLayout.css";

interface MainLayoutProps {
  children: ReactNode | null;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main_layout">
      <Header />
      {children}
    </div>
  );
};
