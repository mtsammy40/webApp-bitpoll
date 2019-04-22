import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Card, CardBody } from "reactstrap";
import Api from '../../api/api';
import '../../App.css';

export default class DeleteElec extends React.Component{
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
        Api.delete('org.bitpoll.net.Election/'+this.state.form.electionId, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
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
            <Col md={12}>
              <FormGroup>
                <Label for="fullnametb">Motion</Label>
                <Input type="text" name="name" id="fullnametb" value= {this.state.form.motion} placeholder="Please enter full name" disabled />
              </FormGroup>
            </Col>
           
          </Row>
          <Row form>
          <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Start</Label>
                <Input type="date" name="date" id="emailtb" value= {this.state.form.start} disabled />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="id">End</Label>
                <Input type="text" name="end" id="id" placeholder="id" disabled value= {this.state.form.end}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="countytb">Id</Label>
                <Input type="text" name="id" id="id" value= {this.state.form.electionId}  disabled/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="countytb">Created by</Label>
                <Input type="text" name="admin" id="nationality" value= {this.state.form.admin}  disabled/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="id">Institution</Label>
                <Input type="text" name="county" id="id" placeholder="id" disabled value= {this.state.form.institution} />
              </FormGroup>
            </Col>
          </Row>       
          <Input  type="submit" value="Delete" className="btn btn-danger col-md-3 offset-md-9" />
        </Form>
            
        );
    }
}
