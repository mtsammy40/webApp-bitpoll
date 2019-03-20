import React from "react";
import {Container, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col,
ListGroup, ListGroupItem, ListGroupItemHeading, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";
import load from '../../Images/load.gif';
import '../../App.css';
import Feed from "./feed";
import {Redirect} from 'react-router-dom';
import UpdateForm from './updater';
export default class VoterProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UpdateProfileModal: false,
        };
        this.toggleUpdateProfile = this.toggleUpdateProfile.bind(this);
    }
    toggleUpdateProfile(){
        this.setState(prevState => ({
            UpdateProfileModal: !prevState.UpdateProfileModal
          }));
      }
    render(){
        if(this.props.profile){
            switch(this.props.profile.$class){
                case 'org.bitpoll.net.Admin':
                    return <Redirect to="/IDashboard" />;
                case 'org.bitpoll.net.Regulator':
                    return <Redirect to="/RegulatorDashboard" />;
                case 'NetworkAdmin':
                    console.log('Shida ni??', this.props.profile)
                    return <Redirect to="/IDashboard" />;
                default:
            }
            var myDetails = this.props.profile;
        }
        
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
                    <Button onClick={this.toggleUpdateProfile}>Edit</Button>
                    <Modal isOpen={this.state.UpdateProfileModal} toggle={this.toggleUpdateProfile} className={this.props.className}>
          <ModalHeader toggle={this.toggleUpdateProfile}>Update Details</ModalHeader>
          <ModalBody>
              <UpdateForm profile={this.props.profile}></UpdateForm>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleUpdateProfile}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleUpdateProfile}>Cancel</Button>
          </ModalFooter>
        </Modal>
                </CardBody>
                </Card>
            }
        }
        const Summary = ()=>{
            if(!this.state.summary){
                return <img src={load} alt="Loading..." width="100%" height="200"/>
            } else {

            }
            if(this.props.profile){
    }}
        return(
            <div className="wrapper">
                 <Container >
                    <Row>
                        <Col md = {{size: 8}}>
                            <Row>
                                <Col md={12}>
                                    <ProfileCard></ProfileCard>
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
                    <Row>
                        <Col sm={12} md={12}>
                            <Feed profile = {this.props.profile}></Feed>
                        </Col>
                    </Row>   
            </Container>
            </div>
           
        );
    }
}