import React from 'react';
import { Container, Input, Label, FormGroup, Row, Col, FormFeedback } from 'reactstrap';
import Api from '../../api/api';
import Moment from 'moment';
export default class NewElection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            candidateNames: [],
            validate:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
            case 'cand_no':
           
            if (e.target.value > 1) {
              validate.cn = 'has-success'
            } else {
              validate.cn = 'has-danger'
            }
            this.setState({ validate });
            break;
          default:
            break;
        }
      }
    handleChange(e) {
        this.validate(e);
        if (e.target.name === "img") {
            this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
            console.log('img' + this.state.img);
        } else {
            let {form} = this.state;
            form = {...form, [e.target.name]: e.target.value }
            this.setState({ form });
            console.log('alarr', this.state.form);
        }
    }
    handleBlur(e) {
      console.log('on blur');
        var candidateNames = [];
        var categories = [];
        for (var i = 1; i <= this.state.form.cand_no; i++) {
            var name = document.getElementById("cand_name_" + i).value;
            var category = document.getElementById("cand_cat_" + i).value;
            candidateNames.push(name);
            categories.push(category);
        }
        let {form} = this.state;
        form = {...form, candidateNames, categories };
        this.setState({ form });
        console.log('after blur', this.state.form);
    }
    handleSubmit(e) {

        e.preventDefault();
        /* var candidateNames = [];
        for(var i=1; i<=this.state.cand_no; i++){
            var name = document.getElementById("cand_name_"+i).value;
            candidateNames.push(name);
        }
        console.log('Namessss', candidateNames);
        this.setState({ candidateNames });
        console.log('Namessss2', this.state); */
        delete this.state.form.cand_no;
        console.log('state', this.state.form);
        Api.post('org.bitpoll.net.CreateElection', this.state.form, { withCredentials: true }).then(res => {
            alert('successfully set: ' + res.data.motion);
            this.props.fetchElections();
            return res.data;
        }).catch(error => {
            console.log('error', error)
            if (error.response.code) {
                alert('connection lost, Please check your internet connection');
            } else {
                alert(error.response.code + 'Please recheck your data and retry');
            }
        });
    }
    componentWillMount() {
        if (this.props.profile) {
            var admin = this.props.profile.id;
            var institution = this.props.profile.institution;
            let {form} = this.state;
            form = {...form, admin, institution};
            this.setState({ form });
        }
    }
    componentWillReceiveProps(nextProp) {
        if (this.props.profile !== nextProp.profile) {
            console.log('profssss', nextProp.profile);
            var admin = "resource:" + nextProp.profile.$class + "#" + nextProp.profile.id;
            var institution = nextProp.profile.institution;
            let {form} = this.state;
            form = {...form, admin, institution};
            this.setState({ form });
        }
    }
    componentDidMount(){
        if (this.props.profile) {
            var institution = this.props.profile.institution;
            let {form} = this.state;
            form = {...form, institution};
            this.setState({ form });
          }
    }
    render() {
        console.log('prop= ' + this.props.profile.id + ' admin ='+ this.props.admin.institution, this.state.admin);
        var tb = [];
        for (var i = 1; i <= this.state.form.cand_no; i++) {
            tb.push(i);
        }
        var admin;
        if (this.props.profile) {
            admin = "resource:" + this.props.profile.$class + "#" + this.props.profile.id;
        } else {
            admin = "...Loading";
        }
        if (!tb) {
            const ListItem = <p>No record</p>
        }
        console.log('state new election', this.state);
        const ListItem = tb.map((t) =>
        <Row form>
          <Col md={6}>
            <FormGroup key={t.toString()} >
                <Label>Candidate {t.toString()} </Label>
                <Input type="text" name="cand_name" id={'cand_name_' + t} dot={t.toString()} placeholder="Candidate Name" onBlur={this.handleBlur}
                 required />
                 </FormGroup>
                 </Col>
                 <Col md={6}>
                 <FormGroup>
                <Label>Category for candidate {t.toString()} </Label>
                <Input type="text" name="cand_cat" id={'cand_cat_' + t} dot={t.toString()} placeholder="Aspiring Position" onBlur={this.handleBlur} required />
                </FormGroup>
                </Col>
            </Row>
        );
        const minDate = new Date(Date.now());
        return (
            <Container>
                <form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Label for="motiontb">Motion</Label>
                        <Input type="text" placeholder="Input motion" name="motion" id="motiontb" onChange={this.handleChange} 
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="desctb">Admin</Label>
                        <Input type="text" className="form-control" value={this.state.form.admin} name="admin" disabled />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="starttb">Start Date</Label>
                                <Input type="date" placeholder="The start date of the election" name="start" id="starttb" min={Moment().format('YYYY-MM-DD')} onChange={this.handleChange} required />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="endb">End Date</Label>
                                <Input type="date" placeholder="The end date of the election" name="end" id="endtb" min={this.state.form.start} onChange={this.handleChange} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="endb">Institution</Label>
                                <Input type="text" name="institution" value={this.state.form.institution} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label id="cand_notb">No. of Candidates</Label>
                                <Input type="number" name="cand_no" id="cand_notb" min={2} placeholder="No. of Candidates" onChange={this.handleChange} 
                                valid={this.state.validate && this.state.validate.cn === 'has-success'}
                                invalid={this.state.validate && this.state.validate.cn === 'has-danger'}
                                required />
                              <FormFeedback valid>
                                All good!
                                </FormFeedback>
                              <FormFeedback invalid>
                                Number has to be greater than 1
                              </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup>
                                <Label>Number of Ballots</Label>
                                <Input type="number" name="ballotNo" placeholder="No. of Ballots" min={3} onChange={this.handleChange} 
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
                    </Row>
                    {ListItem}
                    <Input type="submit" value="Create Election" className="btn btn-success" />
                </form>
            </Container>
        );
    }
}  