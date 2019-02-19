import React from 'react';
import {Row, Container, Col, Card, CardBody, CardImg, CardTitle, CardText, Table} from 'reactstrap';
import Api from '../api/api';
import '../App.css';
import Dp from '../Images/man.svg';
import {Pie} from 'react-chartjs-2';

export default class IDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Institutions:[],
            Voters: [],
            Elections: [],
            MyElectionsChartData:{
            }
        };
    }

 
    componentWillMount(){
        Api.get('org.bitpoll.net.Institution', { withCredentials: true}).then(res => {
            const Institutions = res.data;
            this.setState({ Institutions });
            console.log('institutions', this.state.Institutions)
        }).catch(error => {
            console.log('error' + error.response);
        });
        Api.get('org.bitpoll.net.Voter', { withCredentials: true}).then(res => {
            const Voters = res.data;
            this.setState({ Voters });
            console.log('Voters', this.state.voters);
        }).catch(error=> {
            console.log(error.response);
        });
        Api.get('org.bitpoll.net.Election', { withCredentials: true}).then(res => {
            const Elections = res.data;
            this.setState({ Elections });
        }).catch(error=> {
            console.log(error.response);
        });
        console.log('Institutions', this.state.Institutions);

    }
    render(){
        let institList = this.state.Institutions.map(institute => <CardText key={institute.institutionId}>{institute.name}</CardText>)
        let myDetails = this.state.Institutions;
        let InfoCard;
        if(myDetails.length === 0){
             InfoCard = () => {
                return <tr>Loading...</tr>
            }
        } else {
            InfoCard = () =>{
                const infotable =
                <div>
                    <Table>
                        <tbody>
                            <tr><td>name: </td><td> {myDetails[0].name}</td></tr>
                            <tr><td>Description: </td><td> {myDetails[0].description}</td></tr>
                            <tr><td>Domain: </td><td> {myDetails[0].netdomain}</td></tr>
                            <tr><td>Email: </td><td> {myDetails[0].email}</td></tr>
                        </tbody>
                    </Table>
                    <button className="btn btn-primary pull-right">Edit Profile</button>
                </div>
                return infotable;
            }
        }
        const MyVoters = ()=>{
            if(!this.state.Voters){
                return <tr><td>Loading voters...</td></tr>
            } else {
                var voterslist = this.state.Voters.map(v =>       
                    <tr key={v.email}><td>{v.email}</td><td>{v.name}</td><td>{v.nationality}</td><td>{v.gender}</td><td><button className="btn btn-danger">Remove</button></td></tr>
                );
                return <Table>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>gender</th>
                    <th>Remove</th>
                    <tbody>{voterslist}</tbody>
                    </Table>;
            }
        }
        const MyElections = ()=>{
            if(!this.state.Elections){
                return <tr><td>Loading Elections...</td></tr>
            } else {
                var electionslist = this.state.Elections.map(e =>       
                    <tr key={e.electionId}><td>{e.motion}</td><td>{e.start}</td><td>{e.end}</td><td><button className="btn btn-secondary">View Candidates</button></td><td><button className="btn btn-danger">Remove</button></td></tr>
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
        const MyVotersChart = ()=>{
            if(!this.state.Voters){
                return <tr><td>Loading Voter's charts...</td></tr>
            } else {
                var male = this.state.Voters.filter(e=>{
                    return e.gender === "male";
                });
                console.log('male', male);
                console.log('elections', this.state.Elections)
                //Voters by gender
                var female = this.state.Voters.length - male.length;
                var data = [male.length, female];
                var labels = ["male", "female"];
                var chartData = {
                    "labels": labels,
                    "datasets": [{
                        "label": "Voters by Gender",
                        "data" : data,
                        "backgroundColor": ["#ff4455", "#33dd00"]
                    }]                
                };
                var chartOptions = {
                        "backgroundColor": "#ff4455" 
                }
               /*  const natcharts = () => {
                    var countries=[]; var data = []; var backgroundColors=[];
                    for(var i=0; i<this.state.Voters.length; i++){
                        if(!countries.includes(this.state.Voters[i].nationality)){
                            countries.push(this.state.Voters[i].nationality);
                        } 
                    }
                    for(var k = 0; k < countries.length; k++){
                        data[k]=0;
                        var dynamicColors = "rgb(" +Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255)+ "," + Math.floor(Math.random() * 255) + ")";
                        backgroundColors.push(dynamicColors);
                        for(var l = 0; l< this.state.Voters[l].nationality; l++){
                            if(this.state.Voters[k].nationality===countries[l]){
                                data[k]++;
                            }
                        }
                    }
                    console.log('hii data', data);
                    var chartData2 = {
                        "labels": countries,
                        "datasets": [{
                            "label": "Voters by Natioanlity",
                            "data" : data,
                            "backgroundColor": backgroundColors
                        }]                
                    };
                    return chartData2;

                } */
                //voters by Nationality
                
                return <Row>
                    <Col md={9}>
                        <Pie data={chartData} options={chartOptions} redraw></Pie>
                    </Col>
                    </Row>
            }
        }

    

        return(
            <div className="wrapper">
                <div className="sidebar shadow-lg">
                    <div className="sideheader text-center">
                        <img src={Dp} alt="pic" height="150px" width="150px" />
                    </div>
                    <div className="sidelinks">
                        <a href={`${this.props.match.url}/home/`}>Home</a>
                        <a href={`${this.props.match.url}/Voters/`}>Statistics</a>
                        <a href={`${this.props.match.url}/Elections/`}>Party</a>
                    </div>
                </div>
                <div className="content-wrapper">
                    <Container>
                        <Row className="d-flex flex-row">
                            <Col md={3}>
                                <Card className="shadow mt">
                                    <CardImg></CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            <h4>Voters</h4>
                                            <span>{this.state.Voters.length}</span>
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
                                            <span><h4>Institutions</h4></span>
                                            <span className="pull-right ">{this.state.Institutions.length}</span>
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
                                            <h2>Institution Details</h2>
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
                                            <h2>My Voters</h2>
                                        </CardTitle>
                                            <MyVoters></MyVoters>
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
                                            <h2>Voters By gender</h2>
                                        </CardTitle>
                                            <MyVotersChart></MyVotersChart>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        
                    </Container>
                </div>
            </div>
            
        );
    }
}