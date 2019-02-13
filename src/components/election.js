import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Input, FormGroup } from 'reactstrap';
import '../App.css';
import Api from '../api/api';

export default class ElectionCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            election:{},
            candidates: []
        };
    }
    componentDidMount(){
        //var election = this.props.elections.find( e => e.electionId === this.props.match.params.id );
        Api.get('org.bitpoll.net.Election/'+this.props.match.params.id).then(res => {
            const election = res.data;
            this.setState({ election });
        }).then((res)=>{
            var candidates = [];
            for(var i = 0; i<res.data.candidates.length; i++){
                //get each candidates details
                Api.get('org.bitpoll.net.Candidate/'+this.state.election.candidates[i].split('#').pop())
                .then((cand)=>{
                   
                    candidates.push(cand);
                    this.setState({ candidates }, console.log('candidates wangu ni ', candidates));
                });
            }
        }
        ).catch(error => {
            console.log('error',  error.response);
        });
    }
    render(){
        console.log('Ecard', this.props.elections);
        return(
            <Container className="col-md-6">
                <Card>
                    <CardImg top width="100%" src="https://cdn2.iconfinder.com/data/icons/miscellanea-set-4/100/.svg-19-512.png"></CardImg>
                    <CardBody>
                        <CardTitle><h1>{this.state.election.motion}</h1></CardTitle>
                        <CardSubtitle>{this.props.match.params.id}</CardSubtitle>
                        <CardText>
                            <li>{this.state.election.start}</li>
                            <li>{this.state.election.end}</li>
                        </CardText>
                        <FormGroup>
                            <Input type="select">
                                <option value="yes">Yes</option>
                                <option value="No">No</option>
                            </Input>
                        </FormGroup>
                        <Button className="btn btn-success col-md-12 brad">Vote</Button>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}