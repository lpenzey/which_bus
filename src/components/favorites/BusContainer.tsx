import React from "react";
import styled from "styled-components";
import BusArrival from "components/busArrival/busArrival";

export default function BusContainer(props: any) {
  function handleChange(e: any) {
    props.handleChange(e.target.value);
  }

  const Wrapper = styled.div`
    border-radius: 4px;
    background-color: peachpuff
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    justify-content: center;
    width: 100%;
    margin: 1em auto;
    min-width: 250px;
    max-width: 400px;

    @media (min-width: 400px) {
      padding: 1.5em;
      width: 60%;
      display: flex;
    }

    @media (min-width: 1000px) {
      width: 60%;
      display: inline-flex;
      justify-content: center;
      flex-direction: row;
      margin: 1em;
    }
  `;

  const WrapperInner = styled.div`
    padding: 0.5em;
    width: 100%;
    margin: 0.5em;
    justify-content: center;
  `;

  return (
    <Wrapper>
      <h1>Route {props.route}</h1>
      {props.estimates.map(
        (item: { time: string; delay: boolean; display: React.ReactNode }) => (
          <BusArrival time={item.time} display="block" delay={item.delay} />
        )
      )}
    </Wrapper>
  );
}
