import React from 'react';
import { Col,Jumbotron, Button, Row, Container} from 'reactstrap';
import '../App.css';
import security from '../Images/security.png';
import transparency from '../Images/transparency.jpg';

const Header = (props) => {
  return (
    <div>
      <Jumbotron className="jumbo">
        <Row>
        <Col md={{size:6, offset: 6}}>
          <h1 className="display-3">The future is here!</h1>
          <p className="lead">The end of paper ballots and the begining of secure transparent digital voting</p>
          <hr className="my-2" />
          <p>Here at Bitpoll, Your vote counts... Literally!</p>
          <p className="lead">
            <Button color="primary" href="/feed/">View elections we have propelled</Button>
          </p>
        </Col>
        </Row>
      </Jumbotron>
      <Container className="container-fluid">
        <Row className="shadow mt">
          <Col md={{size:6}} className="overflow-hidden">
            <img src={security} width={600} alt="security"></img>
          </Col>
          <Col md={{size:6}}>
            <Container>
              <h1>Security Assured</h1>
              <p>Security and integrity of votes should never be an issue in democratic systems.
                We ensure that security sees no compromise in the voting process by securing vote transmission
                with tls and using blockchain platform to reinforce immutability of submitted votes.
              </p>
            </Container>
          </Col>
        </Row>
        <Row className=" shadow mt">
          <Col md={{size:6}}>
              <Container>
                <h1>Transparency Reinvented</h1>
                <p>Transparency is at the core of trust! Why sacrifice it in a process as crucial as voting?
                  In Bitpoll, we ensure transparency is at the core of every count and every submission so that
                  you have no doubt about your results!
                </p>
              </Container>
            </Col>
            <Col md={{size:6}} className="overflow-hidden">
              <img src={transparency} width={600} alt="transparency"></img>
            </Col>
        </Row>
        
        
      </Container>
      <Row className="shadow mt text-center">
          <Col>
            <Container>
              <p>2019 &copy; Bitpoll</p>
            </Container>
          </Col>
        </Row>
    </div>
     
  );
};

export default Header;
