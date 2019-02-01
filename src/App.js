import React, { Component } from 'react';
import './App.css';
import Voter from './components/newVoter';
import Header from './components/Jumbotron';
import Feed from './components/feed';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from './components/navbar';
import Home from './components/home';
import SignIn from './components/SignIn';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navigation></Navigation>
        <div>
        <Route path="/SignUp" component={Voter} />
        <Route path="/Feed" component={Feed} />
        <Route exact path="/" component={Home} />
        <Route path="/SignIn" component={SignIn} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;