import * as React from "react";
import styled from "styled-components";
import { Title, Wrapper } from "styles/theme";
import obi from "./obi.png";
import NavBar from "components/navBar/navBar";

export default function NotFound(props: any) {
  return (
    <div>
      <NavBar />
      <Wrapper>
        <Title>404</Title>
        <img src={obi} alt="Logo" />
        <Title>This is not the page you are looking for...</Title>
      </Wrapper>
    </div>
  );
}
