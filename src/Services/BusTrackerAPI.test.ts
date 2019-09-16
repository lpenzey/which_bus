import axios from "axios";
import BusTrackerAPI from "./busTrackerAPI";
import predictionResponse from "./__fixtures__/getPredictions.json";
import patternResponse from "./__fixtures__/getPatterns.json";
import routesResponse from "./__fixtures__/getRoutes.json";
import stopsResponse from "./__fixtures__/getStops.json";
import directionsResponse from "./__fixtures__/getDirections.json";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const deployedApiUrl = "https://omnibus-backend.herokuapp.com";
const localApiUrl = "http://127.0.0.1:8080";

describe("API service", () => {
  it("gets all available routes", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { routesResponse }
      })
    );

    const data = await BusTrackerAPI.getAllRoutes();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(data.routesResponse["bustime-response"].routes.length).toEqual(126);
    expect(mockedAxios.get).toHaveBeenCalledWith(deployedApiUrl + "/routes");
  });

  it("gets time estimates for a stop", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { predictionResponse }
      })
    );

    const data = await BusTrackerAPI.requestTimeEstimate(20, 456);

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(data.predictionResponse["bustime-response"].prd[0].rt).toEqual("20");
    expect(data.predictionResponse["bustime-response"].prd[0].stpid).toEqual(
      "456"
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      deployedApiUrl + "/predictions",
      {
        params: {
          rt: 20,
          stpid: 456
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

    const data = await BusTrackerAPI.getStops(70, "Eastbound");

    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    expect(data.stopsResponse["bustime-response"].stops[0].stpid).toEqual(
      "4727"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(deployedApiUrl + "/stops", {
      params: {
        rt: 70,
        dir: "Eastbound"
      }
    });
  });

  it("gets available directions for a bus route", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { directionsResponse }
      })
    );

    const data = await BusTrackerAPI.getDirections(70);

    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
    expect(
      data.directionsResponse["bustime-response"].directions.length
    ).toEqual(2);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      deployedApiUrl + "/directions",
      {
        params: {
          rt: 70
        }
      }
    );
  });
});
