import React from "react";
import BusEstimate from "./busEstimate";
import StubBusTrackerAPI from "../../Services/stubBusTrackerAPI";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";

afterEach(cleanup);
it("Displays time estimate when route, direction, and stop are selected", async () => {
  let data: any = await StubBusTrackerAPI.getAllRoutes("json");
  let allRoutes = data["bustime-response"].routes.map((route: any) => {
    return { value: route.rt, display: route.rt };
  });

  const { getByText, getByTestId, container, getByDisplayValue } = render(
    <BusEstimate api={StubBusTrackerAPI} routes={allRoutes} />
  );

  const routes = getByTestId("Select Route");
  fireEvent.change(routes);

  const button = getByText("8A");
  fireEvent.change(button);

  const waitForRouteClick = await waitForElement(() =>
    getByTestId("Select Route")
  );

  fireEvent.change(getByTestId("Select Direction"));
  fireEvent.change(getByText("Westbound"));

  const waitForDirectionSelection = await waitForElement(() =>
    getByTestId("Select Direction")
  );

  fireEvent.click(getByTestId("Select Stop"));
  fireEvent.click(getByText("1633 W Madison"));
  fireEvent.change(getByText("1633 W Madison"));
  const estimateContainer = await waitForElement(() =>
    getByTestId("Select Stop")
  );
  expect(container).toMatchSnapshot();
});
