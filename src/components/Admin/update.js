import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Card, CardBody } from "reactstrap";
import Api from '../../api/api';
import '../../App.css';

export default class UpdateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          form: this.props.profile,
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChange(e){
      let {form} = this.state;
      form = {...form, [e.target.name]: e.target.value};
      this.setState({ form });
      console.log('form', this.state.form)
    } 
    handleUpdate(e){
        e.preventDefault();
        const data = {
          county: this.state.form.county,
          dob: this.state.form.dob,
          email: this.state.form.email,
          gender: this.state.form.gender,
          nationality: this.state.form.nationality,
          phoneNo: this.state.form.phoneNo,
          institution: this.state.form.institution,
          name: this.state.form.name,
        };
        console.log('submit', data);
        Api.put('org.bitpoll.net.Admin/'+this.state.form.id, {
          "county": this.state.form.county,
          "dob": this.state.form.dob,
          "email": this.state.form.email,
          gender: this.state.form.gender,
          nationality: this.state.form.nationality,
          phoneNo: this.state.form.phoneNo,
          institution: this.state.form.institution,
          name: this.state.form.name,
        }, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
            this.setState({Me : res.data});
        }).catch(e => {
            console.log('error in update', e.responseText)
        });
    }

    render(){
      console.log('form 2',this.state.form);
        let countriesList = ["kenya"];
        if(!this.state.countries){
          countriesList = [<option>Kenya</option>];
        } else {
          countriesList = this.state.countries.map(e => <option key={e.name}>{e.name}</option>)
        }
        return(
          
            <Form onSubmit={this.handleUpdate}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" name="name" id="fullnametb" value= {this.props.profile.name} placeholder="Please enter full name" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" value= {this.props.profile.email} onChange={this.handleChange} />
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
                <Input type="select" name="gender" id="gendertb" value={this.props.profile.gender} onChange={this.handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="date" name="dob" id="bobtb" placeholder="Date of Birth" value= {this.props.profile.dob} onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="countytb">County</Label>
                <Input type="text" name="county" id="countytb" value= {this.props.profile.county} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID Number</Label>
                <Input type="text" name="id" id="idtb" value= {this.props.profile.id} onChange={this.handleChange} />
              </FormGroup>  
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <FormGroup>
                <Label for="dp">Dp</Label>
                <Input type="text" name="dp" value= {this.props.profile.dp} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label for="dp">Phone Number</Label>
                <Input type="text" name="phoneNo" value= {this.props.profile.phoneNo} onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>         
          <Input type="submit" value="Sign up" className="btn btn-success col-md-3 offset-md-9" />
        </Form>
          
            
        );
    }
}
