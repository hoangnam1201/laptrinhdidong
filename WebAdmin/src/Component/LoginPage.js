import React, { useContext, useState } from "react";
import logo_bus from "./assets/logobus1.png";
import "./style.scss";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import AppContext from "./AppContext";
import axios from "axios";

const Hr = styled.hr`
  margin: 40px 0;
`;
const LoginPage = () => {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const submitHandle = async (e) => {
    try {
      e.preventDefault();
      // console.log(userInput);
      const fetch = {
        method: "post",
        url: "https://busapbe.herokuapp.com/api/auth/login",
        // url: "http://localhost:3002/api/auth/login",
        data: userInput,
      };
      const response = await axios(fetch);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(accessToken);
      //
      console.log(response)
      const fetch2 = {
        method: "post",
        url: "https://busapbe.herokuapp.com/api/users/get-infor",
        // url: "http://localhost:3002/api/users/get-infor",
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      const response2 = await axios(fetch2);
      const { username } = response2.data;
      console.log(response2)
      dispatch({ type: "CURRENT_USER", payload: { username } });
    } catch (error) {
      console.log(error);
      // setErrorMessage(error.response.data.err);
    }
  };
  const handleEnterKey = (e) => {
    if (e.key === "Enter") submitHandle(e);
  };

  return (
    <div className="login-page">
      <div className="container-md p-0 h-100">
        <form className="login-form col-12 col-xl-4 col-lg-5 col-md-6 col-sm-6">
          <img alt="logo truong" src={logo_bus} className="w-75 h-75" />
          <Hr />
          <h5 className="text-center primary-logo-color font-weight-bold">
            TRANG QUẢN LÝ BUS STATION
          </h5>
          <small className="d-block sub-logo-color text-center">
            NHÓM SINH VIÊN SƯ PHẠM KỸ THUẬT TP HCM
          </small>
          <h6 className="mt-5">Thông tin đăng nhập:</h6>
          {errorMessage &&
            (Array.isArray(errorMessage) ? (
              errorMessage.map((err) => (
                <div className="error-message">Error: {err}</div>
              ))
            ) : (
              <div className="error-message">Error: {errorMessage}</div>
            ))}
          <form onKeyDown={handleEnterKey}>
            <TextField
              className="w-100 mt-3"
              label="Tài khoản"
              name="username"
              value={userInput.username}
              onChange={onChangeHandle}
            />
            <TextField
              className="w-100 mt-3 mb-2"
              type="password"
              label="Mặt khẩu"
              name="password"
              value={userInput.password}
              onChange={onChangeHandle}
            />

            <Button
              fullWidth
              className="mt-2"
              variant="contained"
              color="primary"
              // onClick={handleLogin}
              onKeyDown={handleEnterKey}
              // disabled={loading}
              onClick={submitHandle}
            >
              Đăng nhập
            </Button>
          </form>
          <Hr />
          <footer className="text-center">
            <small>©2021 Đại học Sư Phạm Kỹ Thuật thành phố Hồ Chí Minh</small>
          </footer>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
