import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Input, FormGroup } from 'reactstrap';
import '../App.css';

export default class ElectionCard extends React.Component{
    constructor(props){
        super(props);
        this.state = [];
    }
    render(){
        let EcardId = this.props.match.params.id;
        let Ecard = this.props.comments.find( e => e.id === EcardId );
        return(
            <Container className="col-md-6">
                <Card>
                    <CardImg top width="100%" src="https://cdn2.iconfinder.com/data/icons/miscellanea-set-4/100/.svg-19-512.png"></CardImg>
                    <CardBody>
                        <CardTitle><h1>{this.props.match.params.id}</h1></CardTitle>
                        <CardSubtitle>{Ecard.comment}</CardSubtitle>
                        <CardText>The president of the republic of kenya performs many tasks. Among them... </CardText>
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