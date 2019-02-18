import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Api from '../api/api';
export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      "gender": "male" 
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
    Api.post('org.bitpoll.net.Voter', this.state, { withCredentials: true}).then(res => {
        alert('successful');
    }).catch(error => {
        alert('Please recheck your data and retry');
        console.log(error.response);
    });
  }
  render() {
    return (
      <Container>
        <h2>Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" name="name" id="fullnametb" placeholder="Please enter full name" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="text" name="nationality" id="nationalitytb" placeholder="e.g Kenyan" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="gendertb">Gender</Label>
                <Input type="select" name="gender" id="gendertb" value={this.state.gender} onChange={this.handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="text" name="dob" id="bobtb" placeholder="Date of Birth" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleCity">County</Label>
                <Input type="text" name="county" id="countytb" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="occupationtb">Occupation</Label>
                <Input type="text" name="occupation" id="occupationtb" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">dp</Label>
                <Input type="text" name="dp" id="dptb" onChange={this.handleChange} />
              </FormGroup>  
            </Col>
          </Row>
          <FormGroup>
            <Label for="secret">Secret</Label>
            <Input type="text" name="secret" onChange={this.handleChange} />
          </FormGroup>
          <Input type="submit" value="Sign up" className="btn btn-success" />
        </Form>
      </Container>
    );
  }
}