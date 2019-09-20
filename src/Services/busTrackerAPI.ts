import axios from "axios";

const DeployedOmnibusUri = "https://omnibus-backend.herokuapp.com";
const LocalOmnibusUri = "http://localhost:8080";

const BusTrackerAPI = {
  getAllRoutes: async () => {
    const response = await axios.get(LocalOmnibusUri + "/api/routes");
    return response.data;
  },

  registerUser: async (userName: string, password: string) => {
    const response = await axios.post(LocalOmnibusUri + "/users/register", {
      name: userName,
      password: password
    });
    return response.data;
  },

  login: async (userName: string, passWord: string) => {
    const response = await axios.post(
      LocalOmnibusUri + "/users/login",
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
    const response = await axios.get(LocalOmnibusUri + "/users/favorites", {
      headers: { Authorization: `${token}` }
    });
    return response.data;
  },

  addToFavorites: async (route: string, stopId: string) => {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      LocalOmnibusUri + "/users/favorites",
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
    const response = await axios.get(LocalOmnibusUri + "/api/predictions", {
      params: {
        rt: route,
        stpid: stpid
      }
    });
    return response.data;
  },

  getStops: async (route: number, direction: string) => {
    const response = await axios.get(LocalOmnibusUri + "/api/stops", {
      params: {
        rt: route,
        dir: direction
      }
    });
    return response.data;
  },

  getDirections: async (route: number) => {
    const response = await axios.get(LocalOmnibusUri + "/api/directions", {
      params: {
        rt: route
      }
    });

    return response.data;
  }
};

export default BusTrackerAPI;
