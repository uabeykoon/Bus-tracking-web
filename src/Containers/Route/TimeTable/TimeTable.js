import React, { Component } from 'react';
import './Timetable.css';
import axios from 'axios';

class TimeTable extends Component {


    state = {
        route: ["138/Colombo-Maharagama", "01/Colombo-Kandy"],
        routeList: [],
        stationList: [],
        routerListWithAllAttrib: []
    };

    findRelatedStation = (id) => {
        return this.state.stationList.find((el) => el.id === id);
    }

    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }

    combineRelatedObject = () => {
        let newArray = []
        for (let ob of this.state.routeList) {
            newArray.push({ ...ob, destination1: this.findRelatedStation(ob.destination1), destination2: this.findRelatedStation(ob.destination2) })
        }
        return newArray;
    }

    componentDidMount() {
        axios.get("https://bus-track-8b429.firebaseio.com/route.json")
            .then((response) => {
                axios.get("https://bus-track-8b429.firebaseio.com/stations.json")
                    .then((response2) => {
                        //fetch ad converto to array stations
                        this.setState({
                            stationList: this.convertObjectToArray(response2.data)
                        });
                        //fetch ad converto to array route
                        this.setState({
                            routeList: this.convertObjectToArray(response.data)
                        });

                        this.setState({
                            routerListWithAllAttrib: this.combineRelatedObject()
                        });
                        console.log(this.state.routerListWithAllAttrib)
                    })
                    .catch((e) => {
                        console.log(e);
                    });

            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <br />
                        <h1>Select Route</h1>

                        <select className="form-control" name="destination1">
                            {this.state.routerListWithAllAttrib.map((route) => {
                                return (<option value={route.id} key={route.id}>{route.routeNumber}/{route.destination1.stationName}-{route.destination2.stationName}</option>);
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