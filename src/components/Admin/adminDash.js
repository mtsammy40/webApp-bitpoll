import React from 'react';
import {
    Row, Container, Col, Card, CardBody, CardHeader, CardImg, CardTitle, CardText, Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge, Input
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Link, Redirect,
    Route // for later
} from 'react-router-dom';
import Api from '../../api/api';
import '../../App.css';
import Dp from '../../Images/man.svg';
import Load from '../../Images/load.gif';
import { Pie } from 'react-chartjs-2';
import UpdateForm from './update';
import NewReg from './newReg';
import NewAdmin from './newAdmin';
import NewElection from './newElection';
import NewVoter from './newVoter';
import PendingAdmin from './pendingAdmins';
import profile from '../../Images/profile.jpg';
import angel from '../../api/angel';
import MyAdmins from './myAdmins';
import CandidateChart from '../candidateChart';
import PdfView from './pdf';
import api from '../../api/api';
import UpdateFormReg from './updateRegs';
import DeleteRegM from './deleteRegm';
import UpdateVoter from './updateVoter';
import moment from 'moment';
export default class IDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Me: {},
            Institutions: [],
            Admins: [],
            Elections: [],
            modal: false,
            pdfmodal: false,
            DeleteModal: false,
            DeleteRegModal: false,
            UpdateProfileModal: false,
            UpdateProfile: {},
        };
        this.profile = {};
        this.fetchAdmins = this.fetchAdmins.bind(this);
        this.fetchPAdmins = this.fetchPAdmins.bind(this);
        this.fetchRegs = this.fetchRegs.bind(this);
        this.fetchVoters = this.fetchVoters.bind(this);
        this.fetchCountries = this.fetchCountries.bind(this);
        this.fetchInsts = this.fetchInsts.bind(this);
        this.fetchElecs = this.fetchElecs.bind(this);
        this.fetchCounties = this.fetchCounties.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.getCandidates = this.getCandidates.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleUpdateProfile = this.toggleUpdateProfile.bind(this);
        this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleRefetch = this.toggleRefetch.bind(this);
        this.getCandidatesByElection = this.getCandidatesByElection.bind(this);
        this.getChartData = this.getChartData.bind(this);
        this.pdftoggle = this.pdftoggle.bind(this);
        this.toggleUpdateReg = this.toggleUpdateReg.bind(this);
        this.prepareUpdateReg = this.prepareUpdateReg.bind(this);
        this.handleUpdateReg = this.handleUpdateReg.bind(this);
        this.prepareDeleteReg = this.prepareDeleteReg.bind(this);
        this.prepareUpdateVoter = this.prepareUpdateVoter.bind(this);
        this.toggleUpdateVoter = this.toggleUpdateVoter.bind(this);
        this.toggleDeleteReg = this.toggleDeleteReg.bind(this);
        this.search = this.search.bind(this);
    }
    toggleRefetch() {
        this.setState(prev => ({
            reFetch: !prev.reFetch
        }));
    }
    pdftoggle() {
        this.setState(prev => ({
            pdfmodal: !prev.pdfmodal
        }));
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        if (!this.state.modal) {
            delete this.state.ViewCands;
        }
    }
    toggleUpdateProfile() {
        this.setState(prevState => ({
            UpdateProfileModal: !prevState.UpdateProfileModal
        }));
    }
    toggleDeleteReg() {
        this.setState(prevState => ({
            DeleteRegModal: !prevState.DeleteRegModal
        }));
    }
    toggleSuccessModal() {
        this.setState(prevState => ({
            SuccessModal: !prevState.SuccessModal
        }));
    }
    toggleDeleteModal() {
        this.setState(prevState => ({
            DeleteModal: !prevState.DeleteModal
        }));
    }
    toggleUpdateReg() {
        this.setState(prevState => ({
            UpdateRegModal: !prevState.UpdateRegModal
        }));
    }
    toggleUpdateVoter() {
        this.setState(prevState => ({
            UpdateVoterModal: !prevState.UpdateVoterModal
        }));
    }
    fetchAdmins = () => {
        Api.get('org.bitpoll.net.Admin', { withCredentials: true }).then(res => {
            const Admins = res.data;
            this.setState({ Admins });
            console.log('Admins', this.state.Admins);
            let UpdateProfile = this.state.Admins[0];
            this.setState({ UpdateProfile });
            console.log('update profile ', this.profile);
        }).catch(error => {
            console.log(error.response);
        });
    }
    prepareUpdateReg(id) {
        var UpdateReg = this.state.Regs.find(r => {
            return r.id === id;
        });
        this.setState({ UpdateReg }, (u) => {
            console.log('prevstate', this.state.UpdateReg);
            this.toggleUpdateReg();
        });
    }
    prepareUpdateVoter(id) {
        var UpdateVoter = this.state.Voters.find(r => {
            return r.id === id;
        });
        this.setState({ UpdateVoter }, (u) => {
            console.log('prevstate', this.state.UpdateVoter);
            this.toggleUpdateVoter();
        });
    }
    prepareDeleteReg(id) {
        var DeleteReg = this.state.Regs.find(r => {
            return r.id === id;
        });
        this.setState({ DeleteReg }, (u) => {
            console.log('prevstate', this.state.DeleteReg);
            this.toggleDeleteReg();
        });
    }
    handleUpdateReg() {
        api.put('org.bitpoll.net.Regulator/' + this.state.UpdateReg.id, this.state.UpdateReg, { withCredentials: true }).then(res => {
            alert('Updated!');
            delete this.state.UpdateReg;
        }).catch(err => {
            console.log('error updating', err);
        })
    }
    fetchPAdmins() {
        angel.get('AllPendingAdmins/').then(res => {
            var pendingAdmins = res.data;
            this.setState({ pendingAdmins });
            console.log('response angelia', this.state.pendingAdmins)
        }).catch(e => {
            console.log('No P Admins', e.response);
        });
    }
    fetchVoters = () => {
        Api.get('org.bitpoll.net.Voter', { withCredentials: true }).then(res => {
            const Voters = res.data;
            this.setState({ Voters });
            console.log('Voter', this.state.Voters);
        }).catch(error => {
            console.log(error.response);
        });
    }
    fetchRegs() {
        Api.get('org.bitpoll.net.Regulator', { withCredentials: true }).then(res => {
            const Regs = res.data;
            this.setState({ Regs });
            console.log('Regs', this.state.Regs);
        }).catch(error => {
            console.log(error.response);
        });
    }
    fetchElecs() {
        Api.get('org.bitpoll.net.Election', { withCredentials: true }).then(res => {
            const Elections = res.data;
            this.setState({ Elections });
            if (this.state.Elections.length !== 0) {
                this.getCandidates();
            }
        }).catch(error => {
            console.log(error.response);
        });
    }
    fetchCountries() {
        Api.get('https://restcountries.eu/rest/v2/all?fields=name', { withCredentials: true }).then(res => {
            var countries = res.data;
            console.log('countries', countries);
            this.setState({ countries });
        }).catch(e => {
            console.log('e', e);
        });
    }
    fetchCounties() {
        Api.get('https://services7.arcgis.com/um8CA8KcKChzWgPS/arcgis/rest/services/County_Summary/FeatureServer/0/query?where=1%3D1&outFields=SNO&outSR=4326&f=json').then(res => {
            var counties = res.data;
            console.log('counties', counties);
            this.setState({ counties });
        }).catch(e => {
            console.log('e', e);
        });
    }
    fetchInsts() {
        Api.get('org.bitpoll.net.Institution', { withCredentials: true }).then(res => {
            const Insts = res.data;
            this.setState({ Insts });
        }).catch(error => {
            console.log(error.response);
        });
    }
    deleteAdmin(id) {
        Api.delete('org.bitpoll.net.Admin/' + id, { withCredentials: true }).then(res => {
            this.fetchAdmins();
            var SuccessMessage = "Admin Successfuly Deleted";
            this.setState({ SuccessMessage });
            this.toggleDeleteModal();
        }).catch(e => {
            alert("canot delete, check previledges");
            console.log('error in delete admin', e);
        });
    }
    deleteReg(id) {
        Api.delete('org.bitpoll.net.Regulator/' + id, { withCredentials: true }).then(res => {
            this.fetchRegs();
            var SuccessMessage = "Regulator Successfuly Deleted";
            this.setState({ SuccessMessage });
            this.toggleDeleteReg();
        }).catch(e => {
            alert("canot delete, check previledges");
            console.log('error in delete admin', e);
        });
    }
    componentWillMount() {
        this.fetchPAdmins();
        this.fetchAdmins();
        this.fetchVoters();
        this.fetchRegs();
        this.fetchElecs();
        this.fetchInsts();
        this.fetchCountries();
        this.getCandidates();
        this.fetchCounties();
        this.ws = new WebSocket('ws://35.202.24.146:3003/');
        this.ws.onopen = () => {
            console.log('WebSockets is a go-go-go');
        }
    }

    componentWillReceiveProps() {
        this.ws.onmessage = (e) => {
            const event = JSON.parse(e.data);
            if (event.$class === 'org.bitpoll.net.NewVote') {
                var candidate = event.candidate;
                var election = this.state.Elections.find(er => {
                    return er.candidates.indexOf(candidate) > -1;
                });
                console.log('Got the election', election);
                var electionIndex = this.state.Elections.indexOf(election);
                var candidateName = this.state.candidates.find(cand => cand.candidateId === candidate.split('#').pop());
                console.log('candidate name', candidateName);
                var index = this.state.chartData.labels.indexOf(candidateName.name);
                console.log('Cand index ', index);
                var chartData = this.state.chartData[electionIndex];
                console.log('to change', chartData.datasets[0].data[index]);
                chartData.datasets[0].data[index] = event.count;
                this.setState({ chartData });
                console.log("chart done", this.state.chartData);
                this.setState({ reFetch: true });
            }
        }
    }
    getChartData() {
        var AE = [];
        console.log('starting chartdata');
        console.log('starting chartdata', this.state.Elections);
        this.state.Elections.forEach((election => {
            var candidatesArr = [];
            var dataArr = [];
            var labelsArr = [];
            var backgroundColors = [];
            election.candidates.forEach(cand => {
                var candidates = this.state.candidates.find(c => {
                    return c.candidateId === cand.split('#').pop();
                });
                candidatesArr.push(candidates);
            });
            console.log('gcd candidate details', candidatesArr);
            candidatesArr.forEach(ca => {
                labelsArr.push(ca.name);
                dataArr.push(ca.count);
                backgroundColors.push("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")");
            });
            var Cdata = {
                "labels": labelsArr,
                "datasets": [{
                    "label": election.motion,
                    "data": dataArr,
                    "backgroundColor": backgroundColors
                }]
            };
            var ElecStats = {
                electionId: election.electionId,
                chart: Cdata
            };
            AE.push(ElecStats);
        }));
        this.setState({ AE });
    }
    getCandidates() {
        for (var j = 0; j < this.state.Elections.length; j++) {
            var candidates; var data = []; var labels = []; var backgroundColors = [];
            for (var i = 0; i < this.state.Elections[j].candidates.length; i++) {
                Api.get('org.bitpoll.net.Candidate#' + this.state.Elections[j].candidates[i].split('#').pop(), { withCredentials: true })
                    // eslint-disable-next-line no-loop-func
                    .then((cand) => {
                        candidates = cand.data;
                        this.setState({ candidates });
                        console.log('candidates', this.state.candidates);
                    }).then(() => {
                        this.getChartData();
                    }).catch(e => {
                        console.log('cand fetch error', e);
                    });
            }
        };
    }
    getCandidatesByElection(electionId) {
        let mycandidates = [];
        let election = this.state.Elections.find((e) => {
            return e.electionId === electionId;
        });
        console.log('okay elec ' + electionId, election);
        election.candidates.forEach((c) => {
            let candidate = this.state.candidates.find((cand) => {
                return cand.candidateId === c.split('#').pop();
            });
            mycandidates.push(candidate);
        });
        console.log('okay candidates', mycandidates);
        const ViewCands = {
            election: election.motion,
            candidates: mycandidates
        }
        this.setState({ ViewCands });
        this.toggle();
    }
    search(inputId, tableId, rowNumber) {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById(inputId);
        filter = input.value.toUpperCase();
        table = document.getElementById(tableId);
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[rowNumber];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    render() {
        let myDetails = this.props.profile;
        let countriesList = [];
        let Insts;
        let myAdmin = { 'id': 'default' };
        if (!this.state.Insts) {
            Insts = ["ota"];
        } else {
            Insts = this.state.Insts;
        }
        if (!this.state.countries) {
            countriesList = ["Kenya"];
        } else {
            countriesList = this.state.countries.map((c, i) => <option key={i}>{c.name}</option>);
        }
        let InfoCard;
        if (!myDetails) {
            InfoCard = () => {
                return <span className="d-flex justify-content-center"><img src={Load} alt="loading..."></img></span>
            }
        } else {
            InfoCard = (props) => {
                myDetails.dob = myDetails.dob.split('T')[0];
                const infotable =
                    <div>
                        <Table responsive>
                            <tbody>
                                <tr><td>name: </td><td> {myDetails.name}</td></tr>
                                <tr><td>ID: </td><td> {myDetails.id}</td></tr>
                                <tr><td>Nationality: </td><td> {myDetails.nationality}</td></tr>
                                <tr><td>Email: </td><td> {myDetails.email}</td></tr>
                                <tr><td>Gender: </td><td> {myDetails.gender}</td></tr>
                            </tbody>
                        </Table>
                        <Button color="danger" onClick={this.toggleUpdateProfile} style={{ display: "inline" }}><i className="flaticon-edit"></i> Update</Button>
                        <div>
                            <Modal isOpen={this.state.UpdateProfileModal} toggle={this.toggleUpdateProfile} className={this.props.className}>
                                <ModalHeader toggle={this.toggleUpdateProfile}>Update Data</ModalHeader>
                                <ModalBody>
                                    <UpdateForm profile={myDetails} counties={this.state.counties} onSuccess={this.toggleUpdateProfile}></UpdateForm>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleUpdateProfile}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                return infotable;
            }
        }
        if (this.props.profile) {
            switch (this.props.profile.$class) {
                case 'org.bitpoll.net.Regulator':
                    return <Redirect to="/RegulatorDashboard" />;
                case 'org.bitpoll.net.Voter':
                    return <Redirect to="/VoterProfile" />;
                case 'NetworkAdmin':
                    console.log('Shida ni??', this.props.profile)
                    return <Redirect to="/IDashboard" />;
                default:
            }
            var profs = this.props.profile;
        } else {
            var profs = 'Institution....';
        }
        // Functional Components
        const VotersPage = (props) => {
            if (!this.state.Voters) {
                return <img src={Load} alt="loading..."></img>
            } else {


                var votersList = this.state.Voters.map(v => <tr><td>{v.name}</td><td>{v.gender}</td><td>{v.id}</td><td>{v.dob}</td><td><Button outline onClick={e => { this.prepareUpdateVoter(v.id) }} color="secondary">Update</Button></td></tr>)
                var votersList2 = this.state.Voters.map(v => <tr><td>{v.name}</td><td>{v.gender}</td><td>{v.id}</td><td>{v.dob}</td></tr>)

                return <Container>
                    <Row>
                        <Col md={12}>
                            <Card className="mt shadow">
                                <CardBody>
                                    <CardTitle><h2>New Voter</h2></CardTitle>
                                    <NewVoter onSuccess={this.fetchVoters} profile={this.props.profile} counties={this.state.counties}></NewVoter>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card className="shadow mt">
                                <CardBody>
                                    <CardTitle>Voters</CardTitle>
                                    <Row>
                                    <Input type="text" placeholder="search" name="Search by Name" id="searchVoters" onChange={e=>this.search("searchVoters", "votert", 0)} />
                                        <Table id="votert" responsive>
                                            <tr>
                                                <th>Name</th>
                                                <th>Gender</th>
                                                <th>Id</th>
                                                <th>Date of Birth</th>
                                            </tr>
                                            <tbody>
                                                {votersList}
                                            </tbody>
                                            <tr></tr>
                                        </Table >
                                        <Button outline block color="primary" onClick={this.pdftoggle}>PDF</Button>
                                        <PdfComp title={"Voters List"} for={profs.name} showControls="hidden"><Table responsive>
                                            <tr>
                                                <th>Name</th>
                                                <th>Gender</th>
                                                <th>Id</th>
                                                <th>Date of Birth</th>
                                            </tr>
                                            <tbody>
                                                {votersList2}
                                                <tr ><td></td></tr>
                                            </tbody>

                                        </Table></PdfComp>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.UpdateVoterModal} size="lg" toggle={this.toggleUpdateVoter} className={this.props.className}>
                        <ModalHeader toggle={this.toggleUpdateVoter}>Update Data</ModalHeader>
                        <ModalBody>
                            <UpdateVoter profile={this.state.UpdateVoter} counties={this.state.counties} onSuccess={() => { this.fetchVoters(); this.toggleUpdateVoter() }}></UpdateVoter>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleUpdateVoter}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            }
        }
        const GetData = (props) => {
            if (!this.state.Voters || !this.state.Regs) {
                return <img src={Load} alt="Loading..." height="50px"></img>
            } else {
                switch (props.part) {
                    case 'voter':
                        console.log('voterdash', this.state.Voters.length);
                        return this.state.Voters.length;
                    case 'election':
                        return this.state.Elections.length;
                    case 'admin':
                        return this.state.Admins.length;
                    case 'regulator':
                        return this.state.Regs.length;
                    default:
                        return 'loading...';
                }
            }
        }
        const MyRegs = () => {
            if (!this.state.Regs) {
                return <span className="d-flex justify-content-center"><img src={Load} alt="loading..."></img></span>
            } else {
                var Regslist = this.state.Regs.map(R =>
                    <tr key={R.id}><td>{R.id}</td><td>{R.name}</td><td>{R.email}</td><td>{R.address}</td><td><button className="btn btn-secondary" onClick={e => { this.prepareUpdateReg(R.id) }}>Edit</button></td><td><button className="btn btn-danger" onClick={e => { this.prepareDeleteReg(R.id) }}>Remove</button></td></tr>
                );
                return <div>
                     <Input type="text" placeholder="search" name="Search by Name" id="searchRegs" onChange={e=>this.search("searchRegs", "regt", 1)} />
                    <Table id="regt" responsive>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Remove</th>
                    <tbody>{Regslist}</tbody>
                </Table>
                    <Modal isOpen={this.state.UpdateRegModal} toggle={this.toggleUpdateReg} className={this.props.className}>
                        <ModalHeader toggle={this.toggleUpdateReg}>Update Data</ModalHeader>
                        <ModalBody>
                            <UpdateFormReg profile={this.state.UpdateReg} onSuccess={() => { this.fetchRegs(); this.toggleUpdateReg() }}></UpdateFormReg>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleUpdateReg}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.DeleteRegModal} toggle={this.toggleDeleteReg} className={this.props.className}>
                        <ModalHeader toggle={this.toggleDeleteReg}>Are you sure you want to Delete this Regulator?</ModalHeader>
                        <ModalBody>
                            <DeleteRegM profile={this.state.DeleteReg} onSuccess={() => { this.fetchRegs(); this.toggleDeleteReg() }}></DeleteRegM>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleDeleteReg}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>;
            }
        }

        const Upform = () => {
            if (!this.state.Admins[0]) {
                return <span className="d-flex justify-content-center"><img src={Load} alt="loading..."></img></span>
            } else {
                return <UpdateForm profile={this.state.Admins[0]}></UpdateForm>
            }
        }
        const ActiveElections = () => {
            if (this.state.AE) {
                console.log('starting AE', this.state.AE);
                var active = this.state.AE.map((c, i) => {
                    return <Card className="shadow mt" key={i}>
                        <CardBody>
                            <CardTitle>
                                <h2>{c.chart.datasets[0].label}</h2>
                            </CardTitle>
                            <Row>
                                <Col md={6}>
                                    <Pie data={c.chart} options={this.state.chartOptions}></Pie>
                                </Col>
                                <Col md={6}>
                                    <Table responsive>
                                        <tr><td>Motion: </td><td>{c.chart.datasets[0].label}</td></tr>
                                        <tr><td>Candidates: </td><td>{c.chart.labels.map((l, i) => <tr key={i}><td>{l}</td><td>{c.chart.datasets[0].data[i]}</td></tr>)}</td></tr>
                                        <tr className="total"><td>Total Votes: </td><td className="align-text-right">{c.chart.datasets[0].data.reduce((a, b) => a + b, 0)}</td></tr>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <CandidateChart candidates={this.state.candidates} refetch={this.state.reFetch} toggleRefetch={this.toggleRefetch} election={c.electionId}></CandidateChart>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                });
                return active;
            } else {
                return <p>No active elections to show</p>
            }
        }
        const ViewCandidates = (props) => {
            if (this.state.ViewCands) {
                let candidates = this.state.ViewCands.candidates.map(e => <Card className="shadow mt">
                    <CardImg></CardImg>
                    <CardHeader>{e.name}</CardHeader>
                    <CardBody>
                        <h3>Votes Gained: <Badge color="primary">{e.count}</Badge></h3>
                    </CardBody>
                </Card>)
                return <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={props.className}>
                        <ModalHeader toggle={this.toggle}>Results for: {this.state.ViewCands.election}</ModalHeader>
                        <ModalBody>
                            {candidates}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            } else {
                return <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={props.className}>
                        <ModalHeader toggle={this.toggle}>Loading Data...</ModalHeader>
                        <ModalBody>
                            <span className="d-flex justify-content-center"><img src={Load} alt="loading..."></img></span>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            }
        }
        const MyElections = (props) => {
            if (!this.state.Elections) {
                return <span className="d-flex jussearchElecstify-content-center"><img src={Load} alt="Loading..." height="200px" /></span>
            } else {
                var electionslist = this.state.Elections.map(e =>{
                    var start = moment(e.start.split('T')[0]).format('YYYY-MM-DD');
                    var end = moment( e.end.split('T')[0]).format('YYYY-MM-DD')
                    var today = moment().format('YYYY-MM-DD');
                    console.log(start + ' '+end+' '+today)
                    var badge;
                    if(start > today){
                       badge =  <Badge color="primary">Future</Badge>
                    } else if(end < today){
                        badge = <Badge color="danger">Past</Badge>
                    } else if (start <= today && end >= today){
                        badge = <Badge color="success">Ongoing</Badge>
                    }
                    if (e.start)
                    return <tr key={e.electionId}><td>{e.electionId}</td><td>{e.motion}</td><td>{start}</td><td>{end}</td><td>{badge}</td><td className={props.showControls}>  <Button onClick={(ev) => { this.getCandidatesByElection(e.electionId) }}>View Candidates</Button><ViewCandidates elec={e.electionId}></ViewCandidates></td></tr>}
                );
                return <Container>
                    <Input className={props.showControls} type="text" placeholder="search" name="Search by Motion" id="searchElecs" onChange={e=>this.search("searchElecs", "elect", 1)} />
                    <Table id="elect" responsive>
                        <th>Id</th>
                        <th>Motion</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th className={props.showControls}>View Details</th>
                        <tbody>{electionslist}</tbody>
                    </Table>
                </Container>


            }
        }
        const MyAdminsChart = () => {
            if (!this.state.Admins) {
                return <tr><td>Loading Voter's charts...</td></tr>
            } else {
                var male = this.state.Admins.filter(e => {
                    return e.gender === "male";
                });
                console.log('male', male);
                console.log('elections', this.state.Elections)
                //Admins by gender
                var female = this.state.Admins.length - male.length;
                var data = [male.length, female];
                var labels = ["male", "female"];
                var chartData = {
                    "labels": labels,
                    "datasets": [{
                        "label": "Admins by Gender",
                        "data": data,
                        "backgroundColor": ["#ff4455", "#33dd00"]
                    }]
                };
                var chartOptions = {
                    "backgroundColor": "#ff4455"
                }
                /*  const natcharts = () => {
                     var countries=[]; var data = []; var backgroundColors=[];
                     for(var i=0; i<this.state.Admins.length; i++){
                         if(!countries.includes(this.state.Admins[i].nationality)){
                             countries.push(this.state.Admins[i].nationality);
                         } 
                     }
                     for(var k = 0; k < countries.length; k++){
                         data[k]=0;
                         var dynamicColors = "rgb(" +Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255)+ "," + Math.floor(Math.random() * 255) + ")";
                         backgroundColors.push(dynamicColors);
                         for(var l = 0; l< this.state.Admins[l].nationality; l++){
                             if(this.state.Admins[k].nationality===countries[l]){
                                 data[k]++;
                             }
                         }
                     }
                     console.log('hii data', data);
                     var chartData2 = {
                         "labels": countries,
                         "datasets": [{
                             "label": "Admins by Natioanlity",
                             "data" : data,
                             "backgroundColor": backgroundColors
                         }]                
                     };
                     return chartData2;
 
                 } */
                //Admins by Nationality

                return <Row>
                    <Col md={9}>
                        <Pie data={chartData} options={chartOptions} redraw></Pie>
                    </Col>
                </Row>
            }
        }
        const PdfComp = (props) => {
            var pdf =
                <Modal size="lg" isOpen={this.state.pdfmodal} toggle={this.pdftoggle} className={props.className}>
                    <ModalHeader toggle={this.pdftoggle}>Generate PDF Report</ModalHeader>
                    <ModalBody style={{ overflow: 'scroll' }}>
                        <PdfView>
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-column justify-content-center">
                                    <span className="d-flex justify-content-center">For {props.for}</span>
                                    <span><h2>{props.title}</h2></span>
                                    <div>
                                        {props.children}
                                    </div>
                                </div>
                                <div className="align-self-baseline justify-content-center">
                                    MIMI
                        </div>

                            </div>



                        </PdfView>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.pdftoggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>;
            return pdf;
        }
        const DashHome = () => {
            return <Container>
                <Row className="d-flex flex-row">
                    <Col md={3}>
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <span><h4 className="text-center">Admins</h4></span>
                                </CardTitle>
                                <span className="d-flex justify-content-center bg-sec"><GetData part='admin'></GetData></span>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <span><h4 className="text-center">Elections</h4></span>
                                </CardTitle>
                                <span className="d-flex justify-content-center bg-sec"><GetData part='election'></GetData></span>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <span><h4 className="text-center">Voters</h4></span>
                                </CardTitle>
                                <span className="d-flex justify-content-center bg-sec"><GetData part='voter'></GetData></span>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <span></span><h4 className="text-center">Regulators</h4>
                                </CardTitle>
                                <span className="d-flex justify-content-center bg-sec"><GetData part='regulator'></GetData></span>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 9 }} >
                        <Card className="shadow mt prof">
                            <div className="profile">
                                <img src={Dp} alt="profile"></img>
                            </div>

                            <CardBody>
                                <CardTitle>
                                    <h2>My Profile</h2>
                                </CardTitle>
                                <InfoCard></InfoCard>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 9 }} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>Active elections</h2>
                                </CardTitle>
                                <ActiveElections></ActiveElections>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 9 }} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>My Admins</h2>
                                </CardTitle>
                                <MyAdmins Admins={this.state.Admins} onDelete={this.deleteAdmin}></MyAdmins>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 9 }} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>My Regulators</h2>
                                </CardTitle>
                                <MyRegs></MyRegs>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 12 }} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>My Elections</h2>
                                </CardTitle>
                                <MyElections></MyElections>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 12 }} >
                        <Card className="shadow mt">
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle>
                                    <h2>Admins By gender</h2>
                                </CardTitle>
                                <MyAdminsChart></MyAdminsChart>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        }

        return (
            <div className="wrapper">
                <div className="sidebar shadow-lg">
                    <div className="sideheader text-center">
                        <img src={Dp} alt="pic" height="150px" width="150px" />
                    </div>
                    <div className="sidelinks">
                        <a href={`${this.props.match.url}/`}>Home</a>
                        <a href={`${this.props.match.url}/Admins/`}>Admins</a>
                        <a href={`${this.props.match.url}/Elections/`}>Elections</a>
                        <a href={`${this.props.match.url}/Regulators/`}>Regulators</a>
                        <a href={`${this.props.match.url}/Voters/`}>Voters</a>
                    </div>
                </div>
                <div className="content-wrapper">
                    <Route exact path={`${this.props.match.url}/`} component={DashHome} />
                    <Route exact path={`${this.props.match.url}/Regulators`} render={(props) =>
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <Card className="shadow mt">
                                        <CardBody>
                                            <CardTitle>
                                                <h2>My Regulators</h2>
                                            </CardTitle>
                                            <MyRegs></MyRegs>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Card className="shadow mt">
                                        <CardBody>
                                            <NewReg></NewReg>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>} />
                    <Route path={`${this.props.match.url}/Admins`} render={
                        (props) => <Container><Row>
                            <Col md={{ size: 12 }} >
                                <Card className="shadow mt">
                                    <CardImg></CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            <h2>Admins</h2>
                                        </CardTitle>
                                        <MyAdmins Admins={this.state.Admins} onDelete={this.deleteAdmin}></MyAdmins>
                                        <Button outline block color="primary" onClick={this.pdftoggle}>PDF</Button>
                                        <PdfComp title={"Admins List"} for={profs.name}><MyAdmins Admins={this.state.Admins} showControls="hidden"></MyAdmins></PdfComp>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                            <Row>
                                <Col md={{ size: 12 }} >
                                    <Card className="shadow mt">
                                        <CardImg></CardImg>
                                        <CardBody>
                                            <CardTitle>
                                                <h2>Admins By gender</h2>
                                            </CardTitle>
                                            <MyAdminsChart></MyAdminsChart>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <PendingAdmin onSuccess={() => this.fetchAdmins} updatePAdmins={this.fetchPAdmins} pendingAdmins={this.state.pendingAdmins}></PendingAdmin>
                            </Row>
                            <Row>
                                <Col md={{ size: 12 }} >
                                    <Card className="shadow mt">
                                        <CardImg></CardImg>
                                        <CardBody>
                                            <NewAdmin onSuccess={this.fetchPAdmins} counties={this.state.counties} insts={Insts}></NewAdmin>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    } />
                    <Route path={`${this.props.match.url}/Elections`} render={
                        (props) => <Container {...props} elections={this.state.elections}>
                            <Row>
                                <Col md={{ size: 12 }} >
                                    <Card className="shadow mt">
                                        <CardImg></CardImg>
                                        <CardBody>
                                            <CardTitle>
                                                <h2>Elections</h2>
                                            </CardTitle>
                                            <MyElections></MyElections>
                                            <Button outline block color="primary" onClick={this.pdftoggle}>PDF</Button>
                                            <PdfComp title={"Election List"} footer={profs.name}><MyElections showControls="hidden"></MyElections></PdfComp>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Card className="shadow mt">
                                        <CardBody>
                                            <CardTitle><h2>Active Elections</h2></CardTitle>
                                            <ActiveElections></ActiveElections>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ size: 12 }} >
                                    <Card className="shadow mt">
                                        <CardImg></CardImg>
                                        <CardBody>
                                            <CardTitle>
                                                <h2>New Elections</h2>
                                            </CardTitle>
                                            <NewElection admin={myAdmin} fetchElections={this.fetchElecs} profile={profs}></NewElection>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row></Container>} />
                    <Route path={`${this.props.match.url}/UpdateProfile`} render={
                        (props) =>
                            <Container>
                                <Row>
                                    <Col md={12}>
                                        <Card className="mt shadow">
                                            <CardBody>
                                                <CardTitle><h2>Update Information</h2></CardTitle>
                                                <Upform {...props} profile={this.props.profile}></Upform>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                    } />
                    <Route path={`${this.props.match.url}/Voters`} render={
                        (props) => <VotersPage>
                        </VotersPage>
                    } />
                </div>
            </div>

        );
    }
}