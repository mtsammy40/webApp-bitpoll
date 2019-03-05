import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container, FormFeedback } from 'reactstrap';
import Api from '../api/api';
export default class NewInst extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(e){
    if(e.target.name=== "file"){
      this.setState({[e.target.name] : URL.createObjectURL(e.target.files[0])});
      console.log('files' + this.state.file);
    } else {
      this.setState({[e.target.name] : e.target.value});
    }
  }
  handleSubmit(e){
    e.preventDefault();
    delete this.state.countries;
    Api.post('org.bitpoll.net.Institution', this.state, { withCredentials: true}).then(res => {
        alert('successful');
    }).catch(error => {
        alert('Please recheck your data and retry');
        console.log(error.response);
    });
  }
  render() {
    return (
      <Container>
        <h2> New Institution</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Name</Label>
                <Input type="text" name="name" id="fullnametb" placeholder="Please enter full name" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb"> Id</Label>
                <Input type="text" name="id" id="emailtb" placeholder="parastatal Id" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormGroup>
                <Label for="emailtb">Email:</Label>
                <Input type="email" name="email" id="emailtb" placeholder="Official email" onChange={this.handleChange} />
              </FormGroup>              
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label for="emailtb">Address:</Label>
                <Input type="file" id="addresstb" placeholder="postal address" />
              </FormGroup>  
            </Col>
          </Row>
          <Input type="submit" value="Sign up" className="btn btn-success" />
        </Form>
      </Container>
    );
  }
}