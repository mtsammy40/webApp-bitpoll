import React, { Component } from 'react';
import './App.css';
import Voter from './components/newVoter';
import Feed from './components/feed';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/navbar';
import Home from './components/home';
import SignIn from './components/SignIn';
import ElectionCard from './components/election';
import Profile from './components/profile';
import Api from './api/api'
import newElection from './components/newElection';
import Dashboard from './components/dashboard';
import newInstitution from './components/newInstitution';
import ResultsBar from './components/charts/electionChart';
import Modaly from './components/modal';
import IDashboard from './components/InstitutionDashboard';
import IDStats from './components/IDStats';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      elections: [],
      comments:[
        {"id": "1", "comment": "This is a good election"}
      ],
      election: [],
      profile: {
        isLoggedIn: false,
        details:[],
        type: []
      }
    }
  }
   componentDidMount(){
    Api.get('org.bitpoll.net.Voter', { withCredentials: true}).then(res =>{
      const Voter = res.data;
      this.setState({ Voter });
    });
    Api.get('org.bitpoll.net.Election', {withCredentials: true}).then(res=>{
      const elections = res.data;
      this.setState({elections});
    }).catch(error => { 
      console.log('App.js Fetch election error', error);
    });
    Api.get('org.bitpoll.net.Institution', {withCredentials: true}).then(res=>{
      this.setState({Institutions : res.data});
    });
   }

  render() {
    return (
      <Router>
      <div>
        <Navigation></Navigation>
        <div>
          <Switch>
            <Route path="/SignUp" component={Voter} />
            <Route exact path="/Feed" component={Feed} />
            <Route exact path="/" component={Home} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/newInstitution" component={newInstitution} />
            <Route path="/chart" component={ResultsBar} />
            <Route path="/newElection" component={newElection} />
            <Route path="/modal/" component={Modaly} />
            <Route path="/IDashboard/" render={(props)=><IDashboard {...props} profile={this.state.profile}/>} />
            <Route path="/IDashboard/Statistics" render={(props)=><IDStats {...props} profile={this.state.profile}/>} />
            <Route path="/Profile/" render={(props)=><Profile {...props} profile={this.state.profile} />} />
            <Route path="/vote/:id"  render={(props)=><ElectionCard {...props} elections={this.state.elections}/>} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;