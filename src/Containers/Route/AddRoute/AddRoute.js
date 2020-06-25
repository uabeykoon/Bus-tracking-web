import React, { Component } from 'react';

class AddRoute extends Component {


    state = {
        destination:[{id:1,name:"dikwella"},{id:2,name:"matara"}]
    }

    render() {
        return (
            <div>
                <form>
                    <legend>---ADD ROUTE---</legend>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Route Number</label>
                            <input type="text" className="form-control" placeholder="Route Number " required name="routeNumber" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Destination 1</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="destination1">
                                {this.state.destination.map((x)=>{
                                    return (<option value={x.id} key={x.id}>{x.name}</option>);
                                })}

                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Destination 2</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="destination2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
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
                            <input type="text" className="form-control" placeholder="Route Number " required name="estTimeHour" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Minutes</label>
                            <input type="text" className="form-control" placeholder="Route Number " required name="estTimeMinute" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <input type="submit" value="SUBMIT" className="btn btn-primary"/> | 
                            
                            <input type="reset" value="RESET" className="btn btn-danger"/>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

export default AddRoute;