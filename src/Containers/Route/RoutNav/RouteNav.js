import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class RouteNav extends Component {
    render() {
        return (
            <div>
                <nav className="nav nav-pills nav-fill">
                    
                    <NavLink to="/route" exact className="nav-item nav-link">Route List</NavLink>
                    <NavLink to="/route/timetable" className="nav-item nav-link">Time Table</NavLink>
                    <NavLink to="/route/addroute" className="nav-item nav-link">Add Route</NavLink>
          
                </nav>
            </div>
        );
    }
}

export default RouteNav;




