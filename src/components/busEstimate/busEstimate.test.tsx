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
  const { getByText, getByTestId, getByDisplayValue } = render(
    <BusEstimate api={StubBusTrackerAPI} />
  );

  fireEvent.click(getByText("Select Route"));

  const waitForRouteUpdate = await waitForElement(() =>
    getByTestId("dropdown-container")
  );

  fireEvent.click(getByText("1"));

  const waitForRouteClick = await waitForElement(() =>
    getByTestId("dropdown-container")
  );

  fireEvent.click(getByText("Select Direction"));
  fireEvent.click(getByText("Eastbound"));

  const waitForDirectionSelection = await waitForElement(() =>
    getByTestId("dropdown-container")
  );

  fireEvent.click(getByText("Select Stop"));
  fireEvent.click(getByText("1633 W Madison"));

  const estimateContainer = await waitForElement(() =>
    getByTestId("dropdown-container")
  );
  expect(estimateContainer).toMatchSnapshot();
});
