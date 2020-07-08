import React, { Component } from 'react';
import BusList from './BusList/BusList';
import { Route, Switch } from 'react-router-dom';
import AddBuss from './AddBus/AddBuss';
import BusNav from './BusNav/BusNav';
import BusOwners from './BusOwners/BusOwners';

class Bus extends Component {

    componentDidMount() {
        //console.log(this.props);
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <BusNav />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Switch>
                                <Route path={this.props.match.url + "/addbus"} exact component={AddBuss} />
                                <Route path={this.props.match.url + "/busowners"} exact component={BusOwners} />
                                <Route path="" exact component={BusList} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bus;