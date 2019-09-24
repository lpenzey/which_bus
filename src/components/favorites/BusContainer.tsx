import React, { useEffect, useState } from "react";
import BusArrival from "components/busArrival/busArrival";
import { Wrapper } from "styles/theme";

export default function BusContainer(props: any) {
  const [estimates, setEstimates] = useState(Array<any>());
  const [update, setUpdate] = useState(0);

  function handleChange(e: any) {
    props.handleChange(e.target.value);
  }

  return (
    <Wrapper>
      <h1>Route {props.route}</h1>
      {props.estimates &&
        props.estimates.map(
          (item: {
            time: string;
            delay: boolean;
            display: React.ReactNode;
          }) => (
            <BusArrival
              time={item.time}
              display="block"
              key={props.estimates.time}
            />
          )
        )}
    </Wrapper>
  );
}
