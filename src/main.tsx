import React, { useState, useEffect } from "react";
import BusEstimate from "./components/busEstimate/busEstimate";
import NavBar from "./components/navBar/navBar";
import BusTrackerAPI from "./Services/busTrackerAPI";
import { appConfig } from "configs/App";
import StubBusTrackerAPI from "Services/stubBusTrackerAPI";
import styled from "styled-components";

const Main: React.FC = () => {
  const [routes, setRoutes] = useState(Array<any>());

  const busTrackerApi = appConfig.useMockApi
    ? StubBusTrackerAPI
    : BusTrackerAPI;

  const Wrapper = styled.div`
    background: papayawhip;
  `;

  useEffect(() => {
    async function fetchRoutes() {
      let data = await BusTrackerAPI.getAllRoutes("json");
      let allRoutes = data["bustime-response"].routes.map((route: any) => {
        return { value: route.rt, display: route.rt };
      });
      setRoutes(allRoutes);
    }
    fetchRoutes();
  }, []);
  return (
    <Wrapper>
      <NavBar />
      <br />
      <BusEstimate api={busTrackerApi} routes={routes} />
      <br />
      <BusEstimate api={busTrackerApi} routes={routes} />
    </Wrapper>
  );
};

export default Main;
