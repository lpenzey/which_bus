import axios from "axios";
import BusTrackerAPI from './busTrackerAPI';
const sampleResponse: JSON = require('./__fixtures__/searchResponse.json');

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("GET Request", () => {

    it("fetches data from request", async () => {
        mockedAxios.get.mockImplementation(() =>
            Promise.resolve({
                data: { sampleResponse }
            })
        );

        const data = await BusTrackerAPI.requestTimeEstimate(20, 456, "json");

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(data.sampleResponse["bustime-response"].prd[0].rt).toEqual("20");
        expect(data.sampleResponse["bustime-response"].prd[0].stpid).toEqual("456");

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
});