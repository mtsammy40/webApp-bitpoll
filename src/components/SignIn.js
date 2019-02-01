import React from 'react';
import {FormGroup, Form, Label, Input} from 'reactstrap';
import '../App.css';
export default class SignIn extends React.Component{
    render(){
        return(
            <div className="par-middle">
                <div className="align-center middle">
                <div className="d-flex justify-content-center">
                    <Form>
                        <FormGroup>
                            <Label for="lgemailtb">Email</Label>
                            <Input type="email" name="lgemail" id="lgemailtb" placeholder="name@mail.com" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lgemailtb">Password</Label>
                            <Input type="password" name="lgemail" id="lgemailtb" placeholder="password" />
                        </FormGroup>
                        <Input type="submit" className="btn btn-success" value="Log In" />
                    </Form>
                </div>
                <div className="d-flex justify-content-center">
                    Bits and Bytes Co.
                </div>
                </div>
                
            </div>
        );
    }
}