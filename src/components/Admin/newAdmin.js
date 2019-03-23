import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container, FormFeedback, FormText } from 'reactstrap';
import Api from '../../api/api';
import Angel from '../../api/angel';
import moment from 'moment';
export default class NewAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "gender": "male",
      nationality: 'Kenya',
      institution: this.props.insts[0],
      dob: moment().subtract(18, 'years').format('YYYY-MM-DD'),
      validate: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  validate(e) {
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

      this.setState({ [e.target.name]: e.target.value });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    delete this.state.countries;
    delete this.state.validate;
    /* Api.post('org.bitpoll.net.Admin', this.state, { withCredentials: true}).then(res => {
        alert('successful');
    }).catch(error => {
        alert('Please recheck your data and retry');
        console.log(error.response);
    }); */
    Angel.post('NewPendingAdmin/', this.state).then(res => {
      console.log('res data', res.status);
      if (res.status === 200) {
        alert('successful');
        this.props.onSuccess();
      }
    }).catch(e => {
      console.log('anfeliaforos imekataa', e.responseText);
    });
  }
  componentDidMount() {
    Api.get('https://restcountries.eu/rest/v2/all?fields=name').then(res => {
      var countries = res.data;
      console.log('countries', countries);
      this.setState({ countries });
    }).catch(e => {
      console.log('e', e.responseText);
    });
  }

  render() {
    if (!this.state.validate) {
      var validEmail = "";
    }
    let countriesList = [];
    if (!this.state.countries) {
      countriesList = [<option value="kenya">Kenya</option>];
    } else {
      countriesList = this.state.countries.map((c, i) => <option key={i}>{c.name}</option>);
    }
    var insts;
    if (this.props.insts) {
      insts = this.props.insts.map(i => <option key={i.id} value={'resource:org.bitpoll.net.Institution#' + i.id}>{i.name}</option>)
    } else {
      insts = <option value="resource:org.bitpoll.net.Institution#ota"></option>
    }
    var countiesList;
    if (this.props.counties) {
      countiesList = this.props.counties.features.map((c, i) => {
        return <option key={i}>{c.attributes.SNO}</option>
      });
    } else {
      countiesList = [<option>Nairobi</option>];
    }
    var now = moment();
    console.log('18 years ago', now.subtract(18, 'years').format('ll'))
    return (
      <Container>
        <h2> New Administrator</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input className="capitalize" type="text" name="name" id="fullnametb"
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
                <Input type="email" name="email" id="emailtb" placeholder="passomeone@mail.com" onChange={this.handleChange}
                 valid={this.state.validate && this.state.validate.email === 'has-success'}
                 invalid={this.state.validate && this.state.validate.email === 'has-danger'}
                 required />
                <FormFeedback valid>
                  That's a tasty looking email you've got there.
              </FormFeedback>
                <FormFeedback invalid>
                  Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>

              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="select" name="nationality" id="nationalitytb" placeholder="e.g Kenyan" onChange={this.handleChange} required>
                  {countriesList}
                  <option>Kenya</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="gendertb">Gender</Label>
                <Input type="select" name="gender" id="gendertb" value={this.state.gender} onChange={this.handleChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="date" name="dob" id="bobtb" placeholder="Date of Birth" value={this.state.dob} max={moment().subtract(18, 'years').format('YYYY-MM-DD')} onChange={this.handleChange} required />
                <FormText>Must be 18 years and above.</FormText>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="countytb">County</Label>
                <Input type="select" name="county" id="countytb" onChange={this.handleChange} required >
                {countiesList}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID Number</Label>
                <Input type="text" name="id" id="idtb" onChange={this.handleChange}
                  valid={this.state.validate && this.state.validate.id === 'has-success'}
                  invalid={this.state.validate && this.state.validate.id === 'has-danger'}
                  required />
                <FormFeedback valid>
                  A valid id, thanks!
                  </FormFeedback>
                <FormFeedback invalid>
                  There seems to be a problem with your Id format.
                </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="dp">Phone Number</Label>
                <Input type="text" name="phoneNo" onChange={this.handleChange}
                  valid={this.state.validate && this.state.validate.phone === 'has-success'}
                  invalid={this.state.validate && this.state.validate.phone === 'has-danger'}
                  required />
                <FormFeedback valid>
                  Good Phone Number, thanks!
                  </FormFeedback>
                <FormFeedback invalid>
                  The format of your phone number is wrong
                </FormFeedback>

              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="nationalitytb">Institution</Label>
                <Input type="select" name="institution" id="institutiontb" onChange={this.handleChange} required>
                  {insts}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Input type="submit" value="Sign up" className="btn btn-success" />
        </Form>
      </Container>
    );
  }
}