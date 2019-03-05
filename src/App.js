import React, { Component } from 'react';
import './App.css';
import Voter from './components/newAdmin';
import Feed from './components/feed';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/navbar';
import SignIn from './components/SignIn';
import ElectionCard from './components/election';
import Profile from './components/profile';
import Api from './api/api'
import newElection from './components/newElection';
import Dashboard from './components/dashboard';
import newAdmin from './components/newAdmin';
import ResultsBar from './components/charts/electionChart';
import Modaly from './components/modal';
import IDashboard from './components/adminDash';
import Header from './components/Jumbotron';
import RegDash from './components/regDash';
import DumbFeed from './components/dumbFeed';


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
        type: ""
      }
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
   componentDidMount(){
    Api.get('org.bitpoll.net.Admin', { withCredentials: true}).then(res =>{
      const Voter = res.data;
      this.setState({ Voter });
    }).catch(e=>{
      console.log('Appjs fetch voter error',e);
    });
    Api.get('org.bitpoll.net.Election', {withCredentials: true}).then(res=>{
      const election = res.data;
      this.setState({election});
    }).catch(error => { 
      console.log('App.js Fetch election error', error);
    });
   }
   handleLogin(type, identity){
    var profileData;
    this.setState({type: type});
    if(type==="voter"){
      profileData = this.state.Voter.find(v => v.email === identity);
      
    } else if (type==="institution"){
      profileData = this.state.Institution.find(i => i.email === identity);
    } 

    this.setState({profileData});
   }
  render() {
    console.log('mother state', this.state)
    return (
      <Router>
      <div>
        <Navigation></Navigation>
        <div>
          <Switch>
            <Route path="/SignUp" component={Voter} />
            <Route exact path="/" component={Header} />
            <Route exact path="/Feed" component={Feed} />
            <Route path="/DumbFeed/:id" render={(props)=><DumbFeed {...props} elections={this.state.elections}/> }/>
            <Route path="/SignIn" render={(props)=><SignIn {...props} handleLogin = {this.handleLogin} Voters={this.state.Voter} Institutions={this.state.Institutions} loginHandler={this.loginHandler} profile={this.state.profileData}/>}  />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/newAdmin" component={newAdmin} />
            <Route path="/chart" component={ResultsBar} />
            <Route path="/newElection" component={newElection} />
            <Route path="/modal/" component={Modaly} />
            <Route path="/IDashboard" render={(props)=><IDashboard {...props} profile={this.state.profile}/>} />
            <Route path="/RegulatorDashboard" render={(props)=><RegDash {...props} profile={this.state.profile}/>} />
            <Route path="/Profile" render={(props)=><Profile {...props} profile={this.state.profile} />} />
            <Route path="/vote/:id"  render={(props)=><ElectionCard {...props} elections={this.state.elections}/>} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;