import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <div>
                <div className="sidenav">
                    <NavLink to="/" exact>DashBoard</NavLink>
                    <NavLink to="/bus">Bus</NavLink>
                    <NavLink to="/route">Route</NavLink>
                    <NavLink to="/schedule">Schedule</NavLink>
                    {/* <a href="">Routs</a>
                    <a href="">Bus owners</a>
                    <a href="">Passengers</a>
                    <a href="">Shedule</a> */}
                    
                </div>
            </div>
        );
    }
}

export default Navbar;