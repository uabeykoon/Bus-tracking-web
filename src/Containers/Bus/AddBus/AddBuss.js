import React, { Component } from 'react';
import { withRouter } from 'react-router';

class AddBuss extends Component {

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div>
                <div className="container">
                    <form>
                        <legend>---Vehicle Details---</legend>
                        <div className="col-md-3 mb-3">
                            <label for="validationDefault01">Owner ID </label>
                            <select className="custom-select" id="validationDefault01" required>
                                <option selected disabled value="">Choose Owner ID</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label for="validationDefault02">Registration Number</label>
                                <input type="text" className="form-control" id="validationDefault02" value="" placeholder="Registration Number" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="validationDefault03">Scanned image of the registered vehicle permit </label>
                            <select className="custom-select" id="validationDefault03" required>
                                <option selected disabled value="">Choose...</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label for="validationDefault07">Route permit number</label>
                                <input type="text" className="form-control" id="validationDefault07" value="" placeholder="Route permit number" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="validationDefault04">Scanned image of the route permit </label>
                            <select className="custom-select" id="validationDefault04" required>
                                <option selected disabled value="">Choose...</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label for="validationDefault05">Route Number</label>
                                <input type="text" className="form-control" id="validationDefault05" value="" placeholder="Route Number" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label for="validationDefault06">Seating Capacity</label>
                                <input type="text" className="form-control" id="validationDefault06" value="" placeholder="Number of seats" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label for="validationDefault07">Start Station</label>
                                <input type="text" className="form-control" id="validationDefault07" value="" placeholder="Start" required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label for="validationDefault108">End Station</label>
                                <input type="text" className="form-control" id="validationDefault08" value="" placeholder="End" required />
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