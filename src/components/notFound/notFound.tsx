import * as React from "react";
import styled from "styled-components";
import { Title, Input } from "components/theme";
import obi from "./obi.png";
import NavBar from "components/navBar/navBar";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
  justify-content: center;
  width: 100%;
  margin: 1em auto;

  flex-direction: column;
  align-items: center;

  @media (min-width: 400px) {
    padding: 1.5em;
    width: 60%;
    display: flex;
  }

  @media (min-width: 2000px) {
    width: 60%;
    display: inline-flex;
    justify-content: center;
    flex-direction: row;
    margin: 1em;
  }
`;

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
