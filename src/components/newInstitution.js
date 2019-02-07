import React from 'react';
import {Container, Input, Label, FormGroup, Row, Col, FormText} from 'reactstrap';
import api from '../api/api';

export default class newInstitution extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        if(e.target.name=== "img"){
            this.setState({[e.target.name] : URL.createObjectURL(e.target.files[0])});
            console.log('img' + this.state.img);
          } else {
            this.setState({[e.target.name] : e.target.value});
          }
    }
    handleSubmit(e){
        e.preventDefault();
        api.post('org.bitpoll.net.Institution', this.state).then(res => {
            alert('successful');
        }).catch(error=> {
            alert('Please recheck your data and retry');
        });
    }
    render(){
        return(
            <Container>
                <form onSubmit={this.handleSubmit} >
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nametb">Name of Institution</Label>
                                <Input type="text" placeholder="e.g Kenyatta University" name="name" id="nametb" onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="domaintb">Institution Domain</Label>
                                <Input type="text" name="netdomain" id="domaintb" placeholder="e.g. ku.ac.ke" onChange={this.handleChange} />  
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="desctb">Description</Label>
                        <textarea name="description" className="form-control" placeholder="What does your institution do?" onChange={this.handleChange}></textarea>
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="emailtb">Institution email</Label>
                                <Input type="email" placeholder="Institution Email" name="email" id="emailtb" onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="pemailtb">Institution Personnel Email</Label>
                                <Input type="email" placeholder="email of employee" name="personnelEmail" id="pemailtb" onChange={this.handleChange} />
                                <FormText color="muted">
                                    email of the individual registering this institution
                                </FormText>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Input type="submit" value="Register Institution" className="btn btn-success" />
                </form>
            </Container>
        );
    }
}  