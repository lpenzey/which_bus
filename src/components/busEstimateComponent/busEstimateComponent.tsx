import React from 'react';
import './busEstimateComponent.css';
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

class BusEstimateComponent extends React.Component<busEstimateProps, busEstimateState> {
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
            time: updatedTime,
            stopName: updatedStopName,
            route: updatedRoute,
            direction: updatedDirection
        });
    }

    render() {
        return (
            <div className="timeTable">
                ROUTE:  {this.state.route}
                <br></br>
                STOP: {this.state.stopName}
                <br></br>
                DIRECTION: {this.state.direction}
                <br></br>
                NEXT BUS ARRIVES AT: {this.state.time}
                <br></br>
                <Button variant="primary" id="estimateButton" onClick={this.getEstimate.bind(this)}>Click to Get Estimate</Button>
            </div>
        );
    }
}

export default BusEstimateComponent;