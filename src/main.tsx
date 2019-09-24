import React, { useState, useEffect } from "react";
import BusEstimate from "./components/busEstimate/busEstimate";
import NavBar from "./components/navBar/navBar";
import BusTrackerAPI from "./Services/busTrackerAPI";
import { appConfig } from "configs/App";
import StubBusTrackerAPI from "Services/stubBusTrackerAPI";
import { Wrapper, OuterWrapper } from "styles/theme";

const Main: React.FC = () => {
  const [routes, setRoutes] = useState(Array<any>());

  const busTrackerApi = appConfig.useMockApi
    ? StubBusTrackerAPI
    : BusTrackerAPI;

  useEffect(() => {
    async function fetchRoutes() {
      let data = await BusTrackerAPI.getAllRoutes();
      let allRoutes = data["bustime-response"].routes.map((route: any) => {
        return { value: route.rt, display: route.rt };
      });
      setRoutes(allRoutes);
    }
    fetchRoutes();
  }, []);
  return (
    <div>
      <NavBar />
      <OuterWrapper>
        <Wrapper>
          <BusEstimate api={busTrackerApi} routes={routes} />
          <BusEstimate api={busTrackerApi} routes={routes} />
        </Wrapper>
      </OuterWrapper>
    </div>
  );
};

export default Main;
