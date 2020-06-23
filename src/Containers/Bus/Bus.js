import React, { Component } from 'react';
import BusList from './BusList/BusList';
import Aux from '../../Layout/Aux';
import { NavLink, Route, Switch } from 'react-router-dom';
import AddBuss from './AddBus/AddBuss';

class Bus extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <Aux>
                {/* <button className="btn btn-primary" onClick={()=>{this.props.history.push("/bus/addbus")}}>ADD NEW BUS</button> */}
                <Switch>
                    <Route path={this.props.match.url +"/addbus" }exact component={AddBuss} />
                    <Route path="" exact component={BusList} />
                </Switch>



            </Aux>
        );
    }
}

export default Bus;