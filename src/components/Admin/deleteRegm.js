import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Card, CardBody } from "reactstrap";
import Api from '../../api/api';
import '../../App.css';

export default class DeleteRegM extends React.Component{
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
        Api.delete('org.bitpoll.net.Regulator/'+this.state.form.id, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
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
          <Form onSubmit={this.handleUpdate}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Name</Label>
                <Input type="text" name="name" id="fullnametb" value= {this.state.form.name} placeholder="Please enter full name" disabled />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" value= {this.state.form.email} disabled />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="id">Id</Label>
                <Input type="text" name="id" id="id" placeholder="id" disabled value= {this.state.form.id} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="countytb">Address</Label>
                <Input type="text" name="address" id="address" value= {this.state.form.address}  disabled/>
              </FormGroup>
            </Col>
          </Row>       
          <Input className="btn btn-danger" type="submit" value="Delete" className="btn btn-success col-md-3 offset-md-9" />
        </Form>
            
        );
    }
}
