import React, { Component } from 'react';
import axios from 'axios';
import './Addroute.css';

class AddRoute extends Component {


    state = {
        stations: [{ id: 0, name: "Select" }],
        routeNumber: null,
        destination1: null,
        destination2: null,
        estTimeHours: null,
        estTimeMinutes: null,
        validate:true,
        loading:false


    }


    onChangeRouteNumber = (e) => {
        this.setState({
            routeNumber: e.target.value
        });
    }
    onChangeDestination1 = (e) => {
        this.setState({
            destination1: e.target.value
        });
        console.log(e.target.value);
    }
    onChangeDestination2 = (e) => {
        this.setState({
            destination2: e.target.value
        });
    }

    onChangeEstHours = (e) => {
        this.setState({
            estTimeHours: e.target.value
        })
    }
    onChangeEstMinutes = (e) => {
        this.setState({
            estTimeMinutes: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            routeNumber: this.state.routeNumber,
            destination1: this.state.destination1,
            destination2: this.state.destination2,
            estTimeHours: this.state.estTimeHours,
            estTimeMinutes: this.state.estTimeMinutes
        }
        console.log(data)
        for(let x in data){
            if(data[x]===null || 0){
                this.setState({
                    validate:false
                });
            }
        }

        if(this.state.validate){
            this.setState({
                loading:true
            });
            axios.post("https://bus-track-8b429.firebaseio.com/route.json",data)
        .then((response)=>{
            console.log(response);
            this.setState({
                loading:false
            });
            this.props.history.push("/route");
        })
        .catch((err)=>{
            console.log(err);
        }); 
        }

    
    }

    componentDidMount() {
        axios.get("https://bus-track-8b429.firebaseio.com/stations.json")
            .then((response) => {
                let stationsArray = [];
                for (let key in response.data) {
                    stationsArray.push({ ...response.data[key], id: key });
                }
                this.setState({
                    stations: [...stationsArray]
                });
            })
    }

    render() {
        const error = this.state.validate?null:(<div className="alert alert-danger" role="alert">
       Please complete Form before Submit
      </div>);

      const spinner = this.state.loading?(<><div className="lds-ring"><div /></div><div></div><div></div></>):null;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <legend>---ADD ROUTE---</legend>
                    {spinner}
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Route Number</label>
                            <input type="text" className="form-control" placeholder="Route Number " required name="routeNumber" onChange={this.onChangeRouteNumber} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Destination 1</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="destination1" onChange={this.onChangeDestination1} required>
                                <option value={0}>Select Destination</option>
                                {this.state.stations.map((x) => {
                                    return (<option value={x.id} key={x.id}>{x.stationName}({x.district})</option>);
                                })}

                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Destination 2</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="destination2" onChange={this.onChangeDestination2} required>
                                <option  value={0}>Select Destination</option>
                                {this.state.stations.map((x) => {
                                    return (<option value={x.id} key={x.id}>{x.stationName}({x.district})</option>);
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label>Estimated Time</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label>Hours</label>
                            <input type="text" className="form-control" placeholder="hh" required name="estTimeHour" onChange={this.onChangeEstHours} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Minutes</label>
                            <input type="text" className="form-control" placeholder="mm" required name="estTimeMinute" onChange={this.onChangeEstMinutes} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <input type="submit" value="SUBMIT" className="btn btn-primary" /> |

                            <input type="reset" value="RESET" className="btn btn-danger" />
                        </div>
                    </div>
                    
                    {error}
                </form>

            </div>
        );
    }
}

export default AddRoute;