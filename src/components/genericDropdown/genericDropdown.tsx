import React from "react";
import styled from "styled-components";

export default function Dropdown(props: any) {
  function handleChange(e: any) {
    props.handleChange(e.target.value);
  }

  const Select = styled.select`
    font-size: 1.5em;
    color: charcoal;
    font: 1em "Montserrat", sans-serif;
    height: 3em auto;
    width: 100%;
    padding: 0.5em;
    justify-content: center;
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  `;

  return (
    <Select
      data-testid={props.display}
      defaultValue={props.display}
      onChange={handleChange}
    >
      <option value="" hidden>
        {props.display}
      </option>
      {props.contents.map(
        (item: { value: string; display: React.ReactNode }) => (
          <option key={item.value} value={item.value}>
            {item.display}
          </option>
        )
      )}
    </Select>
  );
}
