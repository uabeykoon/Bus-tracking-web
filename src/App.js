import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from './Containers/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Bus from './Containers/Bus/Bus';
import DashBoard from './Containers/DashBoard/DashBoard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='container-fuid'>
          <div className="row">
            <div className="col-md-4">
              <Navbar />
            </div>
            <div className="col-md-8">
            <Switch>
              <Route path="/bus" component={Bus} />
              <Route path="/" component={DashBoard} />

            </Switch>
          </div>
          </div>
         
        </div>
      </div>

    
    </BrowserRouter >

  );
}

export default App;
