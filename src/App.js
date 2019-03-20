import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Feed from './components/Voter/feed';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/navbar';
import ElectionCard from './components/Voter/election';
import Profile from './components/profile';
import Api from './api/api';
import Apis from './api/apis';
import newElection from './components/Admin/newElection';
import Dashboard from './components/dashboard';
import newAdmin from './components/Admin/newAdmin';
import ResultsBar from './components/charts/electionChart';
import Modaly from './components/modal';
import IDashboard from './components/Admin/adminDash';
import Header from './components/Jumbotron';
import RegDash from './components/Regulator/regDash';
import DumbFeed from './components/dumbFeed';
import VoterProfile from './components/Voter/voterProfile';
import CheckLogin from './components/checkLogin';
import PdfView from './components/Admin/pdf';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      elections: [],
      comments:[
        {"id": "1", "comment": "This is a good election"}
      ],
      election: []
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.fetchVoters = this.fetchVoters.bind(this);
    this.fetchAdmins = this.fetchAdmins.bind(this);
    this.fetchElections = this.fetchElections.bind(this);
    this.ping = this.ping.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  fetchVoters(){
    Api.get('org.bitpoll.net.Voter', { withCredentials: true}).then(res =>{
      const Voters = res.data;
      this.setState({ Voters });
      console.log('Voters', this.state.Voters)
    }).catch(e=>{
      console.log('Voter fetch error',e);
    });
  }
  fetchAdmins(){
    Api.get('org.bitpoll.net.Admin', { withCredentials: true}).then(res =>{
      const Admins = res.data;
      this.setState({ Admins });
    }).catch(e=>{
      console.log('Admin fetch error',e);
    });
  }
  fetchElections(){
    Api.get('org.bitpoll.net.Election', {withCredentials: true}).then(res=>{
      const Elections = res.data;
      this.setState({Elections});
    }).catch(error => { 
      console.log('App.js Fetch election error', error);
    });
  }
  getProfile(type, id){
    console.log('startGetprofile');
    Api.get('org.bitpoll.net.'+type+'/'+id, {withCredentials: true}).then(res=>{
      var PROF = res.data;
      this.setState({ PROF });
      console.log('PROF set', this.state.PROF);
    }).catch(e=>{
      console.log('getProfile err', e);
    });
  }
  handleLogin(){

  }
  ping(){
    Apis.get('system/ping', {withCredentials: true}).then(res=>{
      if(res.data.participant){
        var user = res.data.participant;
      this.setState({ user });
      console.log('user', this.state.user);
      var id = user.split('#').pop();
      var types = user.split('.');
      var type = types.splice(-1, 1);
      var rtype = type[0].split('#');
      console.log('type', rtype[0]);
      var typist = rtype[0];
      this.setState({typist});
      if(rtype[0] === "NetworkAdmin"){
        var profile = {
          $class : rtype[0],
          name: 'sam',
          email: 'mtsammy40@gmail.com',
          nationality: 'Kenyan'
        }
        console.log('setting profile');
        this.setState({ profile });
      } else {
        Api.get('org.bitpoll.net.'+rtype[0]+'/'+id, {withCredentials: true}).then(res=>{
          this.setState({ profile : res.data });
        }).catch(err=>{
          console.log('getting profile err', err);
        });
      }
     console.log('state profile = ', this.state.profile);
      } else {
        console.log('no participant');
      }
    }).catch(err=>{
      console.log('error pinging');
      if(err.response && err.response.status === 500 && err.response.data.error.message.indexOf('A business network card has not been specified')!== -1){
        console.log('res 500', err.response.status);
        var noCard = false;
        this.setState({ noCard });
        this.setState({ authorized: true});
      } else if(err.response && err.response.status === 401){
        console.log('Not logged in', err.response.status);
        this.setState({ authorized: false});
      }
    })
  }
   componentDidMount(){
    this.ping();
   }
  render() {
    console.log('mother state', this.state);
    if(this.state.authorized){
      console.log('auth?', this.state.authorized); 
    }
    return (
      <Router>
      <div>
        <Navigation profile={this.state.profile}></Navigation>
        <div>
          <Switch>
          <Route exact path="/pdf" component={PdfView} />
            <Route exact path="/" component={Header} />
            <Route exact path="/Feed" component={Feed} />
            <Route path="/DumbFeed/:id" render={(props)=><DumbFeed {...props} elections={this.state.elections}/> }/>
            <Route path="/SignIn" render={(props)=><SignIn {...props} handleLogin = {this.handleLogin} authorized={this.state.authorized} profile={this.state.profile}/>}  />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/newAdmin" component={newAdmin} />
            <Route path="/chart" component={ResultsBar} />
            <Route path="/newElection" component={newElection} />
            <Route path="/LoggingIn" render={(props)=><CheckLogin {...props} authorized={this.state.authorized} profile={this.state.profile}/>} />
            <Route path="/modal/" component={Modaly} />
            <Route path="/IDashboard" render={(props)=><IDashboard {...props} profile={this.state.profile}/>} />
            <Route path="/RegulatorDashboard" render={(props)=><RegDash {...props} type={this.state.typist} profile={this.state.profile}/>} />
            <Route path="/Profile" render={(props)=><Profile {...props} profile={this.state.profile} />} />
            <Route path="/VoterProfile" render={(props)=><VoterProfile {...props} profile={this.state.profile} />} />
            <Route path="/vote/:id"  render={(props)=><ElectionCard {...props} profile={this.state.profile} elections={this.state.elections}/>} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;