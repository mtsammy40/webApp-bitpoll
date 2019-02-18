import React from 'react';
import {Container, Input, Label, FormGroup, Row, Col, FormText} from 'reactstrap';
import Api from '../api/api';
import { longStackSupport } from 'q';

export default class newElection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            candidateNames:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleChange(e){
        if(e.target.name=== "img"){
            this.setState({[e.target.name] : URL.createObjectURL(e.target.files[0])});
            console.log('img' + this.state.img);
          }  else {
            this.setState({[e.target.name] : e.target.value});
          }
    }
    handleBlur(e){
        // want a multidimensional array? https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
        var candidateNames = [];
        for(var i=1; i<=this.state.cand_no; i++){
            var name = document.getElementById("cand_name_"+i).value;
            candidateNames.push(name);
        }
        this.setState({ candidateNames });
    }
    handleSubmit(e){

        e.preventDefault();
        /* var candidateNames = [];
        for(var i=1; i<=this.state.cand_no; i++){
            var name = document.getElementById("cand_name_"+i).value;
            candidateNames.push(name);
        }
        console.log('Namessss', candidateNames);
        this.setState({ candidateNames });
        console.log('Namessss2', this.state); */
        delete this.state.cand_no;
        console.log('state', this.state);
        Api.post('org.bitpoll.net.CreateElection', this.state, { withCredentials: true}).then(res => {
            alert('successfully set: '+ res.data.motion);
        }).catch(error=> {
            console.log('error', error)
            if(error.response.code){
                alert('connection lost, Please check your internet connection');
            } else {
                alert(error.response.code + 'Please recheck your data and retry');
            } 
        });
    }
    render(){
            var tb = [];
            for (var i = 1; i<=this.state.cand_no; i++){   
                tb.push(i);
            }
            if(!tb){
                const ListItem = <p>No record</p>
            }
            const ListItem = tb.map( (t) =>  
            <FormGroup key={t.toString()} >
                <Label>Candidate {t} </Label>
                <Input type="text" name="cand_name" id={'cand_name_'+t} dot={t.toString()} placeholder="Candidate Name" onBlur={this.handleBlur} />
            </FormGroup>
            );
        return(
            <Container>
                <form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Label for="motiontb">Motion</Label>
                        <Input type="text" placeholder="Input motion" name="motion" id="motiontb" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="desctb">Institution</Label>
                        <textarea className="form-control" name="institution" onChange={this.handleChange} ></textarea>
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="starttb">Start Date</Label>
                                <Input type="date" placeholder="The start date of the election" name="start" id="starttb" onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="endb">End Date</Label>
                                <Input type="date" placeholder="The end date of the election" name="end" id="endtb" onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                        <FormGroup>
                            <Label id="cand_notb">No. of Candidates</Label>
                            <Input type="number" name="cand_no" id="cand_notb" placeholder="No. of Candidates" onChange={this.handleChange} />
                        </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Number of Ballots</Label>
                                <Input type="number" name="ballotNo" placeholder="No. of Ballots" onChange={this.handleChange} />
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