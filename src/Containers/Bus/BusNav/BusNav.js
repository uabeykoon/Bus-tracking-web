import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

class BusNav extends Component {
    render() {
        return (
            <div>
                <nav className="nav nav-pills nav-fill">
                    <NavLink to="/bus" exact className="nav-item nav-link">Bus List</NavLink>
                    <NavLink to="/bus/addbus" className="nav-item nav-link">Add Bus</NavLink>
                    <NavLink to="/bus/busowners" className="nav-item nav-link">Bus Owners</NavLink>
                </nav>
            </div>
        );
    }
}

export default BusNav;