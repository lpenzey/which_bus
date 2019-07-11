import React from 'react';
import './busEstimate.css';
import Button from 'react-bootstrap/Button';

interface busEstimateState {
    route: string;
    time: string;
    stopName: string;
    direction: string;
}

interface busEstimateProps {
    api: any;
}

class BusEstimate extends React.Component<busEstimateProps, busEstimateState> {
    constructor(props: busEstimateProps) {
        super(props);
        this.state = {
            route: "",
            time: "",
            stopName: "",
            direction: ""
        };
    }

    getEstimate = async () => {
        let data = await this.props.api.requestTimeEstimate(20, 456, "json")
        let dataRoot = data["bustime-response"].prd[0]
        let updatedTime = dataRoot.prdtm.split(' ')[1]
        let updatedStopName = dataRoot.stpnm
        let updatedRoute = dataRoot.rt
        let updatedDirection = dataRoot.rtdir


        this.setState({
            time: "ARRIVING AT: " + updatedTime,
            stopName: "STOP: " + updatedStopName,
            route: "ROUTE: " + updatedRoute,
            direction: "DIRECTION: " + updatedDirection
        });
    }

    render() {
        return (
            <div className="timeTable">
                <div className="innerText">
                    {this.state.route}
                    <br></br>
                    {this.state.stopName}
                    <br></br>
                    {this.state.direction}
                    <br></br>
                    {this.state.time}
                    <br></br>
                </div>
                <Button variant="light" id="estimateButton" onClick={this.getEstimate.bind(this)}>Get Estimate</Button>
            </div>
        );
    }
}

export default BusEstimate;