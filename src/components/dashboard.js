import React from 'react';
import {Row, Container, Col, Card, CardBody, CardImg, CardTitle} from 'reactstrap';
import '../App.css';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div classname="wrapper">
                <div className="sidebar shadow-lg">
                    <div className="sideheader text-center">
                        <img alt="pic" height="150px" width="150px" />
                    </div>
                    <div className="sidelinks">
                        <a href="/new/">New</a>
                        <a href="/new/">Way</a>
                        <a href="/new/">Party</a>
                    </div>
                </div>
                <div className="content-wrapper">
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Card className="shadow">
                                    <CardImg></CardImg>
                                    <CardBody>
                                        <CardTitle><h2>Voters</h2></CardTitle>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="shadow">
                                    <CardImg></CardImg>
                                    <CardBody>
                                        <CardTitle><h2>Elections</h2></CardTitle>
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