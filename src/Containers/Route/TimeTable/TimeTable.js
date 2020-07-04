import React, { Component } from 'react';
import './Timetable.css';
import axios from '../../../Axios/Axios';
import TimeTableCharts from './TimeTableCharts/TimeTableCharts';

class TimeTable extends Component {


    state = {
        route: ["138/Colombo-Maharagama", "01/Colombo-Kandy"],
        loading: false,
        routeList: [],
        stationList: [],
        routerListWithAllAttrib: [],
        selectedRoute: null,
        selectedTime1: null,
        selectedTime2: null,
        destination1: 'Destination 1',
        destination2: 'Destination 2',
        timeList: [],
        timeList1: [],
        timeList2: []
    };

    onRouteSelecting = (event) => {
        this.setState({
            loading: true
        });
        const routeDetails = this.findRelatedObject(event.target.value, this.state.routerListWithAllAttrib);
        this.setState({
            selectedRoute: event.target.value,
            destination1: routeDetails.destination1.stationName,
            destination2: routeDetails.destination2.stationName,
        });
        this.fetchTimeTableDatafromDataBase(event.target.value);
    }

    onTime1Change = (event) => {
        this.setState({
            selectedTime1: event.target.value
        });
    }
    onTime2Change = (event) => {
        this.setState({
            selectedTime2: event.target.value
        });
    }
    //add time slot for specific route
    storeTimeTableDataInDataBase = (data) => {
        axios.post("timeTable.json", data)
            .then((response) => {
                console.log(response);
                this.setState({
                    loading: false
                });
                this.fetchTimeTableDatafromDataBase(this.state.selectedRoute);
            }).catch((err) => {
                console.log(err);
                this.setState({
                    loading: false
                });
            });
    }
    //fetch time tabel slots for related routeID data from database
    fetchTimeTableDatafromDataBase = (routeID) => {
        axios.get(`timeTable.json?orderBy="routeID"&equalTo="${routeID}"`)
            .then((response) => {
                this.setState({
                    timeList: this.convertObjectToArray(response.data),
                    loading: false
                });
                this.divideTimeTableInToTwoDestination(this.state.timeList);
                
            }).catch((err) => {
                console.log(err);

            });
    }

    //on click add time button1
    onAddTimeButton1Click = (event) => {
        this.setState({
            loading: true
        });
        const data = {
            routeID: this.findRelatedRoute(this.state.selectedRoute).id,
            startingStation: "destination1",
            departureTime: this.state.selectedTime1
        };
        this.storeTimeTableDataInDataBase(data);
    }
    onAddTimeButton2Click = () => {
        this.setState({
            loading: true
        });
        const data = {
            routeID: this.findRelatedRoute(this.state.selectedRoute).id,
            startingStation: "destination2",
            departureTime: this.state.selectedTime2
        };
        this.storeTimeTableDataInDataBase(data);
    }

    findRelatedStation = (id) => {
        return this.state.stationList.find((el) => el.id === id);
    }
    findRelatedRoute = (id) => {
        return this.state.routeList.find((el) => el.id === id);
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
    divideTimeTableInToTwoDestination =(timeList)=>{
        let timeList1=[];
        let timeList2=[];

        for(let time of timeList){
            if(time.startingStation==="destination1"){
                timeList1.push(time);
            }
            else if(time.startingStation==="destination2"){
                timeList2.push(time);
            }
        }
        console.log(timeList1);
        this.setState({
            timeList1:timeList1,
            timeList2:timeList2,
        });
    }

    combineRelatedObject = () => {
        let newArray = []
        for (let ob of this.state.routeList) {
            newArray.push({ ...ob, destination1: this.findRelatedStation(ob.destination1), destination2: this.findRelatedStation(ob.destination2) })
        }
        return newArray;
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
                    })
                    .catch((e) => {
                        console.log(e);
                    });

            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.fetchingAllDataToDisplay();
    }

    render() {

        const input1 = this.state.selectedRoute === "0" || this.state.selectedRoute === null ? null : (<div className="input-group mb-3">
            <input type="time" className="form-control" aria-describedby="basic-addon2" onChange={this.onTime1Change} />
            <div className="input-group-append">
                <button className="btn btn-success" type="button" onClick={this.onAddTimeButton1Click}>ADD TIME</button>
            </div>
        </div>);

        const input2 = this.state.selectedRoute === "0" || this.state.selectedRoute === null ? null : (<div className="input-group mb-3">
            <input type="time" className="form-control" aria-describedby="basic-addon2" onChange={this.onTime2Change} />
            <div className="input-group-append">
                <button className="btn btn-success" type="button" onClick={this.onAddTimeButton2Click}>ADD TIME</button>
            </div>
        </div>);

        const loading = this.state.loading ? (<><div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div></>) : null;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <br />
                        <h1>Select Route</h1>

                        <select className="form-control" name="destination1" onChange={this.onRouteSelecting}>
                            <option value={0}>Select Route</option>
                            {this.state.routerListWithAllAttrib.map((route) => {
                                return (<option value={route.id} key={route.id}>{route.routeNumber}/{route.destination1.stationName}-{route.destination2.stationName}</option>);
                            })}

                        </select>
                        <br />
                        <br />

                        {loading}

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <TimeTableCharts destination={this.state.destination1} timeList={this.state.timeList1} input2={input1} />
                    </div>
                    <div className="col-md-6">
                        <TimeTableCharts destination={this.state.destination2} timeList={this.state.timeList2} input2={input2} />
                    </div>
                </div>

            </div>
        );
    }
}

export default TimeTable;