import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, FormFeedback, Container } from "reactstrap";
import Api from '../../api/api';
import '../../App.css';

export default class UpdateVoter extends React.Component {
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
    var form = this.state.form;
    const data = {
      email: form.email,
      phoneNo: form.phoneNo,
      name: form.name,
      nationality: form.nationality,
      nationalId: form.nationalId,
      county: form.county,
      valid: form.valid,
      dp: form.dp,
      dob: form.dob,
      gender: form.gender,
      institution: form.institution
    };

    Api.put('org.bitpoll.net.Voter/' + form.id, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }).then(res => {
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
      <Container>
        <Form onSubmit={this.handleUpdate}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" name="name" id="fullnametb" placeholder="Please enter full name"
                  value={this.state.form.name} onChange={this.handleChange}
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
                  value={this.state.form.email} onChange={this.handleChange}
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
            <Col md={3}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="select" name="nationality" value={this.state.nationality} id="nationalitytb" placeholder="e.g Kenyan" value={this.state.form.nationality} onChange={this.handleChange} required>
                  {countriesList}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="gendertb">Gender</Label>
                <Input type="select" name="gender" id="gendertb" value={this.state.gender} value={this.state.form.gender} onChange={this.handleChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="date" name="dob" id="dobtb" placeholder="Date of Birth" value={this.state.form.dob.split('T')[0]} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="countytb">County</Label>
                <Input type="text" name="county" id="countytb" value={this.state.form.county} onChange={this.handleChange} required >
                {countiesList}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">ID Number</Label>
                <Input type="text" name="id" id="idtb" value={this.state.form.id} disabled />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID Number</Label>
                <Input type="text" name="nationalId" id="idtb" value={this.state.form.nationalId}
                  onChange={this.handleChange}
                  valid={this.state.validate && this.state.validate.nid === 'has-success'}
                  invalid={this.state.validate && this.state.validate.nid === 'has-danger'}
                  required />
                <FormFeedback valid>
                  A wonderful Id!
                </FormFeedback>
                <FormFeedback invalid>
                  There seems to be a problem with your Id format. Is it 8-10 digits?
              </FormFeedback>              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <Label for="phoneNo">
                Telephone</Label>
              <Input type="text" name="phoneNo" value={this.state.form.phoneNo} onChange={this.handleChange}
                valid={this.state.validate && this.state.validate.name === 'has-success'}
                invalid={this.state.validate && this.state.validate.name === 'has-danger'}
                required />
              <FormFeedback valid>
                A wonderful phone number!
               </FormFeedback>
              <FormFeedback invalid>
                There seems to be a problem with your phone number format.
             </FormFeedback>
            </Col>
          </Row>
          <Row>
            <Input type="submit" value="Update" className="btn btn-success" />
          </Row>
        </Form>

      </Container>);
  }
}


