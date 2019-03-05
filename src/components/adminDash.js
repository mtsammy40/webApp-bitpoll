import React from 'react';
import {Row, Container, Col, Card, CardBody, CardHeader, CardImg, CardTitle, CardText, Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge } from 'reactstrap';
import {
    BrowserRouter as Router,
    Link,
    Route // for later
  } from 'react-router-dom';
import Api from '../api/api';
import '../App.css';
import Dp from '../Images/man.svg';
import Load from '../Images/load.gif';
import {Pie} from 'react-chartjs-2';
import UpdateForm from './update';
import NewReg from './newReg';
import NewAdmin from './newAdmin';
import NewElection from './newElection';
import NewVoter from './newVoter';

export default class IDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Me: {},
            Institutions:[],
            Admins: [],
            Elections: [],
            candidates: [],
            modal: false,
            UpdateProfileModal: false,
            UpdateProfile: {}
        };
        this.profile = {};
        this.fetchAdmins = this.fetchAdmins.bind(this);
        this.fetchRegs = this.fetchRegs.bind(this);
        this.fetchVoters = this.fetchVoters.bind(this);
        this.fetchCountries = this.fetchCountries.bind(this);
        this.fetchInsts = this.fetchInsts.bind(this);
        this.fetchElecs = this.fetchElecs.bind(this);
        this.getCandidates = this.getCandidates.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleUpdateProfile = this.toggleUpdateProfile.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    toggleUpdateProfile(){
        this.setState(prevState => ({
            UpdateProfileModal: !prevState.UpdateProfileModal
          }));
      }
    fetchAdmins = ()=>{
        Api.get('org.bitpoll.net.Admin', { withCredentials: true}).then(res => {
        const Admins = res.data;
        this.setState({ Admins });
        console.log('Admins', this.state.Admins);
        let UpdateProfile = this.state.Admins[0];
        this.setState({ UpdateProfile });
        console.log('update profile ', this.profile);
    }).catch(error=> {
        console.log(error.response);
    });
    }
    fetchVoters = ()=>{
        Api.get('org.bitpoll.net.Voter', { withCredentials: true}).then(res => {
        const Voters = res.data;
        this.setState({ Voters });
        console.log('Voter', this.state.Voters);
    }).catch(error=> {
        console.log(error.response);
    });
    }
    fetchRegs(){
        Api.get('org.bitpoll.net.Regulator', { withCredentials: true}).then(res => {
            const Regs = res.data;
            this.setState({ Regs });
            console.log('Regs', this.state.Regs);
        }).catch(error=> {
            console.log(error.response);
        });
    }
    fetchElecs(){
        Api.get('org.bitpoll.net.Election', { withCredentials: true}).then(res => {
            const Elections = res.data;
            this.setState({ Elections });
            if(this.state.Elections.length !== 0){
                this.getCandidates();
            }
        }).catch(error=> {
            console.log(error.response);
        });
    }
    fetchCountries(){
        Api.get('https://restcountries.eu/rest/v2/all?fields=name',{withCredentials: true}).then(res => {
            var countries = res.data;
            console.log('countries', countries);
            this.setState({ countries });
        }).catch(e=>{
            console.log('e', e);     
        });
    }
    fetchInsts(){
        Api.get('org.bitpoll.net.Institution', { withCredentials: true}).then(res => {
            const Insts = res.data;
            this.setState({ Insts });
        }).catch(error=> {
            console.log(error.response);
        });
    }
    
    componentWillMount(){
        this.fetchAdmins();
        this.fetchVoters();
        this.fetchRegs();
        this.fetchElecs();
        this.fetchInsts();
        this.fetchCountries();
    }
    
    getCandidates(){
        let chartData = [];
        for(var j = 0; j<this.state.Elections.length; j++){
            var candidates; const labels=[]; const data=[]; const backgroundColors=[]; var f = 0;
            for(var i=0; i<this.state.Elections[j].candidates.length; i++){
                Api.get('org.bitpoll.net.Candidate#'+ this.state.Elections[0].candidates[i].split('#').pop(), {withCredentials: true})
                // eslint-disable-next-line no-loop-func
                .then((cand)=>{
                    candidates= cand.data;
                    labels.push(cand.data[f].name);
                    data.push(cand.data[f].count);//for chart
                    this.setState({ candidates });
                    var dynamicColors = "rgb(" +Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255)+ "," + Math.floor(Math.random() * 255) + ")";
                    backgroundColors.push(dynamicColors);
                    console.log('tumefika hapa', candidates);
                    f++;
                }).catch(e=>{
                    console.log('cand fetch error', e);
                });  
                
            }
            var Cdata ={
                "labels": labels,
                "datasets": [{
                    "label": this.state.Elections[j].motion,
                    "data" : data,
                    "backgroundColor": backgroundColors
                }]                
            };
            chartData.push(Cdata); 
            
        }
        
        /* var chartData = {
            "labels": labels,
            "datasets": [{
                "label": this.state.Elections[0].motion,
                "data" : data,
                "backgroundColor": backgroundColors
            }]                
        }; */
        var chartOptions = {
                "backgroundColor": "#ff4455" 
        }
        console.log('candidates.getcand', candidates);
        this.setState({ chartData, chartOptions });
        return this.state.candidates;
    }
    render(){
        
        let institList = this.state.Admins.map(Admin => <CardText key={Admin.Id}>{Admin.name}</CardText>)
        let myDetails = this.state.Admins;
        let countriesList = [];
        let Insts;
        let myAdmin = {'id': 'default'};
        if(!this.state.Admins){
            myAdmin={'id': 'default'};
        } else {
            myAdmin = this.state.Admins[0];
        }

        if(!this.state.Insts){
            Insts = ["none"];
        } else {
            Insts = this.state.Insts;
        }
        if(!this.state.countries){
            countriesList=["Kenya"];
          } else {
            countriesList = this.state.countries.map((c, i) => <option key={i}>{c.name}</option>);
          }
        let InfoCard;
        if(myDetails.length === 0){
             InfoCard = () => {
                return <tr><img src={Load} alt="loading..."></img></tr>
            }
        } else {
            InfoCard = (props) =>{
                const infotable =
                <div>
                    <Table>
                        <tbody>
                            <tr><td>name: </td><td> {myDetails[0].name}</td></tr>
                            <tr><td>ID: </td><td> {myDetails[0].id}</td></tr>
                            <tr><td>Nationality: </td><td> {myDetails[0].nationality}</td></tr>
                            <tr><td>Email: </td><td> {myDetails[0].email}</td></tr>
                            <tr><td>Gender: </td><td> {myDetails[0].gender}</td></tr>
                        </tbody>
                    </Table>
                    <a href={`${this.props.match.url}/UpdateProfile`} className="btn btn-success">Update</a>
                </div>
                return infotable;
            }
        }
        // Functional Components
        const VotersPage = (props)=>{
            if(!this.state.Voters){
                return <img src={Load} alt="loading..."></img>
            } else {

            
            var votersList = this.state.Voters.map(v => <tr><td>{v.name}</td><td>{v.gender}</td><td>{v.id}</td><td>{v.dob}</td></tr>)
            return <Container>
                        <Row>
                            <Col md={12}>
                                <Card className="mt shadow">
                                <CardBody>
                                <CardTitle><h2>New Voter</h2></CardTitle>
                                <NewVoter></NewVoter>
                                </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Card className="shadow mt">
                                    <CardBody>
                                        <CardTitle>Voters</CardTitle>
                                        <Row>
                                            <Table>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Gender</th>
                                                    <th>Id</th>
                                                    <th>Date of Birth</th>
                                                </tr>
                                                <tbody>
                                                    {votersList}
                                                </tbody>
                                                <tr></tr>
                                            </Table>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                </Container>
            }
        }
        const GetData = (props)=>{
            if(!this.state.Voters || !this.state.Regs){
                return <img src={Load} alt="Loading..."></img>
            } else {
                switch(props.part){
                    case 'voter':
                        console.log('voterdash', this.state.Voters.length);
                        return this.state.Voters.length;
                    case 'election':
                        return this.state.Elections.length;
                    case 'admin':
                        return this.state.Admins.length;
                    case 'regulator':
                        return this.state.Regs.length;
                    default:
                        return 'loading...';
                }
            }
        }
        const MyAdmins= ()=>{
            if(!this.state.Admins){
                return <tr><td>Loading Admins...</td></tr>
            } else {
                var Adminslist = this.state.Admins.map(v =>       
                    <tr key={v.email}><td>{v.email}</td><td>{v.name}</td><td>{v.nationality}</td><td>{v.gender}</td><td><button className="btn btn-danger">Remove</button></td></tr>
                );
                return <Table>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>gender</th>
                    <th>Remove</th>
                    <tbody>{Adminslist}</tbody>
                    </Table>;
            }
        }
        const MyRegs= ()=>{
            if(!this.state.Regs){
                return <img src={Load} alt="Loading Regulators"></img>
            } else {
                var Regslist = this.state.Regs.map(R =>       
                    <tr key={R.id}><td>{R.id}</td><td>{R.name}</td><td>{R.email}</td><td>{R.address}</td><td><button className="btn btn-secondary">Edit</button></td><td><button className="btn btn-danger">Remove</button></td></tr>
                );
                return <Table>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Remove</th>
                    <tbody>{Regslist}</tbody>
                    </Table>;
            }
        }
        const Upform = () =>{
            if(!this.state.Admins[0]){
                return <img src={Load} alt="loading..." width={400} height={400}></img>
            } else {
                return <UpdateForm profile={this.state.Admins[0]}></UpdateForm>
            }
        }
        const ActiveElections = () => {
            if(this.state.chartData){
                console.log('chartData', this.state.chartData);
                const AE = this.state.chartData.map((c, i) => <Container className="shadow mt" key={i}>
                <h2>{c.datasets[0].label}</h2>
                <Row>
                    <Col md={8}>
                        <Pie data={c} options={this.state.chartOptions}></Pie> 
                    </Col>
                    <Col md={4}>
                        <Table>
                            <tr><td>Motion: </td><td>{c.datasets[0].label}</td></tr>
                            <tr><td>Candidates: </td><td>{c.labels.map((l, i) => <tr key={i}><td>{l}</td></tr>)}</td></tr>
                            <tr><td>Total Votes: </td><td>{c.datasets[0].data.reduce((a, b)=>a + b, 0)}</td></tr>
                        </Table>
                    </Col>
                </Row> 
            </Container>);
            return AE;   
            } else {
            return <p>No active elections to show</p>  
            }
        }
        const ViewCandidates = () =>{
            let candidates = this.state.candidates.map(e=><Card className="shadow mt">
                <CardImg></CardImg>
                <CardHeader>{e.name}</CardHeader>
                <CardBody>
                    <h3>Votes Gained: <Badge color="primary">{e.count}</Badge></h3>
                </CardBody>
            </Card>)
            return <div>
            <button className="btn btn-secondary" onClick={this.toggle}>View Candidates</button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Results for: {this.state.Elections[0].motion}</ModalHeader>
            <ModalBody>
                {candidates}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        }
        const MyElections = ()=>{
            if(!this.state.Elections){
                return <tr><td>No elections created</td></tr>
            } else {
                var electionslist = this.state.Elections.map(e =>       
                    <tr key={e.electionId}><td>{e.electionId}</td><td>{e.motion}</td><td>{e.start}</td><td>{e.end}</td><td><ViewCandidates></ViewCandidates></td></tr>
                );
                return <Table>
                    <th>Id</th>
                    <th>Motion</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>View Details</th>
                    <tbody>{electionslist}</tbody>
                    </Table>;
            }
        }
        const MyAdminsChart = ()=>{
            if(!this.state.Admins){
                return <tr><td>Loading Voter's charts...</td></tr>
            } else {
                var male = this.state.Admins.filter(e=>{
                    return e.gender === "male";
                });
                console.log('male', male);
                console.log('elections', this.state.Elections)
                //Admins by gender
                var female = this.state.Admins.length - male.length;
                var data = [male.length, female];
                var labels = ["male", "female"];
                var chartData = {
                    "labels": labels,
                    "datasets": [{
                        "label": "Admins by Gender",
                        "data" : data,
                        "backgroundColor": ["#ff4455", "#33dd00"]
                    }]                
                };
                var chartOptions = {
                        "backgroundColor": "#ff4455" 
                }
               /*  const natcharts = () => {
                    var countries=[]; var data = []; var backgroundColors=[];
                    for(var i=0; i<this.state.Admins.length; i++){
                        if(!countries.includes(this.state.Admins[i].nationality)){
                            countries.push(this.state.Admins[i].nationality);
                        } 
                    }
                    for(var k = 0; k < countries.length; k++){
                        data[k]=0;
                        var dynamicColors = "rgb(" +Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255)+ "," + Math.floor(Math.random() * 255) + ")";
                        backgroundColors.push(dynamicColors);
                        for(var l = 0; l< this.state.Admins[l].nationality; l++){
                            if(this.state.Admins[k].nationality===countries[l]){
                                data[k]++;
                            }
                        }
                    }
                    console.log('hii data', data);
                    var chartData2 = {
                        "labels": countries,
                        "datasets": [{
                            "label": "Admins by Natioanlity",
                            "data" : data,
                            "backgroundColor": backgroundColors
                        }]                
                    };
                    return chartData2;

                } */
                //Admins by Nationality
                
                return <Row>
                    <Col md={9}>
                        <Pie data={chartData} options={chartOptions} redraw></Pie>
                    </Col>
                    </Row>
            }
        }
        const DashHome = ()=>{
            return  <Container>
            <Row className="d-flex flex-row">
                <Col md={3}>
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h4>Admins</h4>
                                <span>{this.state.Admins.length}</span>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h4>Elections</h4>
                                <span>{this.state.Elections.length}</span>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={3}>
                <Card className="shadow mt">
                    <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <span><h4>Voters</h4></span>
                                <span className="pull-right "><GetData part='voter'></GetData></span>
                            </CardTitle>
                            
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                <Card className="shadow mt">
                    <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <span><h4>Regulators</h4></span>
                                <span className="pull-right "><GetData part='regulator'></GetData></span>
                            </CardTitle>
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 9}} >
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h2>My Profile</h2>
                            </CardTitle>
                            <InfoCard></InfoCard>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 9}} >
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h2>Active elections</h2>
                            </CardTitle>
                            <ActiveElections></ActiveElections>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 9}} >
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h2>My Admins</h2>
                            </CardTitle>
                                <MyAdmins></MyAdmins>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 9}} >
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h2>My Regulators</h2>
                            </CardTitle>
                                <MyRegs></MyRegs>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 12}} >
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h2>My Elections</h2>
                            </CardTitle>
                                <MyElections></MyElections>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 12}} >
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h2>Admins By gender</h2>
                            </CardTitle>
                                <MyAdminsChart></MyAdminsChart>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        }

        return(
            <div className="wrapper">
                <div className="sidebar shadow-lg">
                    <div className="sideheader text-center">
                        <img src={Dp} alt="pic" height="150px" width="150px" />
                    </div>
                    <div className="sidelinks">
                        <a href={`${this.props.match.url}/`}>Home</a>
                        <a href={`${this.props.match.url}/Admins`}>Admins</a>
                        <a href={`${this.props.match.url}/Elections`}>Elections</a>
                        <a href={`${this.props.match.url}/Regulators`}>Regulators</a>
                        <a href={`${this.props.match.url}/Voters`}>Voters</a>
                    </div>
                </div>
                    <div className="content-wrapper">
                    <Route exact path={`${this.props.match.url}/`} component={DashHome}/>
                    <Route exact path={`${this.props.match.url}Regulators`} render={(props)=>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Card className="shadow mt">
                                    <CardBody>
                                        <CardTitle>
                                            <h2>My Regulators</h2>
                                        </CardTitle>
                                        <MyRegs></MyRegs>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Card className="shadow mt">
                                    <CardBody>
                                        <NewReg></NewReg>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>}/>
                    <Route path={`${this.props.match.url}/Admins`}render={
                        (props)=><Container><Row>
                        <Col md={{size: 12}} >
                            <Card className="shadow mt">
                                <CardImg></CardImg>
                                <CardBody>
                                    <CardTitle>
                                        <h2>Admins</h2>
                                    </CardTitle>
                                        <MyAdmins></MyAdmins>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={{size: 12}} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>Admins By gender</h2>
                                </CardTitle>
                                    <MyAdminsChart></MyAdminsChart>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{size: 12}} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                            <NewAdmin insts = {Insts}></NewAdmin>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                </Container>
                }/>
                    <Route path={`${this.props.match.url}/Elections`} render={
                        (props)=><Container {...props} elections={this.state.elections}>
                        <Row>
                    <Col md={{size: 12}} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>Elections</h2>
                                </CardTitle>
                                    <MyElections></MyElections>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{size: 12}} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>New Elections</h2>
                                </CardTitle>
                                    <NewElection admin={myAdmin}></NewElection>
                            </CardBody>
                        </Card>
                    </Col>
                </Row></Container>}/>
                <Route path={`${this.props.match.url}/UpdateProfile`} render={
                        (props)=>
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <Card className="mt shadow">
                                    <CardBody>
                                    <CardTitle><h2>Update Information</h2></CardTitle>
                                    <Upform {...props} profile={this.state.Admins[0]}></Upform>
                                    </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        }/>
                <Route path={`${this.props.match.url}/Voters`} render={
                        (props)=><VotersPage></VotersPage>
                        }/>
                </div>
            </div>
            
        );
    }
}