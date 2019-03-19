import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Api from '../../api/api';

export default class NewVoter extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
        gender : "male",
        valid: true,
        nationality: 'Kenya',
//        institution: props.profile.institution
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
    Api.post('org.bitpoll.net.Voter', this.state, { withCredentials: true}).then(res => {
        alert('successful');
        this.props.onSuccess();
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
    if(this.props.profile){
      var institution = this.props.profile.institution;
      this.setState({ institution });
    }
  }
  render() {
    console.log('state das', this.state);
    let countriesList=[];
    if(!this.state.countries){
      countriesList=[<option>Kenya</option>];
    } else {
      countriesList = this.state.countries.map((c, i) => <option key={i}>{c.name}</option>);
    }
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" name="name" id="fullnametb" placeholder="Please enter full name" onChange={this.handleChange} required/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" onChange={this.handleChange} required/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="select" name="nationality" value={this.state.nationality} id="nationalitytb" placeholder="e.g Kenyan" onChange={this.handleChange} required>
                  {countriesList}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="gendertb">Gender</Label>
                <Input type="select" name="gender" id="gendertb" value={this.state.gender} onChange={this.handleChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="date" name="dob" id="bobtb" placeholder="Date of Birth" onChange={this.handleChange} required/>
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
                <Label for="poboxtb">ID Number</Label>
                <Input type="text" name="id" id="idtb" onChange={this.handleChange} required />
              </FormGroup>  
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID Number</Label>
                <Input type="text" name="nationalId" id="idtb" onChange={this.handleChange} />
              </FormGroup>  
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
             <Label for="phoneNo">
              Upload Picture</Label>
            <Input type="file" name="dp" id="dp" onChange={this.handleChange} />
            </Col>
            <Col md={6}>
              <Label for="phoneNo">
              Telephone</Label>
              <Input type="text" name="phoneNo" onChange={this.handleChange} />
            </Col>
          </Row>
          <Row>
            <Input type="submit" value="Sign up" className="btn btn-success" />
          </Row>
        </Form>
      </Container>
    );
  }
}