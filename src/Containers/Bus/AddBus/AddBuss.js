import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from '../../../Axios/Axios';

class AddBuss extends Component {

    state = {
        routeList: [],
        stationList: [],
        routerListWithAllAttrib: [],
        ownerList:[],
        errMessage:false,
        startStation:[],
        selectedName:null,
        selectedNumberPlate:null,
        selectedRoute:null,
        selectedOwner:null,
        selectedStartStation:null,
        selectedSeatCount:null,
        validate:true
    };


    componentDidMount() {
        //console.log(this.props);
        this.fetchingAllDataToDisplay();
        //console.log(this.state.routerListWithAllAttrib);
        this.fetchingBusOwnersToDisplay();
       
   

    }
    onChangeName= (event)=>{
        this.setState({
            selectedName:event.target.value
        });
    }
    onChangeNumberPlate= (event)=>{
        this.setState({
            selectedNumberPlate:event.target.value
        });
    }
    onChangeRoute=(event)=>{
        const startStation = [];
        const route = this.findRelatedObject(event.target.value,this.state.routerListWithAllAttrib);
        startStation.push({destinationNumber:"destination1",destination:route.destination1});
        startStation.push({destinationNumber:"destination2",destination:route.destination2});
        this.setState({
            selectedRoute:event.target.value,
            startStation:startStation
        });
        
    }
    onChangeBusOwner = (event) =>{
        this.setState({
            selectedOwner:event.target.value
        });
    }

    onChangeStartStation=(event)=>{
        this.setState({
            selectedStartStation:event.target.value
        });
    }

    onChangeSeatCount=(event)=>{
        this.setState({
            selectedSeatCount:event.target.value
        });
    }

    onClickSubmit = (event)=>{
        event.preventDefault();
        let validate = true;
        
        const data = {
            name:this.state.selectedName,
            numberPlate:this.state.selectedNumberPlate,
            routeID:this.state.selectedRoute,
            busOwnerID:this.state.selectedOwner,
            startStation:this.state.selectedStartStation,
            seatCount:this.state.selectedSeatCount
        }

        for(let x in data){
            if(data[x]===null || 0){
                validate=false;
                //console.log("false")
            }
        }
        if(validate){
            axios.post('bus.json',data)
            .then((resppnse)=>{
                this.props.history.push('/bus');
            })
            .catch((err)=>{
                this.setState({
                    errMessage:true
                })
            })
            //console.log("validation true")
        }else{
            this.setState({
                error:true
            })
        }




    }

    onClickCancel=()=>{
        this.props.history.push("/bus")
    }

    fetchingBusOwnersToDisplay = () => {
        axios.get('busOwners.json')
        .then((busOwners)=>{
            console.log(busOwners.data);
            this.setState({
                ownerList:this.convertObjectToArray(busOwners.data)
            });
            //console.log(this.convertObjectToArray(busOwners.data));

        })
        .catch((err)=>{
            console.log(err);
            this.setState({
                errerrMessageor:true
            });
        })
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

        const errMessage = this.state.error?(<div className="alert alert-danger" role="alert">
        Somthing went Wrong!
        </div>):null;

        return (
            <div>
                <div className="container">
                {errMessage}
                    <button type="button" className="btn btn-success" onClick={this.onClickAddNewOwner}>Success</button>
                    <form onSubmit={this.onClickSubmit}>
                        <legend>---ADD BUS---</legend>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Name" required onChange={this.onChangeName} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Number Plate</label>
                                <input type="text" className="form-control" placeholder="Number Plate" required onChange={this.onChangeNumberPlate} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Route</label>
                                <select className="form-control" onChange={this.onChangeRoute}>
                                <option value={0}>Select</option>
                                    {this.state.routerListWithAllAttrib.map((route)=>{
                                        return (<option key={route.id} value={route.id}>{route.routeNumber}/{route.destination1.stationName}-{route.destination2.stationName}</option>);
                                    })}
                                    
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Bus Owner</label>
                                <select className="form-control" onChange={this.onChangeBusOwner}>
                                <option value={0}>Select</option>
                                {this.state.ownerList.map((owners)=>{
                                        return (<option key={owners.id} value={owners.id}>{owners.nicNumber}</option>);
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Start Station</label>
                                <select className="form-control" onChange={this.onChangeStartStation}>
                                    <option value={0}>Select</option>
                                {this.state.startStation.map((station)=>{
                                        return (<option key={station.destination.id} value={station.destinationNumber}>{station.destination.stationName}</option>);
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Seat Count</label>
                                <input type="text" className="form-control" placeholder="Seat Count" required onChange={this.onChangeSeatCount} />
                            </div>
                        </div>

                        <button className="btn btn-primary" type="submit" >ADD BUS</button>
                        |
                        <button className="btn btn-danger" type="button" onClick={this.onClickCancel}>CANCEL</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default withRouter(AddBuss);