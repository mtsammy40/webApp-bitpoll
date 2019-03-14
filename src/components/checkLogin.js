import React from 'react';
import api from '../api/api';
import apis from '../api/apis';
import { Container, Card, CardBody, Row, Col, Label, Form, Input, FormGroup } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import '../App.css';
export default class CheckLogin extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            authorized: true
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        if(e.target.name === 'file'){
            this.setState({ [e.target.name]: e.target.files[0] });
        } else {
            this.setState({ [e.target.name]: e.target.value});
            console.log('name', this.state.name)
        }      
    }
    handleSubmit(e){
        e.preventDefault();
        const data = new FormData();
        data.append('card', this.state.file, this.state.name);
        data.append('name', this.state.name);
        apis.post('wallet/import', data, {withCredentials:true, headers: {
            'Content-Type': 'multipart/form-data'
          }}).then(res=>{
              if(res.status !== 401 && res.status !== 500 ){
                  alert('Successfully updated Identity');
              }
              var noCard = false;
            this.setState({noCard});
            apis.get('system/ping', {withCredentials: true}).then(res =>{
                console.log('starting verification');
                if(res.data.participant){
                    alert('Validity Verified');
                }
            }).catch(err=>{
                console.log('err with card', err.response);
                if(err.response.data.error.message.indexOf('Error trying to enroll user')!== -1){
                    alert('There is an error with your card! Are you sure it is valid?\n You can try redownloading it from the email');
                    apis.delete('wallet/'+this.state.file.name).then(res=>{
                        console.log('deleted bad card');
                    }).catch(e=>{
                        console.log('error deleting', e.response);
                    });
                }  
            });
        }).catch(err=>{
            console.log('err uploading card', err.response.data.error.message);
            if(err.response.data.error.message.indexOf('is this a zip file')!== -1){
                alert('There is an error with your card! It seems to be corrupt. Please try redownloading it');
            }  
        });
    }
    componentDidMount(){
        apis.get('system/ping', {withCredentials: true}).then(res=>{
           if(res.data.participant){
               var noCard = false;
               this.setState({ noCard });
           } else {
            var noCard = true;
            this.setState({ noCard });
           }
        }).catch(err=>{
            console.log('error pinging', err.response);
            if(err.response.status === 500){
                //message.indexOf('A business network card has not been specified')!== -1
                console.log('as expected');
                var noCard = true;
                this.setState({ noCard });
                alert('Please upload an identity!');
                console.log('as expected');
              } else if (err.response.status === 401){
                var authorized = false;
                this.setState({ authorized });
                alert('please Log in');
              }
        })
    }
    render(){
            if(this.props.profile){
                var authorized = true;
                this.setState({ authorized });
            }
            if(!this.state.authorized){
                return <Redirect to="/SignIn" />
            } 
            if(this.state.noCard){
                console.log('noCard', this.state.noCard)
            } else {
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
            }
        return(
            <Container>
                <Row>
                    <Col md={{size: 4, offset:4}}>
                        <Card className="shadow mt br-10">
                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label>Name: </Label>
                                        <Input type="text" name="name" onChange={this.handleChange} placeholder="Enter a name for the card" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="file" name="file" onChange={this.handleChange} required/>
                                    </FormGroup>
                                    <Input type="submit" className="btn btn-primary" value="Upload Identity"/>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        );
    }
} 