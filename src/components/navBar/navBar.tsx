import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './navBar.css';

const NavBar: React.FC = () => {
    return (
        <div>
            <Navbar sticky="top" variant="dark" className="navbar">
                <Navbar.Brand className="text">WHICH BUS <span role="img" aria-label="Thinking emoji">🧐</span></Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default NavBar;