import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, FormText, FormFeedback } from "reactstrap";
import Api from '../../api/api';
import '../../App.css';
import moment from 'moment';

export default class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.profile,
      validate: {}
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
  handleChange(e) {
    this.validate(e);
    let { form } = this.state;
    form = { ...form, [e.target.name]: e.target.value };
    this.setState({ form });
    console.log('form', this.state.form)
  }
  handleUpdate(e) {
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
    Api.put('org.bitpoll.net.Admin/' + this.state.form.id, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }).then(res => {
      this.setState({ Me: res.data });
      alert('Successful');
      this.props.onSuccess();
    }).catch(e => {
      console.log('error in update', e.responseText)
    });
  }

  render() {
    console.log('form 2', this.state.form);
    let countriesList = ["kenya"];
    if (!this.state.countries) {
      countriesList = [<option>Kenya</option>];
    } else {
      countriesList = this.state.countries.map(e => <option key={e.name}>{e.name}</option>)
    }
    var countiesList;
    if (this.props.counties) {
      countiesList = this.props.counties.features.map((c, i) => {
        return <option key={i}>{c.attributes.SNO}</option>
      });
    } else {
      countiesList = [<option>Nairobi</option>];
    }
    return (
      <Form onSubmit={this.handleUpdate}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="fullnametb">Full Name</Label>
              <Input type="text" name="name" id="fullnametb" value={this.state.form.name}
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
              <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" value={this.state.form.email} 
              onChange={this.handleChange} 
              valid={this.state.validate && this.state.validate.email === 'has-success'}
                  invalid={this.state.validate && this.state.validate.email === 'has-danger'}
                  required />
                <FormFeedback valid>
                  A wonderful email!
                  </FormFeedback>
                <FormFeedback invalid>
                  There seems to be a problem with your email format.
                </FormFeedback>
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
              <Input type="select" name="gender" id="gendertb" value={this.state.form.gender} onChange={this.handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="Date of Birth">Date Of Birth</Label>
              <Input type="date" name="dob" id="bobtb" placeholder="Date of Birth" value={this.state.form.dob} max={moment().subtract(18, "years").format('YYYY-MM-DD')} onChange={this.handleChange} />
              <FormText>Must be 18 years or older</FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="countytb">County</Label>
              <Input type="select" name="county" id="countytb" value={this.state.form.county} onChange={this.handleChange} required >
                {countiesList}
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="poboxtb">National ID Number</Label>
              <Input type="text" name="id" id="idtb" value={this.state.form.id} onChange={this.handleChange} 
              valid={this.state.validate && this.state.validate.id === 'has-success'}
              invalid={this.state.validate && this.state.validate.id === 'has-danger'}
              required />
            <FormFeedback valid>
              A wonderful id!
              </FormFeedback>
            <FormFeedback invalid>
              There seems to be a problem with your id format. Is it 8-10 digits?
            </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Input type="text" name="dp" value={this.state.form.dp} onChange={this.handleChange} hidden />
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="dp">Phone Number</Label>
              <Input type="text" name="phoneNo" value={this.state.form.phoneNo} onChange={this.handleChange} 
              valid={this.state.validate && this.state.validate.phone === 'has-success'}
              invalid={this.state.validate && this.state.validate.phone === 'has-danger'}
              required />
            <FormFeedback valid>
              A wonderful phone!
              </FormFeedback>
            <FormFeedback invalid>
              There seems to be a problem with your phone format.
            </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Input type="submit" value="Update" className="btn btn-success col-md-3 offset-md-9" />
      </Form>

    );
  }
}
