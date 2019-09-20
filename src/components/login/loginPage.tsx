import React from "react";
import styled from "styled-components";
import LoginForm from "./loginForm";
import BusTrackerAPI from "../../Services/busTrackerAPI";
import NavBar from "components/navBar/navBar";

const Login: React.FC = () => {
  return (
    <div>
      <NavBar />
      <LoginForm api={BusTrackerAPI} />
    </div>
  );
};

export default Login;
