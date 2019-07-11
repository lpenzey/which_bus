import React from 'react';
import BusEstimate from './components/busEstimate/busEstimate';
import NavBar from './components/navBar/navBar';
import BusTrackerAPI from './Services/busTrackerAPI';


const Main: React.FC = () => {

    return (
        <div>
            <NavBar />
            <br></br>
            <BusEstimate api={BusTrackerAPI} />
        </div>
    );
}

export default Main;