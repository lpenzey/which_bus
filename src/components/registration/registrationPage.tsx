import React from "react";
import styled from "styled-components";
import GenericButton from "../genericButton/genericButton";
import RegistrationForm from "./registrationForm";
import BusTrackerAPI from "../../Services/busTrackerAPI";

const RegistrationPage: React.FC = () => {
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
    // navigate("/login");
  }
  return (
    <div>
      <Navbar />
      <RegistrationForm api={BusTrackerAPI} />
    </div>
  );
};

export default RegistrationPage;
