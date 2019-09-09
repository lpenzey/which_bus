import React, { useState, useEffect } from "react";
import BusEstimate from "./components/busEstimate/busEstimate";
import NavBar from "./components/navBar/navBar";
import BusTrackerAPI from "./Services/busTrackerAPI";
import { appConfig } from "configs/App";
import StubBusTrackerAPI from "Services/stubBusTrackerAPI";
import RegistrationForm from "./components/userRegistration/userRegistration";
import styled from "styled-components";
import UpdateButton from "components/updateButton/updateButton";

const Main: React.FC = () => {
  const [routes, setRoutes] = useState(Array<any>());

  const busTrackerApi = appConfig.useMockApi
    ? StubBusTrackerAPI
    : BusTrackerAPI;

  const testButton = () => {
    console.log("here");
  };

  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    @media (min-width: 1000px) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  `;
  const WrapperOuter = styled.div``;

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
    <WrapperOuter>
      <NavBar />
      <Wrapper>
        <RegistrationForm api={busTrackerApi} />
        <BusEstimate api={busTrackerApi} routes={routes} />
        <BusEstimate api={busTrackerApi} routes={routes} />
      </Wrapper>
    </WrapperOuter>
  );
};

export default Main;
