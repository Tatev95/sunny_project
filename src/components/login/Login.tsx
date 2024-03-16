import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { getUsers } from "../../services/requests/users/requests";
import {
  loadingSelector,
  usersSelector,
} from "../../store/login/login-selector";
import { setCurrentUser } from "../../store/login/login-slice";
import { loginProvider } from "../../providers/login-provider";
import { Validators } from "../../helpers/Validators";

const {
  isValidEmail,
  isValidPhoneNumber,
} = Validators;

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const users = useSelector(usersSelector);
  const loading = useSelector(loadingSelector);

  const handChange =
    (setState: any) => (event: ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleLogin = () => {
    const currentUser = users?.find(
      (user) => user.password === password && user.email === login
    );
    dispatch(setCurrentUser(currentUser));

    if (currentUser !== undefined &&  isValidEmail(login)) {
      loginProvider.setToken(currentUser.id);
      navigate("/home");
    } else {
      alert("incorrect email or password");
    }
  };

  const handleGoSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <h2>Login</h2>
      <div className="login_form">
        <input
          placeholder="Email"
          className="input_field"
          type="text"
          value={login}
          onChange={handChange(setLogin)}
        />
        <input
          placeholder="Password"
          className="input_field"
          type="password"
          value={password}
          onChange={handChange(setPassword)}
        />
      </div>
      <button className="login_button" onClick={handleLogin}>
        {loading ? <span>Loading...</span> : <span>Login</span>}
      </button>
      <div>
        <h3 className="account">
          Don't You have an account?
          <span className="sign_up" onClick={handleGoSignUp}>
            Sign up
          </span>
        </h3>
      </div>
    </>
  );
};
