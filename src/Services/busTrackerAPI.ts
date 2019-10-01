import axios from "axios";
import { navigate } from "hookrouter";

const DeployedV1OmnibusUrl = "https://omnibus-backend.herokuapp.com/v1";
const DeployedV2OmnibusUrl = "https://omnibus-backend.herokuapp.com/v2";
const Localv1OmnibusUrl = "http://localhost:8080/v1";
const Localv2OmnibusUrl = "http://localhost:8080/v2";
const omnibusUrl = DeployedV2OmnibusUrl;

const BusTrackerAPI = {
  getAllRoutes: async () => {
    const response = await axios.get(omnibusUrl + "/api/routes");
    return response.data;
  },

  registerUser: async (userName: string, password: string) => {
    const response = await axios.post(omnibusUrl + "/users/register", {
      name: userName,
      password: password
    });
    alert(response.data.action);
    return response.data;
  },

  login: async (userName: string, passWord: string) => {
    const response = await axios
      .post(
        omnibusUrl + "/users/login",
        {},
        {
          auth: {
            username: userName,
            password: passWord
          },
          withCredentials: true
        }
      )
      .then(function(response) {
        alert("Login Successful");
        sessionStorage.setItem(
          "whichBusToken",
          response.headers["authorization"]
        );
        navigate("/");
      })
      .catch(function(error) {
        alert("There was an error logging in, please try again.");
      });

    return response;
  },

  getFavorites: async () => {
    const token = sessionStorage.getItem("whichBusToken");
    const response = await axios.get(omnibusUrl + "/users/favorites", {
      headers: { Authorization: `${token}` }
    });
    return response.data;
  },

  addToFavorites: async (route: string, stopId: string) => {
    const token = sessionStorage.getItem("whichBusToken");
    const response = await axios.post(
      omnibusUrl + "/users/favorites",
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
    const response = await axios.get(omnibusUrl + "/api/predictions", {
      params: {
        rt: route,
        stpid: stpid
      }
    });
    return response.data;
  },

  getStops: async (route: number, direction: string) => {
    const response = await axios.get(omnibusUrl + "/api/stops", {
      params: {
        rt: route,
        dir: direction
      }
    });
    return response.data;
  },

  getDirections: async (route: number) => {
    const response = await axios.get(omnibusUrl + "/api/directions", {
      params: {
        rt: route
      }
    });

    return response.data;
  }
};

export default BusTrackerAPI;
