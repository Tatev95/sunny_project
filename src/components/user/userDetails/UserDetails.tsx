import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/login/login-selector";
import { loginProvider } from "../../../providers/login-provider";
import "./userDetails.css";
import { useAppDispatch } from "../../../store";
import {
  editUser,
  getCurrentUser,
} from "../../../services/requests/users/requests";
import { useNavigate } from "react-router-dom";
import { NewUserType } from "../../../types";

export const UserDetails: FC = () => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userId = loginProvider.getUserId() + "";

  const [firstName, setFirstName] = useState(
    (user as NewUserType)?.firstName || ""
  );
  const [lastName, setLastName] = useState(
    (user as NewUserType)?.lastName || ""
  );
  const [imageUrl, setImageUrl] = useState(
    (user as NewUserType)?.imageUrl || ""
  );
  const [email, setEmail] = useState((user as NewUserType)?.email || "");
  const [phone, setPhone] = useState((user as NewUserType)?.phone || "");
  const [password, setPassword] = useState(
    (user as NewUserType)?.password || ""
  );

  const handleChange =
    (setState: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };

  useEffect(() => {
    if (user) {
      setFirstName((user as any).firstName || "");
      setLastName((user as any).lastName || "");
      setImageUrl((user as any).imageUrl || "");
      setEmail((user as any).email || "");
      setPhone((user as any).phone || "");
      setPassword((user as any).password || "");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getCurrentUser(userId));
  }, [dispatch, userId]);

  const handleSaveEdit = () => {
    const updatedUser = {
      firstName,
      lastName,
      imageUrl,
      email,
      phone,
      password,
    };
    dispatch(editUser({ updatedUser, userId }));
    alert("user edited");
    navigate("/home");
    window.location.reload();
  };

  return (
    <div>
      <h3>Edit Profile</h3>

      <div className="detail_inputs">
        <input
          onChange={handleChange(setFirstName)}
          className="detail_input"
          placeholder="First Name"
          value={firstName}
        />
        <input
          onChange={handleChange(setLastName)}
          className="detail_input"
          placeholder="Last Name"
          value={lastName}
        />
        <input
          onChange={handleChange(setImageUrl)}
          className="detail_input"
          placeholder="image url"
          value={imageUrl}
        />
        <input
          onChange={handleChange(setEmail)}
          className="detail_input"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={handleChange(setPhone)}
          className="detail_input"
          placeholder="Phone"
          value={phone}
        />
        <input
          onChange={handleChange(setPassword)}
          className="detail_input"
          placeholder="Password"
          value={password}
        />
      </div>
      <button onClick={handleSaveEdit}>Save</button>
    </div>
  );
};
