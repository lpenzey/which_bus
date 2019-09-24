import axios from "axios";

const DeployedV1OmnibusUri = "https://omnibus-backend.herokuapp.com/v1";
const DeployedV2OmnibusUri = "https://omnibus-backend.herokuapp.com/v2";
const LocalOmnibusUri = "http://localhost:8080/v1";

const BusTrackerAPI = {
  getAllRoutes: async () => {
    const response = await axios.get(DeployedV1OmnibusUri + "/api/routes");
    return response.data;
  },

  registerUser: async (userName: string, password: string) => {
    const response = await axios.post(
      DeployedV1OmnibusUri + "/users/register",
      {
        name: userName,
        password: password
      }
    );
    alert(response.data.action);
    return response.data;
  },

  login: async (userName: string, passWord: string) => {
    const response = await axios.post(
      DeployedV1OmnibusUri + "/users/login",
      {},
      {
        auth: {
          username: userName,
          password: passWord
        },
        withCredentials: true
      }
    );
    alert("Login Successful");
    sessionStorage.setItem("token", response.headers["authorization"]);
    return response;
  },

  getFavorites: async () => {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      DeployedV1OmnibusUri + "/users/favorites",
      {
        headers: { Authorization: `${token}` }
      }
    );
    return response.data;
  },

  addToFavorites: async (route: string, stopId: string) => {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      DeployedV1OmnibusUri + "/users/favorites",
      {},
      {
        params: {
          rt: route,
          stpid: stopId
        },
        headers: { Authorization: `${token}` }
      }
    );
    return response.data;
  },

  requestTimeEstimate: async (route: number, stpid: number) => {
    const response = await axios.get(
      DeployedV1OmnibusUri + "/api/predictions",
      {
        params: {
          rt: route,
          stpid: stpid
        }
      }
    );
    return response.data;
  },

  getStops: async (route: number, direction: string) => {
    const response = await axios.get(DeployedV1OmnibusUri + "/api/stops", {
      params: {
        rt: route,
        dir: direction
      }
    });
    return response.data;
  },

  getDirections: async (route: number) => {
    const response = await axios.get(DeployedV1OmnibusUri + "/api/directions", {
      params: {
        rt: route
      }
    });

    return response.data;
  }
};

export default BusTrackerAPI;
