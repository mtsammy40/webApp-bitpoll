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
        let feedlist;
        if(this.props.profile){
            console.log('elections', this.state.elections);
            console.log('myinst', this.props.profile );
        }
        if(this.state.elections && this.props.profile){
            
            let feeds = this.state.elections.find(e=>{
                return e.intitution === this.props.profile.institution
            });
            console.log('elections', this.state.elections);
            console.log('myinst', this.props.profile );
            feedlist = feeds.map((feed)=> 
            <Card key={feed.electionId} className="shadow mt">
                <CardImg top width="100%" src={feed.img} alt="Card image cap" />
                <CardBody>
                    <CardTitle><h2>{feed.motion}</h2></CardTitle>
                    <CardText className="shadow mt br-20">
                    <ListGroup>
                        <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {feed.ballotKey.length}</span></ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{feed.start.split('T')[0]}</Badge></ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{feed.end.split('T')[0]}</Badge></ListGroupItem>
          </ListGroup></CardText>
                    <Button color='success' className="shadow" outline block href={"/DumbFeed/" + feed.electionId}>View Election results</Button>
                    <Button color='primary' className="shadow"  outline block href={"/vote/" + feed.electionId}>Go to election</Button>
                </CardBody>
                <CardFooter><Badge color="success" className="shadow" >Ongoing</Badge></CardFooter>
            </Card>
            );
        } else {
           feedlist = "No Elections available";
        }
        
        return (
            <Container md={12}>
              <CardColumns>
              {feedlist}
              </CardColumns>
          </Container>
        );
    }
  
}