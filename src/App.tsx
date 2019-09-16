import React from "react";
import { useRoutes } from "hookrouter";
import "./App.css";
import Main from "./main";
import Login from "./components/login/loginPage";
import Register from "./components/registration/registrationPage";
import NotFound from "./components/notFound/notFound";

const routes = {
  "/": () => <Main />,
  "/login": () => <Login />,
  "/register": () => <Register />
};

const App: React.FC = () => {
  const routeResult = useRoutes(routes);

  return routeResult || <NotFound />;
};

export default App;
