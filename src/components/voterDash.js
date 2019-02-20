import React from 'react';
import {Row, Container, Col, Card, CardBody, CardImg, CardTitle, CardText, Table, Badge} from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import Api from '../api/api';
import '../App.css';
import Dp from '../Images/man.svg';
import {
    BrowserRouter as Router,
    Link,
    Route // for later
  } from 'react-router-dom';
import Feed from './feed';

export default class VoterDash extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Institutions:[],
            Voters: [],
            Elections: [] 
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
        }).catch(error=> {
            console.log(error.response);
        });
        Api.get('org.bitpoll.net.Election', { withCredentials: true}).then(res => {
            const Elections = res.data;
            this.setState({ Elections });
        }).catch(error=> {
            console.log(error.response);
        });
        console.log('Institutions', this.state.Institutions)
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
        const Home = () => {
            return <Container>
            <Row className="d-flex flex-row">
                <Col md={3}>
                    <Card className="shadow mt">
                        <CardImg></CardImg>
                        <CardBody>
                            <CardTitle>
                                <h4 className="justify-content-between">Elections  <Badge color="primary">{this.state.Elections.length}</Badge></h4>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={3}>
                <Card className="shadow mt">
                        <CardBody>
                            <CardTitle>
                                <h4>Institutions  <Badge color="danger" className="pull-right">{this.state.Institutions.length}</Badge></h4>
                            </CardTitle> 
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 12}} >
                    <Card className="shadow mt">
                    <Row>
                        <Col md={{size: 6}}>
                            <CardImg width="50%" src={Dp} ></CardImg>
                        </Col>
                        <Col md={{size: 6}}>
                            <CardBody>
                                <CardTitle>
                                    <h2>My Profile</h2>
                                </CardTitle>
                                <CardText>
                                    <InfoCard></InfoCard>
                                </CardText>
                            </CardBody>
                        </Col>
                    </Row>
                        
                        
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
                        <a href={`${this.props.match.url}/Home/`}>Home</a>
                        <a href={`${this.props.match.url}/Feed/`}>Feed</a>
                        <a href={`${this.props.match.url}/Activity/`}>Activity</a>
                    </div>
                </div>
                <div className="content-wrapper">
                    <Route path={`${this.props.match.url}/Home`} component={Home}/>
                    <Route path={`${this.props.match.url}/Feed`} component={Feed}/>
                </div>
            </div>
            
        );
    }
}