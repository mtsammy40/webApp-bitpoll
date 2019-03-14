import React from 'react';
import {FormGroup, Form, Label, Input, Button, Card, CardBody, Row, Col} from 'reactstrap';
import { Router, Redirect } from 'react-router-dom';
import '../App.css';
import Api from '../api/api';
import Apiraw from '../api/apiraw';
export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noCard: true
        };
        this.githubHandler = this.githubHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    githubHandler(e){
        Apiraw.post('auth/github', { withCredentials: true}).then(data => {
            alert('auth.login', data.data);
        }).catch(error => {
            alert(error.data);
        })
    }
    handleChange(e){
        if(e.target.name=== "type"){
            this.setState({[e.target.name]: e.target.value}); 
        } else {
            this.setState({identity: e.target.value});
        }
    }
    isLoggedIn(){
        if(this.props.profile){
            switch(this.props.profile.$class){
                case 'org.bitpoll.net.Admin':
                    return <Redirect to="/IDashboard" />;
                case 'org.bitpoll.net.Regulator':
                    return <Redirect to="/RegDashboard" />;
                case 'org.bitpoll.net.Voter':
                    return <Redirect to="/VoterProfile" />;
                case 'NetworkAdmin':
                    console.log('Shida ni??', this.props.profile)
                    return <Redirect to="/IDashboard" />;
                default:
                    return;
            }
        }
    }      
    render(){
        //Check if is logged in .

        //!!!REMOVE ! SIGN
        if(this.props.profile){
            switch(this.props.profile.$class){
                case 'org.bitpoll.net.Admin':
                    return <Redirect to="/IDashboard" />;
                case 'org.bitpoll.net.Regulator':
                    return <Redirect to="/RegDashboard" />;
                case 'org.bitpoll.net.Voter':
                    return <Redirect to="/VoterProfile" />;
                case 'NetworkAdmin':
                    console.log('Shida ni??', this.props.profile)
                    return <Redirect to="/IDashboard" />;
                default:
            }
        }
        return(
            <div className="">
            <Row className="">
                <Col md={{size:4, offset:4}} className="h-100">
                <Card className="shadow mt br-10 p-2">
                    <CardBody>
                    <Row>
                        <Col md={12} className="p-2">
                            <Button block href="http://35.202.24.146:3001/auth/github/">Log In with Github</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="text-center">
                            Bits and Bytes Co.
                        </div>
                        </Col>   
                    </Row>
                    </CardBody>
                </Card>                
                </Col>
            </Row>  
            </div>
        );
    }
}