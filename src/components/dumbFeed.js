import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Row, Col  } from 'reactstrap';
import Dp from '../Images/man.svg';
import '../App.css';
import Api from '../api/api';
import ResultsPie from './charts/electionChart';

export default class DumbFeed extends React.Component{
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
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    componentDidMount(){
        //var election = this.props.elections.find( e => e.electionId === this.props.match.params.id );
        Api.get('org.bitpoll.net.Election/'+this.props.match.params.id, { withCredentials: true}).then(res => {
            const election = res.data;
            this.setState({ election });
        }).then(() => {
            var candidates = [];
            var labels = []; var data = []; var backgroundColors = []; //for chart
            console.log('res.data', this.state.election.candidates[0].split('#').pop());
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
        return(
            <div className="cool-bg">
                <Container className="col-md-6">
                    <Card className="shadow mt">
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
                                
                            </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <ResultsPie data={this.state.chartData} options={this.state.chartOptions}></ResultsPie>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>

        );
    }
}