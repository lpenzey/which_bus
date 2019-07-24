import React from "react";
import styled from "styled-components";

const NavBar: React.FC = () => {
  const Navbar = styled.nav`
    sticky: top;
    text-align: left;
    color: papayawhip;
    font: 2em "Montserrat", sans-serif;
    background-color: palevioletred;
    padding: 0.4em;
    opacity: 0.93;
  `;
  return (
    <div>
      <Navbar>
        WHICH BUS{" "}
        <span role="img" aria-label="Thinking emoji">
          🧐
        </span>
      </Navbar>
    </div>
  );
};

export default NavBar;
