import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from "axios";
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount() {
    console.log("smurfapp now running");
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  addSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink exact to="/">Home</NavLink>
          <NavLink exact to="/smurf-form">Make Smurf</NavLink>
        </nav>
        <Route 
        exact
        path="/"
        render={props =>(
          <Smurfs 
          {...props}
          smurfs={this.state.smurfs} 
          />
        )}
        />
        <Route 
        exact
        path="/smurf-form"
        render={props =>(
          <SmurfForm 
          {...props}
          addSmurf={this.addSmurf}
          />
        )}
        />
       
       
      </div>
    );
  }
}

export default App;
