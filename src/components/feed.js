import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
 CardSubtitle, CardBody, Container } from 'reactstrap';

export default class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            voterFeed:[{"id": "1", "name":"Do you like to eat?", "candidates":"Sam", "deadline": "12:00pm"},
            {"id": "2", "name":"Do you like to eat?", "candidates":"Sam", "deadline":"12:00pm"},
            {"id": "3", "name":"Do you like to eat?", "candidates":"Sam", "deadline": "12:00pm"} 
        ]
         };
         this.loggedIn = {
             logged: false,
             name: '',
             email: ''
         }
    }
    render(){
        let feeds = this.state.voterFeed;
        let feedlist = feeds.map((feed)=> 
        <Card key={feed.id}>
            <CardImg top width="100%" src={feed.img} alt="Card image cap" />
            <CardBody>
                <CardTitle>{feed.name}</CardTitle>
                <CardSubtitle>{feed.candidates}</CardSubtitle>
                <CardText>{feed.deadline}</CardText>
                <Button>Button</Button>
            </CardBody>
        </Card>
        );
        return (
            <Container>
              <CardColumns>
              {feedlist}
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Button</Button>
              </Card>
              <Card>
                  <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                  <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                  <Button>Button</Button>
                  </CardBody>
              </Card>
              <Card body inverse color="primary">
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color="secondary">Button</Button>
              </Card>
              </CardColumns>
          </Container>
        );
    }
  
}