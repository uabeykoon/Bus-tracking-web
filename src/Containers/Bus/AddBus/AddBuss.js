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
                    <button type="button" className="btn btn-success" onClick={this.onClickAddNewOwner}>Success</button>
                    <form onSubmit={this.onClickSubmit}>
                        <legend>---ADD BUS---</legend>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Name" required onChange={this.onChangeFirstName} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Number Plate</label>
                                <input type="text" className="form-control" placeholder="Number Plate" required onChange={this.onChangeLastName} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Route</label>
                                <select className="form-control">
                                    {this.state.routerListWithAllAttrib.map((route)=>{
                                        return (<option key={route.id}>{route.routeNumber}/{route.destination1.stationName}-{route.destination2.stationName}</option>);
                                    })}
                                    
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Bus Owner</label>
                                <select className="form-control">
                                    <option>Default select</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Start Station</label>
                                <select className="form-control">
                                    <option>Default select</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Seat Count</label>
                                <input type="text" className="form-control" placeholder="Seat Count" required onChange={this.onChangeAddressLine3} />
                            </div>
                        </div>

                        <button className="btn btn-primary" type="submit" >ADD BUS</button>
                        |
                        <button className="btn btn-danger" type="submit">CANCEL</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default withRouter(AddBuss);