import React from 'react';
import { Col,Jumbotron, Button, FormGroup, Row, Form, Label, Input } from 'reactstrap';

const Header = (props) => {
  return (
    <div>
      <Jumbotron>
        <Row>
        <Col md={6}>
          <h1 className="display-3">The future is here!</h1>
          <p className="lead">The end of paper ballots and the begining of secure transparent digital voting</p>
          <hr className="my-2" />
          <p>Are you part of the shift? Have you joined the movement? Does your vote count?(Literally)</p>
          <p className="lead">
            <Button color="primary" href="/SignIn/">Sign Up</Button>
          </p>
        </Col>
        <Col className="pull-right" md={4}>
          <Form>
            <FormGroup>
              <Label for="lgemailtb">Email</Label>
              <Input type="email" placeholder="Someone@mail.com" name="lgemail" id="lgemailtb" />
            </FormGroup>
            <FormGroup>
              <Label for="passtb">Password</Label>
              <Input type="email" placeholder="Someone@mail.com" name="lgemail" id="lgemailtb" />
            </FormGroup>
            <Input type="submit" Value="Login" />
          </Form>
        </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default Header;
