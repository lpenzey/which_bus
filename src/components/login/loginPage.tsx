import React from "react";
import styled from "styled-components";
import GenericButton from "../genericButton/genericButton";
import LoginForm from "./loginForm";
import BusTrackerAPI from "../../Services/busTrackerAPI";
import { useRoutes } from "hookrouter";
import RegistrationPage from "../registration/registrationPage";

const Login: React.FC = () => {
  const Navbar = styled.nav`
    sticky: top;
    text-align: left;
    color: papayawhip;
    font: 2em "Montserrat", sans-serif;
    background-color: palevioletred;
    padding: 0.4em;
    opacity: 0.93;
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    justify-content: space-between;
    align-items: center;
  `;

  function navigateHome() {
    // navigate("/login");
  }
  return (
    <div>
      <Navbar>
        <div>
          WHICH BUS{" "}
          <span role="img" aria-label="Thinking emoji">
            🧐
          </span>
        </div>
        <GenericButton handleChange={navigateHome} label="Login" />
      </Navbar>
      <LoginForm api={BusTrackerAPI} />
    </div>
  );
};

export default Login;
