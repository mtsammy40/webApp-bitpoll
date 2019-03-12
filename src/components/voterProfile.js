import React from "react";
import {Container, Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button, Row, Col} from "reactstrap";

export default class VoterProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = [];
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col md = {{size: 6, offset: 3}}>
                    <Card>
                   <CardBody>
                    <CardTitle><h2>Your name</h2></CardTitle>
                    <CardSubtitle>Your affiliate institution</CardSubtitle>
                     <CardText>You can edit these values</CardText>
                     <Row>
                         <Col sm="6">
                         Nationality : {this.props.profile.Nationality}
                         </Col>
                         <Col sm="6">
                         Votes : {this.props.profile.Votes} 
                         </Col>
                     </Row>
                    <Button>Edit</Button>
                </CardBody>
                </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}