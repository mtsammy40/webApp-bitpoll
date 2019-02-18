import React from 'react';
import {Row, Container, Col, Card, CardBody, CardImg, CardTitle, CardText} from 'reactstrap';
import Api from '../api/api';
import '../App.css';
import Dp from '../Images/man.svg';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Institutions:[],
            Voters: [],
            Elections: [] 
        };
    }
    componentDidMount(){
        Api.get('org.bitpoll.net.Institution', { withCredentials: true}).then(res => {
            const Institutions = res.data;
            this.setState({ Institutions });
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
        return(
            <div className="wrapper">
                <div className="sidebar shadow-lg">
                    <div className="sideheader text-center">
                        <img src={Dp} alt="pic" height="150px" width="150px" />
                    </div>
                    <div className="sidelinks">
                        <a href="/new/">New</a>
                        <a href="/new/">Way</a>
                        <a href="/new/">Party</a>
                    </div>
                </div>
                <div className="content-wrapper">
                    <Container>
                        <Row className="justify-center">
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
                        
                        
                    </Container>
                </div>
            </div>
            
        );
    }
}