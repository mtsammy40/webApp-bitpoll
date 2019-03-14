import React from "react";
import {Container, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col,
ListGroup, ListGroupItem, ListGroupItemHeading} from "reactstrap";
import load from '../../Images/load.gif';
import '../../App.css';
import Feed from "./feed";
export default class VoterProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = [];
    }
    render(){
        const ProfileCard = ()=>{
            if(!this.props.profile){
               return <Card className="shadow mt">
                   <CardBody className="text-center">
                   <img src={load} alt="Loading..."></img>
                </CardBody>
                </Card>
            } else {
                return <Card className="shadow mt br-10">
                   <CardBody className="text-center">
                    <CardTitle><h2>{this.props.profile.name}</h2></CardTitle>
                    <CardSubtitle>{this.props.profile.institution}</CardSubtitle>
                     <CardText>{this.props.profile.email}</CardText>
                     <ListGroup className="shadow mt mb-3 p-2 br-10">
                         <ListGroupItemHeading>My Info</ListGroupItemHeading>
                         <ListGroupItem>Email: {this.props.profile.email}</ListGroupItem>
                         <ListGroupItem>ID: {this.props.profile.id}</ListGroupItem>
                         <ListGroupItem>Nationality: {this.props.profile.nationality}</ListGroupItem>
                     </ListGroup>
                    <Button>Edit</Button>
                </CardBody>
                </Card>
            }
        }
        const Summary = ()=>{
            if(!this.state.summary){
                return <img src={load} alt="Loading..." width="100%" height="200"/>
            } else {

            }
        }
        return(
            <div className="wrapper">
                 <Container >
                    <Row>
                        <Col md = {{size: 8}}>
                            <Row>
                                <Col md={12}>
                                    <ProfileCard></ProfileCard>
                                </Col>
                                <Col md={12}>
                                    <Feed></Feed>
                                </Col>
                            </Row>   
                        </Col>
                        <Col md={{size:4}}>
                            <Card className="shadow mt br-10">
                                <CardBody>
                                    <CardTitle>
                                        <h2>Summary</h2>
                                    </CardTitle>
                                    <Summary></Summary>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
            </Container>
            </div>
           
        );
    }
}