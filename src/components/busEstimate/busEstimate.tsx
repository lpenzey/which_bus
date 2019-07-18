import React from "react";
import "./busEstimate.css";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import GenericDropdown from "../genericDropdown/genericDropdown";

interface busEstimateState {
  routes: Array<any>;
  directions: Array<any>;
  stops: Array<any>;
  selectedRoute: string;
  selectedDirection: string;
  selectedStop: string;
  stpid: string;
  time: string;
}

interface busEstimateProps {
  api: any;
}

class BusEstimate extends React.Component<busEstimateProps, busEstimateState> {
  constructor(props: busEstimateProps) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleStopChange = this.handleStopChange.bind(this);
    this.state = {
      routes: [],
      directions: [],
      stops: [],
      selectedRoute: "Select Route",
      selectedDirection: "Select Direction",
      selectedStop: "Select Stop",
      time: "",
      stpid: ""
    };
  }

  handleRouteChange(route: string) {
    this.setState({ selectedRoute: route }, () => {
      this.populateDirections();
    });
  }

  handleDirectionChange(direction: string) {
    this.setState({ selectedDirection: direction }, () => {
      this.populateStops();
    });
  }

  handleStopChange(stop: string) {
    this.getStpid(stop);
    this.setState({ selectedStop: stop }, () => {
      this.getEstimate();
    });
  }

  populateDirections = async () => {
    let data = await this.props.api.getDirections(
      this.state.selectedRoute,
      "json"
    );
    let availableDirections = data["bustime-response"].directions.map(
      (direction: any) => {
        return { value: direction.dir, display: direction.dir };
      }
    );

    this.setState({
      directions: availableDirections
    });
  };

  populateStops = async () => {
    let data = await this.props.api.getStops(
      this.state.selectedRoute,
      this.state.selectedDirection,
      "json"
    );
    let availableStops = data["bustime-response"].stops.map((stop: any) => {
      return { value: stop.stpnm, id: stop.stpid, display: stop.stpnm };
    });

    this.setState({
      stops: availableStops
    });
  };

  getEstimate = async () => {
    let data = await this.props.api.requestTimeEstimate(
      this.state.selectedRoute,
      this.state.stpid,
      "json"
    );
    let dataRoot = data["bustime-response"].prd[0];
    let updatedTime = dataRoot.prdtm.split(" ")[1];

    this.setState({
      time: "Next Bus Arrives At " + updatedTime
    });
  };

  getStpid(stopName: string) {
    let stopObject = this.state.stops.find(stop => stop.display === stopName);

    this.setState({
      stpid: stopObject.id
    });
  }

  componentDidMount = async () => {
    let data = await this.props.api.getAllRoutes("json");
    let allRoutes = data["bustime-response"].routes.map((route: any) => {
      return { value: route.rt, display: route.rt };
    });

    this.setState({
      routes: allRoutes
    });
  };

  render() {
    return (
      <div className="timeTable" data-testid="dropdown-container">
        <ButtonToolbar>
          <GenericDropdown
            display={this.state.selectedRoute}
            contents={this.state.routes}
            handleChange={this.handleRouteChange}
          />
          <GenericDropdown
            display={this.state.selectedDirection}
            contents={this.state.directions}
            handleChange={this.handleDirectionChange}
          />
          <GenericDropdown
            display={this.state.selectedStop}
            contents={this.state.stops}
            handleChange={this.handleStopChange}
          />
        </ButtonToolbar>
        <div className="innerText" data-testid="estimate">
          {this.state.time}
          <br />
        </div>
      </div>
    );
  }
}

export default BusEstimate;
