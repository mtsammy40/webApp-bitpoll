import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container, FormFeedback } from 'reactstrap';
import Api from '../api/api';
export default class NewAdmin extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      "gender": "male" 
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  validate(e){
    switch(e.target.name){
      case "phoneNo":
        const reg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/; 
        if(!reg.test(e.target.value)){
          var invalid = [];
          invalid.push(e.target.name);
          this.setState({invalid});
        };
      break;
      case "phoneNo":
        const phreg = /^[0-9]+$/;
        if(!phreg.test(e.target.value)){
        const {invalid} = this.state;
        invalid.push(e.target.name);
        this.setState({invalid});
        };
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
    Api.post('org.bitpoll.net.Admin', this.state, { withCredentials: true}).then(res => {
        alert('successful');
    }).catch(error => {
        alert('Please recheck your data and retry');
        console.log(error.response);
    });
  }
  componentDidMount(){
    Api.get('https://restcountries.eu/rest/v2/all?fields=name',).then(res => {
      var countries = res.data;
      console.log('countries', countries);
      this.setState({ countries });
    }).catch(e=>{
      console.log('e', e.responseText);
    })
  }
  render() {
    let countriesList=[];
    if(!this.state.countries){
      countriesList=["Kenya"];
    } else {
      countriesList = this.state.countries.map((c, i) => <option key={i}>{c.name}</option>);
    }
    return (
      <Container>
        <h2> New Administrator</h2>
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
                <Input type="select" name="nationality" id="nationalitytb" placeholder="e.g Kenyan" onChange={this.handleChange}>
                  {countriesList}
                </Input>
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
                <Input type="date" name="dob" id="bobtb" placeholder="Date of Birth" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="countytb">County</Label>
                <Input type="text" name="county" id="countytb" onChange={this.handleChange} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID Number</Label>
                <Input type="text" name="id" id="idtb" onChange={this.handleChange} />
              </FormGroup>  
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <FormGroup>
                <Label for="dp">Dp</Label>
                <Input type="text" name="dp" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label for="dp">Phone Number</Label>
                <Input type="text" name="phoneNo" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>         
          <Input type="submit" value="Sign up" className="btn btn-success" />
        </Form>
      </Container>
    );
  }
}