import React, { FC, useState } from "react";
import "./signup.css";
import { useAppDispatch } from "../../store";
import { createUser } from "../../services/requests/users/requests";
import { loginProvider } from "../../providers/login-provider";
import { usersSelector } from "../../store/login/login-selector";
import { useSelector } from "react-redux";
import { successMessageSelector } from "../../store/singnUp/signup-selector";
import { useNavigate } from "react-router-dom";
import { Validators } from "../../helpers/Validators";

const { isValidEmail, isValidPhoneNumber } = Validators;

export const SingnUp: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useSelector(usersSelector);

  const userEmail = loginProvider.getUserId();
  const currentUser = users?.find((user) => user?.email === userEmail);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChange =
    (setState: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };

  const handleSignup = () => {
    if (isValidEmail(email) && isValidPhoneNumber(phone)) {
      const role = checked ? "superAdmin" : "admin";
      const newUser = {
        firstName,
        lastName,
        imageUrl,
        email,
        phone,
        password,
        role,
      };
      dispatch(createUser(newUser));
      navigate("/");
      alert("success");
    } else {
      alert("enter valid email and phone");
    }
  };

  return (
    <div className="sign_up">
      <h3>SIGN UP</h3>
      <div className="signup_inputs">
        <input
          onChange={handleChange(setFirstName)}
          className="signup_input"
          placeholder="First Name"
          value={firstName}
        />
        <input
          onChange={handleChange(setLastName)}
          className="signup_input"
          placeholder="Last Name"
          value={lastName}
        />
        <input
          onChange={handleChange(setImgUrl)}
          className="signup_input"
          placeholder="image url"
          value={imageUrl}
        />
        <input
          onChange={handleChange(setEmail)}
          className="signup_input"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={handleChange(setPhone)}
          className="signup_input"
          placeholder="Phone"
          value={phone}
        />
        <input
          onChange={handleChange(setPassword)}
          className="signup_input"
          placeholder="Password"
          value={password}
        />

        <div className="admin_checkbox">
          <label>Super-Admin</label>
          <input
            className="checkbox"
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
      <button onClick={handleSignup} className="signup_button">
        Sign Up
      </button>
    </div>
  );
};
