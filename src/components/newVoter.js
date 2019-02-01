import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
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
    alert('Data has been submitted: Record of: ' + this.state.email)
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
                <Input type="text" name="fullname" id="fullnametb" placeholder="Please enter full name" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Password</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="text" name="nationality" id="nationalitytb" placeholder="e.g Kenyan" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="Date" name="dob" id="bobtb" placeholder="Apartment, studio, or floor" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleCity">County</Label>
                <Input type="text" name="county" id="countytb" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleState">Occupation</Label>
                <Input type="text" name="state" id="exampleState" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">PO Box</Label>
                <Input type="text" name="pobox" id="poboxtb" onChange={this.handleChange}/>
              </FormGroup>  
            </Col>
          </Row>
          <FormGroup>
          <Label for="filetb">File</Label>
          <Input type="file" name="file" id="filetb" onChange={this.handleChange} />
          <FormText color="muted">
            What image would you like for your profile?
          </FormText>
          <img src={this.state.file} alt="preview"/>
        </FormGroup>
          <Button>Sign in</Button>
        </Form>
      </Container>
    );
  }
}