import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from '../../../Axios/Axios';

class AddBuss extends Component {

    state = {
        routeList: [],
        stationList: [],
        routerListWithAllAttrib: [],
    };


    componentDidMount() {
        //console.log(this.props);
        this.fetchingAllDataToDisplay();
        //console.log(this.state.routerListWithAllAttrib);

    }

    fetchingAllDataToDisplay = () => {
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
                            routerListWithAllAttrib: this.combineRelatedObject()
                        });
                        //console.log(this.state.routerListWithAllAttrib)
                        // console.log(this.state.stationList);
                        // console.log(this.state.routerListWithAllAttrib)
                    })
                    .catch((e) => {
                        console.log(e);
                    });

            })
            .catch((err) => {
                console.log(err);
            });
    }


    findRelatedObject = (id, array) => {
        return array.find((el) => el.id === id);
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
    findRelatedStation = (id) => {
        return this.state.stationList.find((el) => el.id === id);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form>
                        <legend>---Vehicle Details---</legend>
                        <div className="col-md-3 mb-3">
                            <label>Owner ID </label>
                            <select className="custom-select" id="validationDefault01" required>
                                <option disabled value="">Choose Owner ID</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Registration Number</label>
                                <input type="text" className="form-control" id="validationDefault02" placeholder="Registration Number" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Scanned image of the registered vehicle permit </label>
                            <select className="custom-select" id="validationDefault03" required>
                                <option disabled value="">Choose...</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Route permit number</label>
                                <input type="text" className="form-control" id="validationDefault07" placeholder="Route permit number" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Scanned image of the route permit </label>
                            <select className="custom-select" id="validationDefault04" required>
                                <option disabled value="">Choose...</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Route Number</label>
                                <select className="form-control form-control-md">
                                    <option value="">Large select</option>
                                    {this.state.routerListWithAllAttrib.map((route) => {
                                        return (<option value={route.id} key={route.id}>{route.routeNumber}/{route.destination1.stationName}-{route.destination2.stationName}</option>);
                                    })}
                                </select>
                                {/* <label for="validationDefault05">Route Number</label>
                                <input type="text" className="form-control" id="validationDefault05" value="" placeholder="Route Number" required /> */}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label >Seating Capacity</label>
                                <input type="text" className="form-control" id="validationDefault06" placeholder="Number of seats" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Start Station</label>
                                <input type="text" className="form-control" id="validationDefault07" placeholder="Start" required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>End Station</label>
                                <input type="text" className="form-control" id="validationDefault08" placeholder="End" required />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Submit form</button>
                        |
                        <button className="btn btn-danger" type="submit">Cancel</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default withRouter(AddBuss);