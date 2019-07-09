import axios from "axios";

const BusTrackerAPI = {
    requestTimeEstimate: async (route: number, stpid: number, format: string) => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getpredictions", {
            params: {
                key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
                route: route,
                stpid: stpid,
                format: format
            }
        });
        return response.data;
    }
};

export default BusTrackerAPI;