import React, { Component } from 'react';
import './Timetable.css'

class TimeTable extends Component {

    state = {
        route: ["138/Colombo-Maharagama", "01/Colombo-Kandy"]
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <br />
                        <h1>Select Route</h1>
                        
                        <select className="form-control" id="exampleFormControlSelect1" name="destination1">
                            {this.state.route.map((x) => {
                                return (<option value={x} key={x}>{x}</option>);
                            })}

                        </select>
                        <br />
                        <br />

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h4>From Destination 1</h4><br />
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Route</th>
                                    <th>Departure Time</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>138</td>
                                    <td>8.55 AM</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <h4>From Destination 2</h4><br />
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Route</th>
                                    <th>Departure Time</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>138</td>
                                    <td>8.55 AM</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default TimeTable;