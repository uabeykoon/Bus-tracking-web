import React, { Component } from 'react';
import BusList from './BusList/BusList';
import { NavLink, Route, Switch } from 'react-router-dom';
import AddBuss from './AddBus/AddBuss';

class Bus extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                {/* <button className="btn btn-primary" onClick={()=>{this.props.history.push("/bus/addbus")}}>ADD NEW BUS</button> */}
                <Switch>
                    <Route path={this.props.match.url +"/addbus" }exact component={AddBuss} />
                    <Route path="" exact component={BusList} />
                </Switch>



            </div>
        );
    }
}

export default Bus;