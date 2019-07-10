import sampleResponse from './__fixtures__/searchResponse.json';

const StubBusTrackerAPI = {
    requestTimeEstimate: async (route: number, stpid: number, format: string) => {
        return sampleResponse;
    }
};

export default StubBusTrackerAPI;