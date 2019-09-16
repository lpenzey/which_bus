import axios from "axios";
const DeployedOmnibusUri = "https://omnibus-backend.herokuapp.com";
const LocalOmnibusUri = "http://127.0.0.1:8080/api";

const BusTrackerAPI = {
  getAllRoutes: async () => {
    const response = await axios.get(DeployedOmnibusUri + "/routes");
    return response.data;
  },
  registerUser: async (userName: String, password: String) => {
    const response = await axios.post(DeployedOmnibusUri + "/users/register", {
      name: userName,
      password: password
    });
    return response.data;
  },
  requestTimeEstimate: async (route: number, stpid: number) => {
    const response = await axios.get(DeployedOmnibusUri + "/predictions", {
      params: {
        rt: route,
        stpid: stpid
      }
    });
    return response.data;
  },
  getStops: async (route: number, direction: string) => {
    const response = await axios.get(DeployedOmnibusUri + "/stops", {
      params: {
        rt: route,
        dir: direction
      }
    });
    return response.data;
  },

  getDirections: async (route: number) => {
    const response = await axios.get(DeployedOmnibusUri + "/directions", {
      params: {
        rt: route
      }
    });

    return response.data;
  }
};

export default BusTrackerAPI;
