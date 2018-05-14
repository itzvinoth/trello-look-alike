import React, { Component } from 'react';
import LayoutPage from "./LayoutPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      
        <Router>
        	<div className="App">
        		<Route exact path="/" component={LayoutPage}/>
        	</div>
        </Router>
    );
  }
}

export default App;
