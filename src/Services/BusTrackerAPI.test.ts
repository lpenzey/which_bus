import axios from "axios";
import BusTrackerAPI from "./busTrackerAPI";
import predictionResponse from "./__fixtures__/getPredictions.json";
import patternResponse from "./__fixtures__/getPatterns.json";
import routesResponse from "./__fixtures__/getRoutes.json";
import stopsResponse from "./__fixtures__/getStops.json";
import directionsResponse from "./__fixtures__/getDirections.json";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API service", () => {
  it("gets all available routes", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { routesResponse }
      })
    );

    const data = await BusTrackerAPI.getAllRoutes("json");

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(data.routesResponse["bustime-response"].routes.length).toEqual(126);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getroutes",
      {
        params: {
          key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
          format: "json"
        }
      }
    );
  });

  it("gets time estimates for a stop", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { predictionResponse }
      })
    );

    const data = await BusTrackerAPI.requestTimeEstimate(20, 456, "json");

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(data.predictionResponse["bustime-response"].prd[0].rt).toEqual("20");
    expect(data.predictionResponse["bustime-response"].prd[0].stpid).toEqual(
      "456"
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getpredictions",
      {
        params: {
          key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
          route: 20,
          stpid: 456,
          format: "json"
        }
      }
    );
  });

  it("gets the full pattern for a route", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { patternResponse }
      })
    );

    const data = await BusTrackerAPI.getFullRoute(70, "json");

    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    expect(data.patternResponse["bustime-response"].ptr[0].rtdir).toEqual(
      "Eastbound"
    );
    expect(data.patternResponse["bustime-response"].ptr[0].pt[0].stpnm).toEqual(
      "Division & Austin Terminal"
    );
    expect(data.patternResponse["bustime-response"].ptr[1].rtdir).toEqual(
      "Westbound"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getpatterns",
      {
        params: {
          key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
          rt: 70,
          format: "json"
        }
      }
    );
  });

  it("gets all stops for a single bus route", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { stopsResponse }
      })
    );

    const data = await BusTrackerAPI.getStops(70, "Eastbound", "json");

    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
    expect(data.stopsResponse["bustime-response"].stops[0].stpid).toEqual(
      "4727"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getstops",
      {
        params: {
          key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
          rt: 70,
          dir: "Eastbound",
          format: "json"
        }
      }
    );
  });
  it("gets available directions for a bus route", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { directionsResponse }
      })
    );

    const data = await BusTrackerAPI.getDirections(70, "json");

    expect(mockedAxios.get).toHaveBeenCalledTimes(5);
    expect(
      data.directionsResponse["bustime-response"].directions.length
    ).toEqual(2);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getdirections",
      {
        params: {
          key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
          rt: 70,
          format: "json"
        }
      }
    );
  });
});
