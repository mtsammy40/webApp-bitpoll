import React from 'react';
import {Row, Container, Col, Card, CardBody, CardImg, CardTitle, CardText, Table} from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import Api from '../api/api';
import '../App.css';
import Dp from '../Images/man.svg';

export default class IDStats extends React.Component{
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
                    <Table responsive>
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
                                <Card className="shadow">
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
                                <Card className="shadow">
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
                            <Card className="shadow">
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
                                            <h2>My Voters</h2>
                                        </CardTitle>
                                        <CardText>
                                            <InfoCard></InfoCard>
                                        </CardText>
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