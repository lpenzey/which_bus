import React from "react";
import styled from "styled-components";
import GenericButton from "../genericButton/genericButton";
import { navigate } from "hookrouter";

const NavBar: React.FC = () => {
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

  function navigateToLogin() {
    navigate("/login");
  }

  function navigateToRegister() {
    navigate("/register");
  }

  function navigateToFavorites() {
    navigate("/favorites");
  }

  function navigateHome() {
    navigate("/");
  }

  return (
    <div>
      <Navbar>
        <div onClick={navigateHome}>
          WHICH BUS{" "}
          <span role="img" aria-label="Thinking emoji">
            🧐
          </span>
        </div>
        <GenericButton handleChange={navigateToLogin} label="Login" />
        <GenericButton handleChange={navigateToRegister} label="Register" />
        <GenericButton handleChange={navigateToFavorites} label="Favorites" />
      </Navbar>
    </div>
  );
};

export default NavBar;
