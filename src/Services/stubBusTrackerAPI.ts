const predictionResponse: JSON = require('./__fixtures__/getPredictions.json');
const patternResponse: JSON = require('./__fixtures__/getPatterns.json');
const routesResponse: JSON = require('./__fixtures__/getRoutes.json');
const stopsResponse: JSON = require('./__fixtures__/getStops.json');
const directionsResponse: JSON = require('./__fixtures__/getDirections.json');

const StubBusTrackerAPI = {
    getAllRoutes: async (format: string) => {
        return routesResponse;
    },
    requestTimeEstimate: async (route: number, stpid: number, format: string) => {
        return predictionResponse;
    },
    getFullRoute: async (route: number, format: string) => {
        return patternResponse;
    },
    getStops: async (route: number, direction: string, format: string) => {
        return stopsResponse;
    },
    getDirections: async (route: number, format: string) => {
        return directionsResponse;
    }
};

export default StubBusTrackerAPI;