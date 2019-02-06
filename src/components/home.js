import React from "react";
import {  BrowserRouter as Router, Route } from "react-router-dom";
import {Container} from "reactstrap";
import Header from "./Jumbotron.js";
import SignUp from "./newVoter.js";
export default class Home extends React.Component{
    render(){
        return(
            <Router>
                <div>
                <Header></Header>
                <Container>
                    <Route path="/SignUp" component={SignUp} />
                </Container>
                
                </div>
            </Router>
        );
    }
}