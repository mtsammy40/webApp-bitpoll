import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container, FormFeedback } from 'reactstrap';
import Api from '../../api/api';
export default class NewInst extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      validate: {}
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.validate= this.validate.bind(this);
  }
  validate(e) {
    console.log('stat')
    const { validate } = this.state;
    switch (e.target.name) {
      case 'phoneNo':
        const phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (phoneRex.test(e.target.value)) {
          validate.phone = 'has-success'
        } else {
          validate.phone = 'has-danger'
        }
        this.setState({ validate })
        break;
      case 'name':
        const nameRex = /^[a-z ,.'-]+$/i;
        if (nameRex.test(e.target.value)) {
          validate.name = 'has-success'
        } else {
          validate.name = 'has-danger'
        }
        this.setState({ validate });
        break;
      case 'id':
        const idRex = /^[0-9]{8,10}$/;
        if (idRex.test(e.target.value)) {
          validate.id = 'has-success'
        } else {
          validate.id = 'has-danger'
        }
        this.setState({ validate });
        break;
      case 'nationalId':
        const nidRex = /^[0-9]{8,10}$/;
        if (nidRex.test(e.target.value)) {
          validate.nid = 'has-success'
        } else {
          validate.nid = 'has-danger'
        }
        this.setState({ validate });
        break;
      case 'email':
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(e.target.value)) {
          validate.email = 'has-success'
        } else {
          validate.email = 'has-danger'
        }
        this.setState({ validate })
        break;
      default:
        break;
    }
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
    delete this.state.validate;
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
        <h2>New Institution</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Name</Label>
                <Input type="text" name="name" id="fullnametb" placeholder="Please enter full name" 
                onChange={this.handleChange} 
                valid={this.state.validate && this.state.validate.name === 'has-success'}
                 invalid={this.state.validate && this.state.validate.name === 'has-danger'}
                 required />
               <FormFeedback valid>
                 A wonderful name!
               </FormFeedback>
               <FormFeedback invalid>
                 Kindly recheck the name.
             </FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb"> Id</Label>
                <Input type="text" name="id" id="emailtb" placeholder="Institution Id" 
                onChange={this.handleChange} 
                valid={this.state.validate && this.state.validate.id === 'has-success'}
                 invalid={this.state.validate && this.state.validate.id === 'has-danger'}
                 required />
               <FormFeedback valid>
                 Valid Id, Thanks!
               </FormFeedback>
               <FormFeedback invalid>
                 Invalid Id. Please make sure it has 7 digits
             </FormFeedback>
              </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormGroup>
                <Label for="emailtb">Email:</Label>
                <Input type="email" name="email" id="emailtb" placeholder="Official email" 
                onChange={this.handleChange} 
                valid={this.state.validate && this.state.validate.email === 'has-success'}
                 invalid={this.state.validate && this.state.validate.email === 'has-danger'}
                 required />
               <FormFeedback valid>
                 A wonderful email!
               </FormFeedback>
               <FormFeedback invalid>
                 Check your email format. Example: someone@mail.com
             </FormFeedback>
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