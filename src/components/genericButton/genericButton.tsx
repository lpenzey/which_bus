import React from "react";
import styled from "styled-components";

export default function GenericButton(props: any) {
  function handleChange(e: any) {
    props.handleChange(e.target.value);
  }
  const Button = styled.button`
    font-size: 0.5em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `;

  return (
    <div>
      <Button onClick={handleChange}>{props.label}</Button>
    </div>
  );
}
