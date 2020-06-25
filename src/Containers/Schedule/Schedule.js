import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';

class Schedule extends Component {

    state = {
        route: ["138/Colombo-Maharagama", "01/Colombo-Kandy"],
        date: [],
        dayBuses:[]
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

    fillDateForTimes=()=>{
        const newDayBusses =[];
        for(let x=1;x<32;x++){
        newDayBusses.push({date:x,busID:null});
        }
        return newDayBusses;
    }

    componentDidMount(){
       this.ab();

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

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Select Date</h1>
                        <select className="form-control" id="exampleFormControlSelect1" name="destination1">
                            <option>All</option>
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
                        <h4>From Destination 1</h4><br />
                        <table id="customers">
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
                        </table>
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default Schedule;