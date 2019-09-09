import React from "react";
import styled from "styled-components";

export default function BusArrival(props: any) {
  function handleChange(e: any) {
    props.handleChange(e.target.value);
  }

  const Text = styled.span`
    display: ${props.display};
    border-radius: 4px;
    background-color: grey;
    color: rgb(243, 243, 243);
    font-size: 30px;
    text-shadow: 1px 1px 2px #3d3d3d;
    text-align: center;
    width: auto;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 10px;
    margin: 10px;
  `;

  return <Text data-testid="estimate">🚌 {props.time} min</Text>;
}
