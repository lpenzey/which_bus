import React from 'react';
import BusEstimateComponent from '../busEstimateComponent/busEstimateComponent';
import Navbar from 'react-bootstrap/Navbar';
import BusTrackerAPI from '../../Services/BusTrackerAPI';

const Main: React.FC = () => {

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand>Which Bus <span role="img" aria-label="Thinking emoji">🧐</span></Navbar.Brand>
            </Navbar>
            <div className="App-header">
                <BusEstimateComponent api={BusTrackerAPI} />
            </div>
        </div>
    );
}

export default Main;