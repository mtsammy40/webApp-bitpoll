import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Input, FormGroup, Label, Row, Col,
    Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Dp from '../../Images/man.svg';
import '../../App.css';
import Api from '../../api/api';
import ResultsPie from '../charts/electionChart';
import angel from '../../api/angel';

export default class ElectionCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            candidates: [],
            election:{},
            vote: {},
            chartData: {
                    labels: [],
                    data: []
            },
            modal: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    handleSubmit(e){
        e.preventDefault();
        let vote = {
            "election": this.state.election.electionId,
            "candidate": e.target.candidate.value,
            "ballotKey": e.target.ballotKey.value
        }
        console.log('vote', vote);
        Api.post('org.bitpoll.net.Voting', vote, { withCredentials: true}).then((res)=>{
            if(res==="successful"){
                alert('successfully voted!');
            } else {
                alert(res.data);
            }
            return vote;
        }).then(res=>{
            var vote = {
                election: res.election,
                candidate: res.candidate,
                gender: this.props.profile.gender,
                age: 20,
                county: this.props.profile.county,
                candidateNo: this.state.election.candidates.length 
            }
            angel.post('newVote', vote).then(()=>{
                console.log('success', vote);
            }).catch(err=>{
                console.log('err sending voter data', err);
            });
        }).catch(e=>{
            if(e  === null){
                alert('Connection to server has been lost, please check that you are connected');
            } else {
                console.log('errrrr', e)
                alert(e);

            }
           
        })

    }
    componentDidMount(){
        //var election = this.props.elections.find( e => e.electionId === this.props.match.params.id );
        Api.get('org.bitpoll.net.Election/'+this.props.match.params.id, { withCredentials: true}).then(res => {
            const election = res.data;
            this.setState({ election });
        }).then(() => {
            var candidates = [];
            var labels = []; var data = []; var backgroundColors = []; //for chart
            //console.log('res.data', this.state.election.candidates[0].split('#').pop());
            for(var i = 0; i<this.state.election.candidates.length; i++){
                //get each candidates details
                Api.get('org.bitpoll.net.Candidate/' + this.state.election.candidates[i].split('#').pop(), { withCredentials: true})
                .then((cand)=>{
                    candidates.push(cand.data);
                    labels.push(cand.data.name);
                    data.push(cand.data.count);//for chart
                    this.setState({ candidates });
                });   
                var dynamicColors = "rgb(" +Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255)+ "," + Math.floor(Math.random() * 255) + ")";
                backgroundColors.push(dynamicColors);
            }
            var chartData = {
                "labels": labels,
                "datasets": [{
                    "label": this.state.election.name,
                    "data" : data,
                    "backgroundColor": backgroundColors
                }]                
            };
            var chartOptions = {
                    "backgroundColor": "#ff4455" 
            }
            this.setState({ chartData, chartOptions });
            console.log('chartData', this.state.chartData);
        }).catch(error => {
            if(error === null){
                alert('Connection to the server has been lost, please check that your internet is working');
            } else {
                console.log('error',  error);
            }
           
        });
        this.ws = new WebSocket('ws://localhost:3000/');
        this.ws.onopen = ()=>{
            console.log('WebSockets is a go-go-go');
        }
     /*    this.ws.onmessage = (e)=> {
            const event = JSON.parse(e.data);
            var candidate = event.candidate;
            var candidateName = this.state.candidates.find(cand =>  cand.candidateId === candidate.split('#').pop());
            console.log('candidate name', candidateName );
            var index = this.state.chartData.labels.indexOf(candidateName.name);
            console.log('Cand index ', index );
            var chartData = this.state.chartData;
            console.log('to change', chartData.datasets[0].data[index]);
            chartData.datasets[0].data[index] = event.count;
            this.setState({ chartData });
            console.log("chart done", this.state.chartData);
        } */
    }

    componentWillReceiveProps(){
        this.ws.onmessage = (e)=> {
            const event = JSON.parse(e.data);
            var candidate = event.candidate;
            var candidateName = this.state.candidates.find(cand =>  cand.candidateId === candidate.split('#').pop());
            console.log('candidate name', candidateName );
            var index = this.state.chartData.labels.indexOf(candidateName.name);
            console.log('Cand index ', index );
            var chartData = this.state.chartData;
            console.log('to change', chartData.datasets[0].data[index]);
            chartData.datasets[0].data[index] = event.count;
            this.setState({ chartData });
            console.log("chart done", this.state.chartData);
        }
    }
    componentWillUnmount(){
        this.ws.close();
    }
    render(){
        //Set combobox with candidates
        let candOptions = this.state.candidates.map(c =>
            <option key={c.candidateId} value={c.candidateId} > {c.name} </option>
        );
        return(
            <Container className="col-md-6">
                <Card>
                    <CardBody>
                        <Row>
                        <Col md={6}>
                            <CardImg src={Dp} ></CardImg>
                        </Col>
                        <Col md={6}>
                            <CardTitle><h1>{this.state.election.motion}</h1></CardTitle>
                            <CardSubtitle>{this.props.match.params.id}</CardSubtitle>
                            <CardText>
                                <li>{this.state.election.start}</li>
                                <li>{this.state.election.end}</li>
                            </CardText>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label>Select your prefered candidate</Label>
                                    <Input name="candidate" type="select" required>
                                    <option  value="" > Please select candidate</option>
                                        {candOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Input your secret</Label>
                                    <Input type="text" name="ballotKey" placeholder="Input your secret key" /> 
                                </FormGroup>
                                <Input type="submit" value="vote" className="btn btn-success col-md-12 brad" />
                            </form>
                        </Col>
                        </Row>
                        <div>
                            <Button color="danger" onClick={this.toggle}>Show results</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Results for: {this.state.election.motion}</ModalHeader>
                            <ModalBody>
                                <ResultsPie data={this.state.chartData} options={this.state.chartOptions}></ResultsPie>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                            </Modal>
                        </div>
                    </CardBody>
                </Card>
            </Container>

        );
    }
}