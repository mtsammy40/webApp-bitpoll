import React from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, CardFooter, Container, Badge, ListGroup, ListGroupItem,
    Row, Col
} from 'reactstrap';
import Api from '../../api/api';

export default class Feed extends React.Component {
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
        if (this.state.elections.length !== 0 && this.props.profile) {
            console.log('elections feed', this.state.elections);
            console.log('profile feed', this.props.profile)
            //check if election is mine (my intitution)
            let feeds = this.state.elections.filter(e => {
                return e.institution === this.props.profile.institution;
            });
            console.log('all my elections', feeds);

            if (!feeds) {
                feedlist = "No elections available";
                histlist = "You do not have past elections";
                futurelist = "You do not have scheduled elections";
                Ffeeds = "You have no scheduled elections";

            } else if (feeds.length > 0) { //if it is an array, found more than one election
                //get future elections
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




                //Check for active elections
                if (this.props.profile.hist) {
                    var feedsUnvoted = feeds.find(e => {
                        return !this.props.profile.hist.includes('org.bitpoll.net.Election#' + e.electionId);
                    });
                    var today = new Date();
                    var yesterday = new Date();
                    today.setHours(0, 0, 0, 0);
                    yesterday.setDate(today.getDate() - 1);

                } else {
                    var feedsUnvoted = feeds;
                }
                console.log('all my elections, that i havent voted on', feedsUnvoted);

                //Untested
                //Future and Past elections

                if (!feedsUnvoted) {
                    feedlist = 'no current elections available';
                } else if (feedsUnvoted.length > 1) {
                    var today = new Date();
                    var yesterday = new Date();
                    today.setHours(0, 0, 0, 0);
                    yesterday.setDate(today.getDate() - 1);

                    var activeElecs = feedsUnvoted.filter(ae => {
                        var start = new Date(ae.start);
                        start.setHours(0, 0, 0, 0);
                        var end = new Date(ae.end);
                        end.setHours(0, 0, 0, 0);
                        return start <= today && end >= today;
                    });

                    console.log('all my elections, havent voted on, fit time const', activeElecs);
                    if (!activeElecs) {
                        feedlist = "no elections available";
                    } else if (activeElecs.length > 0) {
                        feedlist = activeElecs.map((feed) =>
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
                                    <Button color='primary' className="shadow" outline block href={"/vote/" + feed.electionId}>Go to election</Button>
                                </CardBody>
                                <CardFooter><Badge color="success" className="shadow" >Ongoing</Badge></CardFooter>
                            </Card>
                        );
                    }
                } else {
                    today = new Date();
                    yesterday = new Date();
                    today.setHours(0, 0, 0, 0);
                    yesterday.setDate(today.getDate() - 1);
                    var start = new Date(feedsUnvoted.start);
                    var end = new Date(feedsUnvoted.end);
                    if (start > yesterday && end >= today) {
                        feedlist = <Card key={feedsUnvoted.electionId} className="shadow mt">
                            <CardImg top width="100%" src={feedsUnvoted.img} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><h2>{feedsUnvoted.motion}</h2></CardTitle>
                                <CardText className="shadow mt br-20">
                                    <ListGroup>
                                        <ListGroupItem><span className="d-flex justify-content-between"><span>Valid voters:</span> {feedsUnvoted.ballotKey.length}</span></ListGroupItem>
                                        <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">Start Date:</span> <Badge pill>{feedsUnvoted.start.split('T')[0]}</Badge></ListGroupItem>
                                        <ListGroupItem className="d-flex justify-content-between"><span className="d-flex justify-content-between">End Date: </span> <Badge pill>{feedsUnvoted.end.split('T')[0]}</Badge></ListGroupItem>
                                    </ListGroup></CardText>
                                <Button color='success' className="shadow" outline block href={"/DumbFeed/" + feedsUnvoted.electionId}>View Election results</Button>
                                <Button color='primary' className="shadow" outline block href={"/vote/" + feedsUnvoted.electionId}>Go to election</Button>
                            </CardBody>
                            <CardFooter><Badge color="success" className="shadow" >Ongoing</Badge></CardFooter>
                        </Card>
                    }
                }
            } else {
                //Get future votes
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
                if (this.props.profile.hist && this.props.profile.hist.indexOf('resource:org.bitpoll.net.Election#' + feeds.id > -1)) {
                    feedlist = 'No elections available';
                } else {
                    //check if it is active (date is valid)
                    console.log('checking active...');
                    today = new Date();
                    yesterday = new Date();
                    var tomorrow = new Date();
                    today.setHours(0, 0, 0, 0);
                    yesterday.setDate(today.getDate() - 1);
                    tomorrow.setDate(today.getDate() + 1);
                    start = new Date(feeds.start);
                    end = new Date(feeds.end);



                    if (start < tomorrow && end >= today) {
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
                                <Button color='primary' className="shadow" outline block href={"/vote/" + feeds.electionId}>Go to election</Button>
                            </CardBody>
                            <CardFooter><Badge color="success" className="shadow" >Ongoing</Badge></CardFooter>
                        </Card>
                    } else {
                        feedlist = "No current elections available";
                    }
                }
                /* var feedsUnvoted = feeds.find(e=>{
                    return !this.props.profile.hist.includes('org.bitpoll.net.Election#'+e.electionId);
                }) */

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