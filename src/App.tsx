import React from "react";
import { useRoutes } from "hookrouter";
import Main from "./main";
import Login from "./components/login/loginPage";
import Register from "./components/registration/registrationPage";
import NotFound from "./components/notFound/notFound";
import BusTrackerAPI from "./Services/busTrackerAPI";
import Favorites from "./components/favorites/Favorites";

const routes = {
  "/": () => <Main />,
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/favorites": () => <Favorites api={BusTrackerAPI} />
};

const App: React.FC = () => {
  const routeResult = useRoutes(routes);

  return routeResult || <NotFound />;
};

export default App;
