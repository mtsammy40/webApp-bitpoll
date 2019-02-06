import React from "react";
import {Container, Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button, Row, Col} from "reactstrap";

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = [];
    }
    render(){
        return(
            <Container>
               <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
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
            </Container>
        );
    }
}