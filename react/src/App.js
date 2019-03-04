import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Leafmap from './map'

class App extends Component {
	state = {
		commaData: []
	}
  componentDidMount () {
  	axios.get('http://localhost:8080/api/comma-data')
      .then( (res) => {
      	this.setState( {
      		commaData: res.data
      	})
      })
  }
  render() {
    return (
      <div className="App">
        <Leafmap data={this.state.commaData}/>
      </div>
    );
  }
}

export default App;
