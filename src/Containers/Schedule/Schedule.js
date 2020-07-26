import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import axios from '../../Axios/Axios';
import SingleDateSheduleChart from './SingleDateSheduleChart/SingleDateSheduleChart';

class Schedule extends Component {

    state = {
        route: ["138/Colombo-Maharagama", "01/Colombo-Kandy"],
        date: [],
        dayBuses: [],
        busList: [],
        routeList: [],
        stationList: [],
        sheduleList: [],
        routerListWithAllAttrib: [],
        busListWithAllAttribb: [],
        selectedRouteDestination1: "Destination 1",
        selectedRouteDestination2: "Destination 2",
        selectedRoute: null,
        selectedDate: null,
        timeList: [],
        timeList1: [],
        timeList2: [],
        errMessage: false,
        validate: true
    }

    ab = () => {
        let y = [];
        for (let x = 1; x < 32; x++) {
            y.push(x);
        }
        this.setState({
            date: y
        });

    }

    fillDateForTimes = () => {
        const newDayBusses = [];
        for (let x = 1; x < 32; x++) {
            newDayBusses.push({ date: x, busID: null });
        }
        return newDayBusses;
    }
    onChangeRoute = (event) => {
        this.setState({
            selectedRoute: event.target.value
        });


    }
    onChangeDate = (event) => {
        this.setState({
            selectedDate: event.target.value
        })
    }

    onChangeBusdes1 = (routTimeID,event) =>{
        console.log(routTimeID);
        let array = [];
        for(let t of this.state.timeList1){
            let check = t.id===routTimeID?true:false;
            if(check){
                array.push({...t,buttonDisable:false});
            }else{
                array.push({...t});
            }
           
        }
        this.setState({
            timeList1:array
        });
    }

    onChangeBusdes2 = (routTimeID,event) =>{
        console.log(routTimeID);
        console.log(event.target.value);
    }

    onGetSheduleButtomClick = () => {
        const routeDetails = this.findRelatedObject(this.state.selectedRoute, this.state.routerListWithAllAttrib);
        this.setState({
            selectedRouteDestination1: routeDetails.destination1.stationName,
            selectedRouteDestination2: routeDetails.destination2.stationName,
        });
        this.fetchTimeTableDatafromDataBase(this.state.selectedRoute,this.state.selectedDate);
    }

    componentDidMount() {
        this.ab();
        this.fetchingAllDataToDisplay();

        // //console.log(this.state.route)
        // const data = {
        //     routeID:"154dkihjkk",
        //     times:[
        //         {time:9.35,busDate:this.fillDateForTimes()}
        //         ]
        // }
        // axios.patch("https://bus-track-8b429.firebaseio.com/shedule.json",data).then(response=>{console.log(response)})
        // .catch(err=>{console.log(err)});

        // axios.get("https://bus-track-8b429.firebaseio.com/shedule.json?routID='125ksl'").then(response=>{
        //     //console.log(response.data)
        //     const s = [];

        //     // for(let key in response.data){
        //     //     s.push({...response.data[key],id:key});
        //     // }
        //     console.log(response.data);
        // });

        // // console.log(this.fillDateForTimes());
    }


    fetchingAllDataToDisplay = () => {
        axios.get("route.json")
            .then((response) => {
                axios.get("stations.json")
                    .then((response2) => {
                        axios.get("bus.json")
                            .then((respons3) => {
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

                                this.setState({
                                    busList: this.convertObjectToArray(respons3.data)
                                });

                                this.setState({
                                    busListWithAllAttribb: this.combineFullRouteToBus()
                                })
                                //console.log(this.state.routerListWithAllAttrib)
                                // console.log(this.state.stationList);
                                //console.log(this.state.routerListWithAllAttrib)

                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //fetch time tabel slots for related routeID data from database
    fetchTimeTableDatafromDataBase = (routeID,date) => {
        axios.get(`timeTable.json?orderBy="routeID"&equalTo="${routeID}"`)
            .then((response) => {
                axios.get(`shedule.json`)
                    .then((response2) => {
                        this.setState({
                            timeList: this.convertObjectToArray(response.data),
                            sheduleList:this.convertObjectToArray(response2.data),
                            loading: false
                        });
                        console.log(response2.data);
                        this.divideTimeTableInToTwoDestination(this.state.timeList);
                    })
                    .catch(() => {

                    });
            }).catch((err) => {
                console.log(err);

            });
    }

    divideTimeTableInToTwoDestination = (timeList) => {
        let timeList1 = [];
        let timeList2 = [];

        for (let time of timeList) {
            if (time.startingStation === "destination1") {
                timeList1.push({...time,buttonDisable:true});
            }
            else if (time.startingStation === "destination2") {
                timeList2.push({...time,buttonDisable:true});
            }
        }
        //console.log(timeList2);
        this.setState({
            timeList1: timeList1,
            timeList2: timeList2,
        });
    }



    findRelatedObject = (id, array) => {
        return array.find((el) => el.id === id);
    }

    findRelatedObjectWithVariable = (array) => {
        let newArray = array.filter((shedule) => {
            if (shedule.routeID === this.state.selectedRoute && shedule.dateOfMonth === this.state.selectedDate) {
                return true;
            } else {
                return false;
            }
        });
        return newArray;
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
        //console.log(newArray);
        return newArray;
    }
    combineFullRouteToBus = () => {
        let newArray = []
        for (let ob of this.state.busList) {
            newArray.push({ ...ob, routeID: this.findRelatedObject(ob.routeID, this.state.routerListWithAllAttrib) });
        }
        console.log(newArray);
        return newArray;
    }


    findRelatedStation = (id) => {
        return this.state.stationList.find((el) => el.id === id);
    }



    combineTimeTableAndDate = () => {
        let newArray = [];
        for (let time of this.state.timeList) {
            newArray.push({ ...time, routTimeID: this.findRelatedObject(time.id) })
        }
    }


    render() {

        const fullTable = (<table id="customers">
            <thead>
                <tr>
                    {this.state.date.map((x) => {
                        return (<th value={x} key={x}>{x}</th>);
                    })}

                </tr>
            </thead>
            <tbody>
                <tr>
                    {this.state.date.map((x) => {
                        return (<td value={x} key={x}>NB-2354</td>);
                    })}
                </tr>

            </tbody>
        </table>);

        const singleDateTable = (<SingleDateSheduleChart />);


        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <br />
                        <h1>Select Route</h1>

                        <select className="form-control" onChange={this.onChangeRoute}>
                            <option value={0}>Select</option>
                            {this.state.routerListWithAllAttrib.map((route) => {
                                return (<option key={route.id} value={route.id}>{route.routeNumber}/{route.destination1.stationName}-{route.destination2.stationName}</option>);
                            })}

                        </select>
                        <br />

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Select Date</h1>
                        <select className="form-control" id="exampleFormControlSelect1" name="destination1" onChange={this.onChangeDate}>
                            <option value={0}>All</option>
                            {this.state.date.map((x) => {
                                return (<option value={x} key={x}>{x}</option>);
                            })}
                        </select>
                        <br />
                        <br />

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-primary" onClick={this.onGetSheduleButtomClick}>Get Shedule</button><br /><br />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <SingleDateSheduleChart destination={this.state.selectedRouteDestination1} timeList={this.state.timeList1} busList={this.state.busList} onChangeBus={this.onChangeBusdes1}/>
                    </div>
                    <div className="col-md-6">
                        <SingleDateSheduleChart destination={this.state.selectedRouteDestination2} timeList={this.state.timeList2} busList={this.state.busList} onChangeBus={this.onChangeBusdes2}/>

                    </div>

                </div>

            </div>
        );
    }
}

export default Schedule;