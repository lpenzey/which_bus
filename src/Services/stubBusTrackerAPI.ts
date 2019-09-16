const predictionResponse: JSON = require("./__fixtures__/getPredictions.json");
const patternResponse: JSON = require("./__fixtures__/getPatterns.json");
const routesResponse: JSON = require("./__fixtures__/getRoutes.json");
const stopsResponse: JSON = require("./__fixtures__/getStops.json");
const directionsResponse: JSON = require("./__fixtures__/getDirections.json");

const StubBusTrackerAPI = {
  getAllRoutes: async () => {
    return routesResponse;
  },
  registerUser: async (userName: String, password: String) => {
    return routesResponse;
  },
  requestTimeEstimate: async (route: number, stpid: number) => {
    return predictionResponse;
  },
  getStops: async (route: number, direction: string) => {
    return stopsResponse;
  },
  getDirections: async (route: number) => {
    return directionsResponse;
  }
};

export default StubBusTrackerAPI;
