import React, { Component } from "react";
import {Container } from 'reactstrap';
export default class NotFound extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <Container className="text-center vh-100" >
                <h1 className="display-2" style={{color: 'red'}}>
                    404!!
                </h1>
                <hr></hr>
                <h1>OOps, this page does not exist!</h1>
            </Container>
        )
    }
}