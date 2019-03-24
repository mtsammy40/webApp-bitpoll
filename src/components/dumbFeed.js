import React from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, CardFooter, Container, Badge, ListGroup, ListGroupItem,
    Row, Col
} from 'reactstrap';
import Api from '../api/api';

export default class DumbFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elections: []
        };
    }
    componentWillMount() {
        Api.get('org.bitpoll.net.Election', { withCredentials: true }).then(res => {
            const elections = res.data;
            this.setState({ elections });
        }).catch(error => {
            console.log('error', error);
        });
    }
    componentDidMount() {
        Api.get('org.bitpoll.net.Election', { withCredentials: true }).then(res => {
            const elections = res.data;
            this.setState({ elections });
        }).catch(error => {
            console.log('error', error);
        });
    }
    render() {
        let feedlist;
        let histlist;
        let Pfeeds; let Pfeedslist;//Past feeds
        let futurelist;
        let Ffeeds; let Ffeedslist //Future feeds
        if (this.state.elections.length !== 0) {
            console.log('elections feed', this.state.elections);
            console.log('profile feed', this.props.profile)
            //check if election is mine (my intitution)
            let feeds = this.state.elections;
            console.log('all my elections', feeds);

            if (!feeds) {
                feedlist = "No elections available";
                histlist = "You do not have past elections";
                futurelist = "You do not have scheduled elections";
                Ffeeds = "You have no scheduled elections";

            } else if (feeds.length > 0) { //if it is an array, found more than one election
                //get future elections
                console.log('feeds', feeds);
                Ffeeds = feeds.filter(f => {
                    var today = new Date();
                    var yesterday = new Date();
                    var tomorrow = new Date();
                    today.setHours(0, 0, 0, 0);
                    tomorrow.setDate(today.getDate() + 1);
                    yesterday.setDate(today.getDate() - 1);
                    var start = new Date(f.start);
                    var end = new Date(f.end);
                    return start >= tomorrow;
                });
                if (Ffeeds.length === 0 || !Ffeeds) {
                    Ffeedslist = "No future Elections"
                } else if (Ffeeds.length > 0) {//if it is an array
                    Ffeedslist = Ffeeds.map((feed) =>
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
                            </CardBody>
                            <CardFooter><Badge color="primary" className="shadow" >Future</Badge></CardFooter>
                        </Card>
                    );
                } else {
                    Ffeedslist = <Card key={Ffeeds.electionId} className="shadow mt">
                        <CardImg top width="100%" src={Ffeeds.img} alt="Card image cap" />
                        <CardBody>
                            <CardTitle><h2>{Ffeeds.motion}</h2></CardTitle>
                            <CardText className="shadow mt br-20">
                                <ListGroup>
                                    <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {Ffeeds.ballotKey.length}</span></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{Ffeeds.start.split('T')[0]}</Badge></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{Ffeeds.end.split('T')[0]}</Badge></ListGroupItem>
                                </ListGroup></CardText>
                        </CardBody>
                        <CardFooter><Badge color="primary" className="shadow" >Future</Badge></CardFooter>
                    </Card>
                }
                //get Past votes
                Pfeeds = feeds.filter(f => {
                    var today = new Date();
                    var yesterday = new Date();
                    today.setHours(0, 0, 0, 0);
                    yesterday.setDate(today.getDate() - 1);
                    var start = new Date(f.start);
                    var end = new Date(f.end);
                    return end < today;
                });
                if (Pfeeds.length === 0 || !Pfeeds) {
                    Pfeedslist = "No future Elections"
                } else if (Pfeeds.length > 0) {//if it is an array
                    Pfeedslist = Pfeeds.map((feed) =>
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
                            </CardBody>
                            <CardFooter><Badge color="danger" className="shadow" >Past</Badge></CardFooter>
                        </Card>
                    );
                } else {
                    console.log('PFEEDS', Pfeeds);
                    Pfeedslist = <Card key={Pfeeds.electionId} className="shadow mt">
                        <CardImg top width="100%" src={Pfeeds.img} alt="Card image cap" />
                        <CardBody>
                            <CardTitle><h2>{Pfeeds.motion}</h2></CardTitle>
                            <CardText className="shadow mt br-20">
                                <ListGroup>
                                    <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {Pfeeds.ballotKey.length}</span></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{Pfeeds.start.split('T')[0]}</Badge></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{Pfeeds.end.split('T')[0]}</Badge></ListGroupItem>
                                </ListGroup></CardText>
                            <Button color='success' className="shadow" outline block href={"/DumbFeed/" + Pfeeds.electionId}>View Election results</Button>
                        </CardBody>
                        <CardFooter><Badge color="danger" className="shadow" >Past</Badge></CardFooter>
                    </Card>
                }
                //GET CURRENT ELECTIONS
                var Cfeeds = feeds.filter(f => {
                    var today = new Date();
                    var yesterday = new Date();
                    var tomorrow = new Date();
                    today.setHours(0, 0, 0, 0);
                    tomorrow.setDate(today.getDate() + 1);
                    yesterday.setDate(today.getDate() - 1);
                    var start = new Date(f.start);
                    var end = new Date(f.end);
                    return start < tomorrow && end >= today; });

                    if (Cfeeds.length === 0 || !Cfeeds) {
                        feedlist = "No future Elections"
                    } else if (Cfeeds.length > 0) {//if it is an array
                        feedlist = Cfeeds.map((feed) =>
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
                                </CardBody>
                                <CardFooter><Badge color="success" className="shadow" >Ongoing</Badge></CardFooter>
                            </Card>
                        );
                    } else {
                        console.log('Cfeeds', Cfeeds);
                        feedlist = <Card key={Cfeeds.electionId} className="shadow mt">
                            <CardImg top width="100%" src={Cfeeds.img} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><h2>{Cfeeds.motion}</h2></CardTitle>
                                <CardText className="shadow mt br-20">
                                    <ListGroup>
                                        <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {Cfeeds.ballotKey.length}</span></ListGroupItem>
                                        <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{Cfeeds.start.split('T')[0]}</Badge></ListGroupItem>
                                        <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{Cfeeds.end.split('T')[0]}</Badge></ListGroupItem>
                                    </ListGroup></CardText>
                                <Button color='success' className="shadow" outline block href={"/DumbFeed/" + Cfeeds.electionId}>View Election results</Button>
                            </CardBody>
                            <CardFooter><Badge color="danger" className="shadow" >Past</Badge></CardFooter>
                        </Card>
                    }


                //Untested
                //Future and Past elections
            } else {
                //Get future votes
                var today = new Date();
                    var yesterday = new Date();
                    var tomorrow = new Date();
                    today.setHours(0, 0, 0, 0);
                    tomorrow.setDate(today.getDate() + 1);
                    yesterday.setDate(today.getDate() - 1);
                    var start = new Date(feeds.start);
                    var end = new Date(feeds.end);
                if (start > today) {
                    Ffeedslist = <Card key={feeds.electionId} className="shadow mt">
                        <CardImg top width="100%" src={feeds.img} alt="Card image cap" />
                        <CardBody>
                            <CardTitle><h2>{feeds.motion}</h2></CardTitle>
                            <CardText className="shadow mt br-20">
                                <ListGroup>
                                    <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {feeds.ballotKey.length}</span></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{feeds.start.split('T')[0]}</Badge></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{feeds.end.split('T')[0]}</Badge></ListGroupItem>
                                </ListGroup></CardText>
                        </CardBody>
                        <CardFooter><Badge color="primary" className="shadow" >Future</Badge></CardFooter>
                    </Card>
                }

                //Get past elections
                if (end < today) {
                    Pfeedslist = <Card key={feeds.electionId} className="shadow mt">
                        <CardImg top width="100%" src={feeds.img} alt="Card image cap" />
                        <CardBody>
                            <CardTitle><h2>{feeds.motion}</h2></CardTitle>
                            <CardText className="shadow mt br-20">
                                <ListGroup>
                                    <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {feeds.ballotKey.length}</span></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{feeds.start.split('T')[0]}</Badge></ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{feeds.end.split('T')[0]}</Badge></ListGroupItem>
                                </ListGroup></CardText>
                            <Button color='success' className="shadow" outline block href={"/DumbFeed/" + feeds.electionId}>View Election results</Button>
                        </CardBody>
                        <CardFooter><Badge color="danger" className="shadow" >Past</Badge></CardFooter>
                    </Card>
                }
                if(start < tomorrow && end >= today){
                    feedlist = <Card key={feeds.electionId} className="shadow mt">
                    <CardImg top width="100%" src={feeds.img} alt="Card image cap" />
                    <CardBody>
                        <CardTitle><h2>{feeds.motion}</h2></CardTitle>
                        <CardText className="shadow mt br-20">
                            <ListGroup>
                                <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {feeds.ballotKey.length}</span></ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{feeds.start.split('T')[0]}</Badge></ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{feeds.end.split('T')[0]}</Badge></ListGroupItem>
                            </ListGroup></CardText>
                        <Button color='success' className="shadow" outline block href={"/DumbFeed/" + feeds.electionId}>View Election results</Button>
                    </CardBody>
                    <CardFooter><Badge color="danger" className="shadow" >Past</Badge></CardFooter>
                </Card>
                }
            }
        } else {
            feedlist = "No Elections available";
        }

        return (
            <Container className="mt">
                <Row>
                    <Col md={12}>
                        <Container className="mt">
                            <h2 className="h2c">Current Elections</h2>
                            <CardDeck>
                                {feedlist}
                            </CardDeck>
                        </Container >
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col md={12}>
                        <Container className="mt">
                            <h2 className="h2c">
                                Future elections
                            </h2>
                            <CardDeck>
                                {Ffeedslist}
                            </CardDeck>
                        </Container >
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col md={12}>
                        <Container className="mt">
                            <h2 className="h2c">
                                Past elections
                        </h2>
                            <CardDeck>
                                {Pfeedslist}
                            </CardDeck>
                        </Container >
                    </Col>
                </Row>
            </Container>


        );
    }

}