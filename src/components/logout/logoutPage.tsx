import React from "react";
import BusTrackerAPI from "../../Services/busTrackerAPI";
import NavBar from "components/navBar/navBar";
import GenericButton from "components/genericButton/genericButton";
import { OuterWrapper } from "styles/theme";
import { navigate } from "hookrouter";

const Logout: React.FC = () => {
  function logout() {
    sessionStorage.removeItem("whichBusToken");
    alert("You've been logged out");
    navigate("/");
  }
  return (
    <div>
      <NavBar />
      <OuterWrapper>
        <GenericButton handleChange={logout} label="Logout" />
      </OuterWrapper>
    </div>
  );
};

export default Logout;
