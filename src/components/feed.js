import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
 CardSubtitle, CardBody, Container } from 'reactstrap';
import Api from '../api/api';

export default class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            Elections: []
         };
         this.loggedIn = {
             logged: false,
             name: '',
             email: ''
         }
    }
    componentDidMount(){
        Api.get('org.bitpoll.net.Election').then(res => {
            const Elections = res.data;
            this.setState({ Elections });
        }).catch(error => {
            console.log('error',  error.response);
        });
    }
    render(){
        let feeds = this.state.Elections;
        let feedlist = feeds.map((feed)=> 
        <Card key={feed.electionId} className="shadow">
            <CardImg top width="100%" src={feed.img} alt="Card image cap" />
            <CardBody>
                <CardTitle>{feed.motion}</CardTitle>
                <CardSubtitle>Valid voters: {feed.ballotKey.length}</CardSubtitle>
                <CardText>{feed.institution}</CardText>
                <Button>Button</Button>
            </CardBody>
        </Card>
        );
        return (
            <Container md={8}>
              <CardColumns>
              {feedlist}
              </CardColumns>
          </Container>
        );
    }
  
}