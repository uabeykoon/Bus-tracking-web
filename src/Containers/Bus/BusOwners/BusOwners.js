import React, { Component } from 'react';
import axios from '../../../Axios/Axios'


class BusOwners extends Component {


    state = {
        firstName: "",
        lastName: "",
        nicNumber: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        contactNumber: "",
        error:false
    };


    onChangeFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        });
    }
    onChangeLastName = (event) => {
        this.setState({
            lastName: event.target.value
        });
    }
    onChangeNIC = (event) => {
        this.setState({
            nicNumber: event.target.value
        });
    }
    onChangeAddressLine1 = (event) => {
        this.setState({
            addressLine1: event.target.value
        });
    }
    onChangeAddressLine2 = (event) => {
        this.setState({
            addressLine2: event.target.value
        });
    }
    onChangeAddressLine3 = (event) => {
        this.setState({
            addressLine3: event.target.value
        });
    }
    onChangeContactNumber = (event) => {
        this.setState({
            contactNumber: event.target.value
        });
    }
    onClickSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            nicNumber: this.state.nicNumber,
            addressLine1: this.state.addressLine1,
            addressLine2: this.state.addressLine2,
            addressLine3: this.state.addressLine3,
            contactNumber: this.state.contactNumber
        }
        this.storeDataInToDatabase(data)
        .then((response)=>{
            this.setState({
                error:false
            });
            this.props.history.push("/bus");
        })
        .catch((err)=>{
            //this.props.history.push("/bus/busowners")
            this.setState({
                error:true
            });
        });
        
    }

    storeDataInToDatabase =(data) =>{
        return axios.post('busOwners.json',data);
    }

    onClickAddNewOwner =() =>{
        this.props.history.push()
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
                        <legend>---Owner Registration---</legend>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>First Name</label>
                                <input type="text" className="form-control" placeholder="First Name" required onChange={this.onChangeFirstName} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Last Name</label>
                                <input type="text" className="form-control" placeholder="Last Name" required onChange={this.onChangeLastName} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>NIC Number</label>
                                <input type="text" className="form-control" placeholder="NIC Number" required onChange={this.onChangeNIC} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Address Line 1</label>
                                <input type="text" className="form-control" placeholder="Address Line 1" required onChange={this.onChangeAddressLine1} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Address Line 2</label>
                                <input type="text" className="form-control" placeholder="Address Line 2" required onChange={this.onChangeAddressLine2} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Address Line 3</label>
                                <input type="text" className="form-control" placeholder="Address Line 3" required onChange={this.onChangeAddressLine3} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label>Contact Number</label>
                                <input type="text" className="form-control" placeholder="Contact Number" required onChange={this.onChangeContactNumber}/>
                            </div>
                        </div>

                        <button className="btn btn-primary" type="submit" >ADD OWNER</button>
                        |
                        <button className="btn btn-danger" type="submit">CANCEL</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default BusOwners;