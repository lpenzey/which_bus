import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../genericDropdown/genericDropdown";
import styled from "styled-components";
import img from "./img.png";

export default function BusEstimate(props: any) {
  const [routes, setRoutes] = useState(Array<any>());
  const [directions, setDirections] = useState(Array<any>());
  const [stops, setStops] = useState(Array<any>());
  const [update, setUpdate] = useState("");
  const time = useRef("");
  const stpid = useRef("");
  const display = useRef("none");
  const selectedStop = useRef("Select Stop");
  const selectedRoute = useRef("Select Route");
  const selectedDirection = useRef("Select Direction");

  function handleRouteChange(route: string) {
    selectedRoute.current = route;
    populateDirections();
  }

  function handleDirectionChange(direction: string) {
    selectedDirection.current = direction;
    populateStops(direction);
  }

  function handleStopChange(stop: string) {
    getStpid(stop);
    selectedStop.current = stop;
    getEstimate();
  }

  const populateDirections = async () => {
    let data = await props.api.getDirections(selectedRoute.current, "json");

    let availableDirections = data["bustime-response"].directions.map(
      (direction: any) => {
        return { value: direction.dir, display: direction.dir };
      }
    );

    setDirections(availableDirections);
  };

  const populateStops = async (direction: string) => {
    let data = await props.api.getStops(
      selectedRoute.current,
      direction,
      "json"
    );
    let availableStops = data["bustime-response"].stops.map((stop: any) => {
      return { value: stop.stpnm, id: stop.stpid, display: stop.stpnm };
    });

    setStops(availableStops);
  };

  const getEstimate = async () => {
    let data = await props.api.requestTimeEstimate(
      selectedRoute.current,
      stpid.current,
      "json"
    );
    let dataRoot = data["bustime-response"].prd[0];
    let updatedTime = dataRoot.prdtm.split(" ")[1];

    time.current = "Next Bus Arrives At " + updatedTime;
    display.current = "block";
    setUpdate(stpid.current);
  };

  function getStpid(stopName: string) {
    let stopObject = stops.find(stop => stop.display === stopName);

    stpid.current = stopObject.id;
  }

  useEffect(() => {
    setRoutes(props.routes);
  }, [props.routes]);

  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1.5em;
    justify-content: center;
    background-image: url(${img});
    border-radius: 4px;
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
    width: 60%;
    margin: auto;
    min-width: 250px;
  `;

  const WrapperInner = styled.div`
    padding: 0.5em;
    width: 60%;
    margin: auto;
    justify-content: center;
  `;

  const Text = styled.span`
    display: ${display.current};
    border-radius: 4px;
    background-color: grey;
    color: rgb(243, 243, 243);
    font-size: 30px;
    text-shadow: 1px 1px 2px #3d3d3d;
    text-align: center;
    width: auto;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 10px;
  `;
  return (
    <Wrapper>
      <WrapperInner>
        <Dropdown
          display={selectedRoute.current}
          contents={routes}
          handleChange={handleRouteChange}
        />
      </WrapperInner>

      <WrapperInner>
        <Dropdown
          display={selectedDirection.current}
          contents={directions}
          handleChange={handleDirectionChange}
        />
      </WrapperInner>
      <WrapperInner>
        <Dropdown
          display={selectedStop.current}
          contents={stops}
          handleChange={handleStopChange}
        />
      </WrapperInner>

      <Text data-testid="estimate">{time.current}</Text>
    </Wrapper>
  );
}
