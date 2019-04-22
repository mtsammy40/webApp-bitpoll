import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container, FormFeedback } from 'reactstrap';
import Api from '../../api/api';
import angel from '../../api/angel';
export default class NewReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validate: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleChange(e) {
    this.validate(e);
    if (e.target.name === "file") {
      this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
      console.log('files' + this.state.file);
    } else {
      let { form } = this.state;
      form = {...form, [e.target.name]: e.target.value}
      this.setState({ form });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    Api.post('org.bitpoll.net.Regulator', this.state.form, { withCredentials: true }).then(res => {
      var issuee = {
        participant: 'resource:org.bitpoll.net.Regulator#' + this.state.form.id,
        userID: this.state.form.name,
        options: {}
      };
      Api.post('system/identities/issue', issuee, { withCredentials: true, responseType: 'blob' }).then((res) => {
        console.log('my file', res);
        var data = new FormData();
        data.append('id', this.state.form.id);
        data.append('email', this.state.form.email);
        data.append('data', res.data);
        angel.post('sendRegEmail/', data)
          .then(res => {
            console.log('Reg id sent ', this.state.form.id)
          }).catch(e => {
            console.log('email failed', e);
          });
        alert('successful');
        this.props.onSuccess();
      }).catch(error => {
        if(error.response && error.response.error.message.indexOf('already exists') > -1){
          alert('Id '+ this.state.form.id+' already exists as a Regulator!');
        }
        alert('Please recheck your data and retry');
        console.log(error.response);
      });
    })
  }
  render() {
    return (
      <Container>
        <h2> New Regulator</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Name of Regulator</Label>
                <Input type="text" className="capitalize" name="name" id="fullnametb" placeholder="Please enter full name"
                  onChange={this.handleChange}
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
                <Label for="emailtb">Id:</Label>
                <Input type="text" name="id" id="emailtb" placeholder="parastatal Id" onChange={this.handleChange}
                valid={this.state.validate && this.state.validate.id === 'has-success'}
                invalid={this.state.validate && this.state.validate.id === 'has-danger'}
                required />
                 <FormFeedback valid>
                  A valid Id, thanks!
                </FormFeedback>
                <FormFeedback invalid>
                  Uh oh, format is incorrect. Is your Id 8-10 digits?
              </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="emailtb">Email:</Label>
                <Input type="email" name="email" id="emailtb" placeholder="Official email" onChange={this.handleChange}
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
                <Input type="text" name="address" id="addresstb" placeholder="postal address" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Input type="submit" value="Register Regulator" className="btn btn-success" />
        </Form>
      </Container>
    );
  }
}