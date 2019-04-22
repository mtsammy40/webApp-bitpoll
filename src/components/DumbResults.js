import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Input, FormGroup, Label, Row, Col,
    Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem
} from 'reactstrap';
import Dp from '../Images/laptop.png';
import '../App.css';
import Api from '../api/api';
import ResultsPie from './charts/electionChart';
import angel from '../api/angel';
import PdfView from './pdf';

export default class DumbResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            election: {},
            vote: {},
            chartData: {
                labels: [],
                data: []
            },
            pdfmodal: false,
            modal: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.pdftoggle = this.pdftoggle.bind(this);

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    pdftoggle() {
        this.setState(prevState => ({
            pdfmodal: !prevState.pdfmodal
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        let vote = {
            "election": this.state.election.electionId,
            "candidate": e.target.candidate.value,
            "ballotKey": e.target.ballotKey.value
        }
        console.log('vote', vote);
        Api.post('org.bitpoll.net.Voting', vote, { withCredentials: true }).then((res) => {
            if (res === "successful") {
                alert('successfully voted!');
            } else {
                alert(res.data);
            }
            var voter = {
                voter: 'resource:org.bitpoll.net.Voter#' + this.props.profile.id,
                election: 'resource:org.bitpoll.net.Election#' + this.state.election.electionId
            }
            console.log('voter is.... Recording', voter);
            Api.post('org.bitpoll.net.RecordVoted', voter, { withCredentials: true }).then(resp => {
                console.log('recorded');
            }).catch(e => {
                console.log('error recording vote', e);
            })
            return vote;
        }).then(res => {
            var vote = {
                election: res.election,
                candidate: res.candidate,
                gender: this.props.profile.gender,
                age: 20,
                county: this.props.profile.county,
                candidates: this.state.election.candidates
            }
            angel.post('newVote', vote).then(() => {
                console.log('success', vote);
            }).catch(err => {
                console.log('err sending voter data', err);
            });
        }).catch(e => {
            if (e === null) {
                alert('Connection to server has been lost, please check that you are connected');
            } else {
                console.log('errrrr', e)
                alert(e);

            }

        })

    }
    componentDidMount() {
        //var election = this.props.elections.find( e => e.electionId === this.props.match.params.id );
        Api.get('org.bitpoll.net.Election/' + this.props.match.params.id, { withCredentials: true }).then(res => {
            const election = res.data;
            this.setState({ election });
        }).then(() => {
            var candidates = [];
            var labels = []; var data = []; var backgroundColors = []; //for chart
            //console.log('res.data', this.state.election.candidates[0].split('#').pop());
            for (var i = 0; i < this.state.election.candidates.length; i++) {
                //get each candidates details
                Api.get('org.bitpoll.net.Candidate/' + this.state.election.candidates[i].split('#').pop(), { withCredentials: true })
                    .then((cand) => {
                        candidates.push(cand.data);
                        labels.push(cand.data.name);
                        data.push(cand.data.count);//for chart
                        this.setState({ candidates });
                    });
                var dynamicColors = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
                backgroundColors.push(dynamicColors);
            }
            var chartData = {
                "labels": labels,
                "datasets": [{
                    "label": this.state.election.name,
                    "data": data,
                    "backgroundColor": backgroundColors
                }]
            };
            var chartOptions = {
                "backgroundColor": "#ff4455"
            }
            this.setState({ chartData, chartOptions });
            console.log('chartData', this.state.chartData);
        }).catch(error => {
            if (error === null) {
                alert('Connection to the server has been lost, please check that your internet is working');
            } else {
                console.log('error', error);
            }

        });
        this.ws = new WebSocket('ws://35.202.24.146:80/');
        this.ws.onopen = () => {
            console.log('WebSockets is a go-go-go');
        }
    }

    componentWillReceiveProps() {
        this.ws.onmessage = (e) => {
            const event = JSON.parse(e.data);
            var candidate = event.candidate;
            var candidateName = this.state.candidates.find(cand => cand.candidateId === candidate.split('#').pop());
            console.log('candidate name', candidateName);
            if (candidateName) {
                var index = this.state.chartData.labels.indexOf(candidateName.name);
                console.log('Cand index ', index);
                var chartData = this.state.chartData;
                console.log('to change', chartData.datasets[0].data[index]);
                chartData.datasets[0].data[index] = event.count;
                this.setState({ chartData });
                console.log("chart done", this.state.chartData);
            }
        }
    }
    componentWillUnmount() {
        this.ws.close();
    }
    render() {
        //Set combobox with candidates
        let candOptions = this.state.candidates.map(c =>
            <option key={c.candidateId} value={c.candidateId} > {c.name} </option>
        );
        if (this.state.election.start) {
            var start = this.state.election.start.split('T')[0];
            var end = this.state.election.end.split('T')[0];
        } else {
            var start = 'Loading...';
            var end = 'Loading....';
        }
        if (this.state.chartData) {
            var res;
            var results = this.state.chartData.labels.map((l, i) => {
                console.log('l', l);
                return <ListGroupItem key={i}>{l} : {this.state.chartData.datasets[0].data[i]}</ListGroupItem>
            })
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
                                <div className="align-self-baseline">
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
        return (
            <div className="vh-100 cool-bg">
                <Container className="col-md-6">
                    <Card>
                        <CardBody>
                            <CardImg src={Dp} width="500px" ></CardImg>
                            <CardTitle className="text-center"><h1>{this.state.election.motion}</h1></CardTitle>
                            <CardSubtitle className="text-center">{this.props.match.params.id}</CardSubtitle>
                            <CardText className="text-center">
                                <ListGroup>
                                    <ListGroupItem style={{ textDecoration: 'none' }}>{start}</ListGroupItem>
                                    <ListGroupItem style={{ textDecoration: 'none' }}>{end}</ListGroupItem>
                                    <ListGroupItem style={{ textDecoration: 'none' }}>{this.state.election.institution}</ListGroupItem>
                                </ListGroup>


                            </CardText>
                            <ResultsPie data={this.state.chartData} options={this.state.chartOptions}></ResultsPie>
                            <ListGroup className="text-center mt">
                                {results}
                            </ListGroup>
                            <div>
                                <Button color="danger" className="hidden" onClick={this.toggle}>Show results</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Results for: {this.state.election.motion}</ModalHeader>
                                    <ModalBody>
                                        <ResultsPie data={this.state.chartData} options={this.state.chartOptions}></ResultsPie>
                                        <ListGroup className="text-center"> {results}</ListGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
                <Button onClick={e=>this.pdftoggle()}>PDF</Button>
                <PdfComp title={"Election Results"} for='General Public'>
                    <Card>
                        <CardBody>
                            <CardImg src={Dp} width="500px" ></CardImg>
                            <CardTitle className="text-center"><h1>{this.state.election.motion}</h1></CardTitle>
                            <CardSubtitle className="text-center">{this.props.match.params.id}</CardSubtitle>
                            <CardText className="text-center">
                                <ListGroup>
                                    <ListGroupItem style={{ textDecoration: 'none' }}>{start}</ListGroupItem>
                                    <ListGroupItem style={{ textDecoration: 'none' }}>{end}</ListGroupItem>
                                    <ListGroupItem style={{ textDecoration: 'none' }}>{this.state.election.institution}</ListGroupItem>
                                </ListGroup>


                            </CardText>
                            <ResultsPie data={this.state.chartData} options={this.state.chartOptions}></ResultsPie>
                            <ListGroup className="text-center mt">
                                {results}
                            </ListGroup>
                            <div>
                                <Button color="danger"className="hidden" onClick={this.toggle}>Show results</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Results for: {this.state.election.motion}</ModalHeader>
                                    <ModalBody>
                                        <ResultsPie data={this.state.chartData} options={this.state.chartOptions}></ResultsPie>
                                        <ListGroup className="text-center"> {results}</ListGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </CardBody>
                    </Card>
                </PdfComp>
            </div>


        );
    }
}