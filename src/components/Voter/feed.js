import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
 CardSubtitle, CardBody, CardFooter, Container, Badge, ListGroup, ListGroupItem } from 'reactstrap';
import Api from '../../api/api';

export default class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            elections: []
         };
         this.loggedIn = {
             logged: false,
             name: '',
             email: ''
         }
    }
    componentDidMount(){
        Api.get('org.bitpoll.net.Election', { withCredentials: true}).then(res => {
            const elections = res.data;
            this.setState({ elections });
        }).catch(error => {
            console.log('error',  error.response);
        });
    }
    render(){
        let feeds = this.state.elections;
        let feedlist = feeds.map((feed)=> 
        <Card key={feed.electionId} className="shadow mt">
            <CardImg top width="100%" src={feed.img} alt="Card image cap" />
            <CardBody>
                <CardTitle><h2>{feed.motion}</h2></CardTitle>
                <CardSubtitle>Valid voters: {feed.ballotKey.length}</CardSubtitle>
                <CardText>
                <ListGroup>
        <ListGroupItem className="justify-content-between">Start Date: <Badge pill>{feed.start}</Badge></ListGroupItem>
        <ListGroupItem className="justify-content-between">End Date: <Badge pill>{feed.end}</Badge></ListGroupItem>
      </ListGroup></CardText>
                <Button className="btn btn-primary" href={"/DumbFeed/" + feed.electionId}>View Election results</Button>
                <Button className="btn btn-primary ml-auto" href={"/vote/" + feed.electionId}>Go to election</Button>
            </CardBody>
            <CardFooter><Badge color="success">Ongoing</Badge></CardFooter>
        </Card>
        );
        return (
            <Container md={12}>
              <CardColumns>
              {feedlist}
              </CardColumns>
          </Container>
        );
    }
  
}