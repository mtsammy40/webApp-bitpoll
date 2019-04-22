import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container, FormText, FormFeedback } from 'reactstrap';
import Api from '../../api/api';
import angel from '../../api/angel';
import moment from 'moment';

export default class NewVoter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        gender: "male",
        valid: true,
        county: 'NAIROBI',
        nationality: 'Kenya',
        institution: 'resource:org.bitpoll.net.Institution#ota',
        dob: moment().subtract(18, "years").format('YYYY-MM-DD')
      },
      validate:{}
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
      form = { ...form, [e.target.name]: e.target.value };
      this.setState({ form });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
      Api.post('org.bitpoll.net.Voter', this.state.form, { withCredentials: true }).then(res => {
        alert('successful');
        var issuee = {
          participant: 'resource:org.bitpoll.net.Voter#' + this.state.form.id,
          userID: this.state.form.id,
          options: { "issuer": true }
        };
        Api.post('system/identities/issue', issuee, { withCredentials: true, responseType: 'blob' }).then((res) => {
          console.log('my file', res);
          var data = new FormData();
          data.append('id', this.state.form.id);
          data.append('email', this.state.form.email);
          data.append('data', res.data);
          angel.post('sendVoterEmail/', data)
            .then(res => {
              console.log('voter id sent ', this.state.form.id)
            }).catch(e => {
              console.log('email failed', e);
            });
          this.props.onSuccess();
        }).catch(error => {
          alert('Please recheck your data and retry');
          console.log(error.response);
        });
      });
  }
  componentDidMount() {
    Api.get('https://restcountries.eu/rest/v2/all?fields=name').then(res => {
      var countries = res.data;
      console.log('countries', countries);
      this.setState({ countries });
    }).catch(e => {
      console.log('e', e.responseText);
    })
    if (this.props.profile) {
      var {form} = this.state;
      form = {...form, institution: this.props.profile.institution } ;
      this.setState({ form });
    }
  }
  render() {
    console.log('state das', this.state);
    let countriesList = [];
    if (!this.state.countries) {
      countriesList = [<option>Kenya</option>];
    } else {
      countriesList = this.state.countries.map((c, i) => <option key={i}>{c.name}</option>);
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
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fullnametb">Full Name</Label>
                <Input type="text" className="capitalize" name="name" id="fullnametb" placeholder="Please enter full name"
                  onChange={this.handleChange} valid={this.state.validate && this.state.validate.name === 'has-success'}
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
                  onChange={this.handleChange} valid={this.state.validate && this.state.validate.email === 'has-success'}
                  invalid={this.state.validate && this.state.validate.email === 'has-danger'}
                  required />
                <FormFeedback valid>
                  A wonderful name!
                 </FormFeedback>
                <FormFeedback invalid>
                  Invalid email. Is it in the format someaone@mail.com?
               </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="nationalitytb">Nationality</Label>
                <Input type="select" name="nationality" value={this.state.form.nationality} id="nationalitytb" placeholder="e.g Kenyan" onChange={this.handleChange} required>
                  {countriesList}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="gendertb">Gender</Label>
                <Input type="select" name="gender" id="gendertb" value={this.state.form.gender} onChange={this.handleChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Date of Birth">Date Of Birth</Label>
                <Input type="date" name="dob" id="bobtb" placeholder="Date of Birth" value={this.state.form.dob} max={moment().subtract(18, "years").format('YYYY-MM-DD')} onChange={this.handleChange} required />
                <FormText>Must be 18 years or older</FormText>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="countytb">County of Residence</Label>
                <Input type="select" name="county" id="countytb" value={this.state.form.county} onChange={this.handleChange} required >
                  {
                    countiesList
                  }
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">ID </Label>
                <Input type="text" name="id" id="idtb" onChange={this.handleChange}
                  valid={this.state.validate && this.state.validate.id === 'has-success'}
                  invalid={this.state.validate && this.state.validate.id === 'has-danger'}
                  required />
                <FormFeedback valid>
                    Valid Id, thanks!
                </FormFeedback>
                <FormFeedback invalid>
                  There seems to be a problem with your name id. Is it 8-10 digits? 
              </FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxtb">National ID or Passport</Label>
                <Input type="text" name="nationalId" id="idtb" onChange={this.handleChange}
                  valid={this.state.validate && this.state.validate.nid === 'has-success'}
                  invalid={this.state.validate && this.state.validate.nid === 'has-danger'}
                />
                <FormFeedback valid>
                  Valid, Thanks!
                </FormFeedback>
                <FormFeedback invalid>
                There seems to be a problem with your name id. Is it 8-10 digits? 
              </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <Label for="phoneNo">
                Telephone</Label>
              <Input type="text" name="phoneNo" onChange={this.handleChange}
                valid={this.state.validate && this.state.validate.phone === 'has-success'}
                invalid={this.state.validate && this.state.validate.phone === 'has-danger'}
                required />
              <FormFeedback valid>
                Valid phone number, thanks!
              </FormFeedback>
              <FormFeedback invalid>
                There seems to be a problem with your phone format.
            </FormFeedback>
            </Col>
          </Row>
          <Row>
            <Input type="submit" value="Sign up" className="btn btn-success mt" />
          </Row>
        </Form>
      </Container>
    );
  }
}