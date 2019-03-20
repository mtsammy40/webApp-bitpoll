    import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Card, CardBody, Container } from "reactstrap";
import Api from '../../api/api';
import '../../App.css';

export default class UpdateVoter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          form: props.profile,
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
          email: this.state.form.email,
          address: this.state.form.address,
          name: this.state.form.name,
        };
        console.log('submit', data);
        Api.put('org.bitpoll.net.Voter/'+this.state.form.id, data, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
            alert('Successful');
            this.props.onSuccess();
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
       <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" name="name" id="fullnametb" placeholder="Please enter full name" value = {this.state.form.name} onChange={this.handleChange} required/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" value = {this.state.form.email} onChange={this.handleChange} required/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="select" name="nationality" value={this.state.nationality} id="nationalitytb" placeholder="e.g Kenyan" value = {this.state.form.nationality} onChange={this.handleChange} required>
                  {countriesList}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="gendertb">Gender</Label>
                <Input type="select" name="gender" id="gendertb" value={this.state.gender} value = {this.state.form.gender} onChange={this.handleChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="date" name="dob" id="dobtb" placeholder="Date of Birth" value = {this.state.form.dob.split('T')[0]} onChange={this.handleChange} required/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="countytb">County</Label>
                <Input type="text" name="county" id="countytb" value = {this.state.form.county} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">ID Number</Label>
                <Input type="text" name="id" id="idtb" value = {this.state.form.id} onChange={this.handleChange} required />
              </FormGroup>  
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID Number</Label>
                <Input type="text" name="nationalId" id="idtb" value = {this.state.form.nationalId} onChange={this.handleChange} />
              </FormGroup>  
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
             <Label for="phoneNo">
              Upload Picture</Label>
            <Input type="file" name="dp" id="dp" value = {this.state.form.dp} onChange={this.handleChange} />
            </Col>
            <Col md={6}>
              <Label for="phoneNo">
              Telephone</Label>
              <Input type="text" name="phoneNo" value = {this.state.form.phoneNo} onChange={this.handleChange} />
            </Col>
          </Row>
          <Row>
            <Input type="submit" value="Sign up" className="btn btn-success" />
          </Row>
        </Form>
      </Container>);
    }
}

    
     