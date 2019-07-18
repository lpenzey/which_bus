import axios from "axios";

const BusTrackerAPI = {
    getAllRoutes: async (format: string) => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getroutes", {
            params: {
                key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
                format: format
            }
        });
        return response.data;
    },
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
    },
    getFullRoute: async (route: number, format: string) => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getpatterns", {
            params: {
                key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
                rt: route,
                format: format
            }
        });

        return response.data;
    },

    getStops: async (route: number, direction: string, format: string) => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getstops", {
            params: {
                key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
                rt: route,
                dir: direction,
                format: format
            }
        });

        return response.data;
    },

    getDirections: async (route: number, format: string) => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/http://www.ctabustracker.com/bustime/api/v2/getdirections", {
            params: {
                key: process.env.REACT_APP_BUS_TRACKER_API_KEY,
                rt: route,
                format: format
            }
        });

        return response.data;
    }
};

export default BusTrackerAPI;