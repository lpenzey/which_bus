import React from 'react';
import BusEstimate from './components/busEstimate/busEstimate';
import NavBar from './components/navBar/navBar';
import BusTrackerAPI from './Services/busTrackerAPI';
import { appConfig } from 'configs/App';
import StubBusTrackerAPI from 'Services/stubBusTrackerAPI';

const Main: React.FC = () => {
    const busTrackerApi = appConfig.useMockApi ? StubBusTrackerAPI : BusTrackerAPI;

    return (
        <div>
            <NavBar />
            <br></br>
            <BusEstimate api={busTrackerApi} />
        </div>
    );
}

export default Main;