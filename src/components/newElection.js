import React from 'react';
import {Container, Input, Label, FormGroup, Row, Col, FormText} from 'reactstrap';

export default class newElection extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        if(e.target.name=== "img"){
            this.setState({[e.target.name] : URL.createObjectURL(e.target.files[0])});
            console.log('img' + this.state.img);
          } else {
            this.setState({[e.target.name] : e.target.value});
          }
    }
    handleSubmit(e){
        e.preventDefault();
        alert("The information is of: " + this.state.motion);
    }
    render(){
        return(
            <Container>
                <form onSubmit={this.handleSubmit} >
                <FormGroup>
                        <Label for="imgtb">Cover Image</Label>
                        <Input type="file" name="img" id="imgtb" onChange={this.handleChange} />
                        <FormText color="muted">
                            What image would you like for your profile?
                        </FormText>
                        <img className="img-circle img-responsive" src={this.state.img} alt="preview" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="motiontb">Motion</Label>
                        <Input type="text" placeholder="Input motion" name="motion" id="motiontb" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="desctb">Description</Label>
                        <textarea className="form-control"></textarea>
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="starttb">Start Date</Label>
                                <Input type="date" placeholder="The start date of the election" name="startdate" id="starttb" onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="endb">End Date</Label>
                                <Input type="date" placeholder="The end date of the election" name="enddate" id="endtb" onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label id="cand_notb">No. of Candidates</Label>
                        <Input type="number" name="cand_no" id="cand_notb" placeholder="No. of Candidates" onChange={this.handleChange} />
                    </FormGroup>
                    <Input type="submit" value="Create Election" className="btn btn-success" />
                </form>
            </Container>
        );
    }
}  