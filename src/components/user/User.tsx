import React, { FC } from "react";
import { useSelector } from "react-redux";
import { usersSelector } from "../../store/login/login-selector";
import { loginProvider } from "../../providers/login-provider";
import "./user.css";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

import { RiAccountCircleLine } from "react-icons/ri";

export const User: FC = () => {
  const users = useSelector(usersSelector);

  const navigate = useNavigate();

  const userId = loginProvider.getUserId() + "";
  const currentUser = users?.find((user) => user?.id === userId);

  const handleEditUser = () => {
    navigate("/user-details");
  };

  return (
    <div className="user">
      <RiAccountCircleLine />
      <h3 className="user_name" onClick={handleEditUser}>
        {currentUser?.firstName} {currentUser?.lastName}
      </h3>
    </div>
  );
};
