import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import RouteList from './RouteList/RouteList';
import TimeTable from './TimeTable/TimeTable';
import RouteNav from './RoutNav/RouteNav';
import AddRoute from './AddRoute/AddRoute';

class RouteM extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <RouteNav />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Switch>
                            <Route path="/route/timetable" component={TimeTable} />
                            <Route path="/route/addroute" component={AddRoute} />
                            <Route path="/route" component={RouteList} />
                        </Switch>


                    </div>
                </div>


            </div>
        );
    }
}

export default RouteM;