import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Card, CardBody } from "reactstrap";
import Api from '../api/api';
import '../App.css';

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
      let {form} = this.State;
      form = {...form, [e.target.name]: e.target.value};
      this.setState({ form });
    } 
    handleUpdate(e){
        e.preventDefault();
        const data = new FormData(e.target);
        Api.put('org.bitpoll.net.Admin/'+data.get('id'), {data}, {withCredentials: true}).then(res => {
            this.setState({Me : res.data});
        }).catch(e => {
            console.log('error in update', e.responseText)
        });
    }
    componentDidMount(){
      Api.get('https://restcountries.eu/rest/v2/all?fields=name', {withCredentials: true}).then(res => {
      let countries = res.data;
      console.log('countries', countries);
      this.setState({ countries });
    }).catch(e=>{
      console.log('e', e);
      let countries=["kenya"];
      this.setState({ countries });
    });
    }

    render(){
      console.log('form 2',this.state.form);
        let countriesList = ["kenya"];
        if(!this.state.countries){
          countriesList = ["kenya"];
        } else {
          countriesList = this.state.countries.map(e => <option key={e.name}>{e.name}</option>)
        }
        return(
          
            <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" name="name" id="fullnametb" value= {this.state.form.name} placeholder="Please enter full name" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" value= {this.state.form.email} onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="select" name="nationality" id="nationalitytb" placeholder="e.g Kenyan" value= {this.state.form.nationality} onChange={this.handleChange}>
                  {countriesList}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="gendertb">Gender</Label>
                <Input type="select" name="gender" id="gendertb" value={this.state.form.gender} onChange={this.handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="date" name="dob" id="bobtb" placeholder="Date of Birth" value= {this.state.form.dob} onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="countytb">County</Label>
                <Input type="text" name="county" id="countytb" value= {this.state.form.county} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID Number</Label>
                <Input type="text" name="id" id="idtb" value= {this.state.form.id} onChange={this.handleChange} />
              </FormGroup>  
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <FormGroup>
                <Label for="dp">Dp</Label>
                <Input type="text" name="dp" value= {this.state.form.dp} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label for="dp">Phone Number</Label>
                <Input type="text" name="phoneNo" value= {this.state.form.phoneNo} onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>         
          <Input type="submit" value="Sign up" className="btn btn-success col-md-3 offset-md-9" />
        </Form>
          
            
        );
    }
}
