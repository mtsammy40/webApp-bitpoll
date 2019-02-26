import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from "react-strap";
import Api from '../api/api';

export default class UpdateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {};


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
    componentWillMount(){
        Api.get('https://restcountries.eu/rest/v2/all?fields=name',).then(res => {
      var countries = res.data;
      console.log('countries', countries);
      this.setState({ countries });
    }).catch(e=>{
      console.log('e', e.responseText);
    })
    }
    render(){
        let countriesList = this.state.countries.map()
        return(
            <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" name="name" id="fullnametb" value= {this.state.UpdateProfile.name} placeholder="Please enter full name" onChange={this.handleChange} />
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
                <Label for="occupationtb">Occupation</Label>
                <Input type="text" name="occupation" id="occupationtb" onChange={this.handleChange} />
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
            <Col md={4}>
              <FormGroup>
                <Label for="secret">Password</Label>
                <Input type="password" name="secret" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
            <FormGroup>
                <Label for="dp">Dp</Label>
                <Input type="text" name="dp" onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
            <FormGroup>
                <Label for="dp">Phone Number</Label>
                <Input type="text" name="phoneNo" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>         
          <Input type="submit" value="Sign up" className="btn btn-success" />
        </Form>
        );
    }
}
