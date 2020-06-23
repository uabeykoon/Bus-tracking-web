import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Aux from '../../Layout/Aux';
import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <Aux>
                <div className="sidenav">
                    <NavLink to="/" exact>DashBoard</NavLink>
                    <NavLink to="/bus">Bus</NavLink>
                    <a href="">Routs</a>
                    <a href="">Bus owners</a>
                    <a href="">Passengers</a>
                    <a href="">Shedule</a>
                    
                </div>
            </Aux>
        );
    }
}

export default Navbar;