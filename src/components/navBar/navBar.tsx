import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { navigate } from "hookrouter";
import Dropdown from "components/genericDropdown/genericDropdown";

const NavBar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
    justify-content: space-between;
    align-items: center;
  `;

  function navigateHome() {
    navigate("/");
  }

  function handleChange(item: string) {
    navigate(item);
  }

  const registerButton = {
    value: "/register",
    id: "registerButton",
    display: "Register"
  };
  const homeButton = {
    value: "/",
    id: "home button",
    display: "Home"
  };
  const favoritesButton = {
    value: "/favorites",
    id: "favorites button",
    display: "Favorites"
  };

  var loginButton;
  var navContents;
  if (loggedIn) {
    loginButton = {
      value: "/logout",
      id: "logout button",
      display: "Logout"
    };

    navContents = [homeButton, loginButton, registerButton, favoritesButton];
  } else {
    loginButton = {
      value: "/login",
      id: "login button",
      display: "Login"
    };
    navContents = [homeButton, loginButton, registerButton];
  }

  useEffect(() => {
    let data = sessionStorage.getItem("whichBusToken");
    if (data !== null) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Navbar>
        <div onClick={navigateHome}>
          WHICH BUS{" "}
          <span role="img" aria-label="Thinking emoji">
            🧐
          </span>
        </div>
        <div>
          <Dropdown
            display={"="}
            label={"Navigate dropdown"}
            contents={navContents}
            handleChange={handleChange}
          />
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
