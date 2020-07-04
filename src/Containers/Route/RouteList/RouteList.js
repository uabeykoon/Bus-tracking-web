import React, { Component } from 'react';
import './Routelist.css';
import axios from '../../../Axios/Axios';

class RouteList extends Component {
    state = {
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
        axios.get("route.json")
            .then((response) => {
                axios.get("stations.json")
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
                            routerListWithAllAttrib:this.combineRelatedObject()
                        });
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
            <div>
                <br />
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Bus Number</th>
                            <th>Destination 1</th>
                            <th>Destination 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.routerListWithAllAttrib.map((routerObject) => {
                            return (<tr key={routerObject.id}>
                                <td>{routerObject.routeNumber}</td>
                                <td>{routerObject.destination1.stationName}({routerObject.destination1.district})</td>
                                <td>{routerObject.destination2.stationName}({routerObject.destination2.district})</td>
                            </tr>);
                        })}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default RouteList;