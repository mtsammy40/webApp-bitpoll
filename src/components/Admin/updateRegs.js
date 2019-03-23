import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, FormFeedback} from "reactstrap";
import Api from '../../api/api';
import '../../App.css';

export default class UpdateFormReg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          form: props.profile,
          validate:{}
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.validate = this.validate.bind(this);
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
      this.validate(e);
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
        Api.put('org.bitpoll.net.Regulator/'+this.state.form.id, data, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
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
                <Input type="text" name="name" id="fullnametb" value= {this.state.form.name}
                 placeholder="Please enter full name" onChange={this.handleChange} 
                 valid={this.state.validate && this.state.validate.name === 'has-success'}
                  invalid={this.state.validate && this.state.validate.name === 'has-danger'}
                  required />
                <FormFeedback valid>
                  A wonderful name!
                  </FormFeedback>
                <FormFeedback invalid>
                  There seems to be a problem with your name format.
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email</Label>
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" 
                value= {this.state.form.email} onChange={this.handleChange} 
                valid={this.state.validate && this.state.validate.email === 'has-success'}
                  invalid={this.state.validate && this.state.validate.email === 'has-danger'}
                  required />
                <FormFeedback valid>
                  A wonderful email!
                  </FormFeedback>
                <FormFeedback invalid>
                  There seems to be a problem with your email format. Example: someone@mail.com
                </FormFeedback>
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
                <Input type="text" name="address" id="address" value= {this.state.form.address} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
          </Row>       
          <Input type="submit" value="Sign up" className="btn btn-success col-md-3 offset-md-9" />
        </Form>
            
        );
    }
}
