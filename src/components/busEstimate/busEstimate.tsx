import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../genericDropdown/genericDropdown";
import BusArrival from "../busArrival/busArrival";
import GenericButton from "components/genericButton/genericButton";
import { WrapperInner, EstimateCard } from "styles/theme";

export default function BusEstimate(props: any) {
  const [routes, setRoutes] = useState(Array<any>());
  const [directions, setDirections] = useState(Array<any>());
  const [stops, setStops] = useState(Array<any>());
  const [estimates, setEstimates] = useState(Array<any>());
  const [, setUpdate] = useState("");
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
    let data = await props.api.getDirections(selectedRoute.current);

    let availableDirections = data["bustime-response"].directions.map(
      (direction: any) => {
        return { value: direction.dir, display: direction.dir };
      }
    );

    setDirections(availableDirections);
  };

  const populateStops = async (direction: string) => {
    let data = await props.api.getStops(selectedRoute.current, direction);
    let availableStops = data["bustime-response"].stops.map((stop: any) => {
      return { value: stop.stpnm, id: stop.stpid, display: stop.stpnm };
    });

    setStops(availableStops);
  };

  const getEstimate = async () => {
    let data = await props.api.requestTimeEstimate(
      selectedRoute.current,
      stpid.current
    );
    let availableEstimates = data["bustime-response"].prd.map(
      (estimate: any) => {
        return {
          time: estimate.prdctdn,
          id: estimate.vid,
          delay: estimate.dly
        };
      }
    );

    display.current = "block";
    setEstimates(availableEstimates);
    let i = 0;
    setUpdate(stpid.current + i);
    i++;
  };

  function getStpid(stopName: string) {
    let stopObject = stops.find(stop => stop.display === stopName);
    stpid.current = stopObject.id;
  }

  function addToFavorites() {
    props.api.addToFavorites(selectedRoute.current, stpid.current);
  }

  useEffect(() => {
    setRoutes(props.routes);
  }, [props.routes]);

  return (
    <EstimateCard>
      <WrapperInner>
        <Dropdown
          display={selectedRoute.current}
          label={selectedRoute.current}
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
      {estimates.map(
        (item: { time: string; delay: boolean; display: React.ReactNode }) => (
          <BusArrival
            time={item.time}
            display={display.current}
            delay={item.delay}
          />
        )
      )}
      <GenericButton handleChange={getEstimate} label="Update" />
      <GenericButton
        display={display.current}
        handleChange={addToFavorites}
        label="Save this stop"
      />
    </EstimateCard>
  );
}
