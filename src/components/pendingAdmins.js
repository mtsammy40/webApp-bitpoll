import React from 'react';
import { Table, Row, Col, Card, CardTitle, Button, CardBody, Container} from 'reactstrap';
import Api from '../api/api';
import angel from '../api/angel';

export default class PendingAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
        this.Approve = this.Approve.bind(this);
        this.fetchPAdmins = this.fetchPAdmins.bind(this);
    }
    fetchPAdmins(){
        angel.get('AllPendingAdmins/').then(res=>{
            var pendingAdmins = res.data;
            this.setState({ pendingAdmins });
            console.log('response angelia', this.state.pendingAdmins)
        }).catch(e=>{
            console.log('No P Admins', e.response);
        });
    }
    Approve(approved){
        delete approved._id;
        delete approved._v;
        delete approved.approved;
        Api.post('org.bitpoll.net.Admin', approved, {withCredentials: true}).then(res=>{
            var oldpendingAdmins = this.state.pendingAdmins;
            var pendingAdmins = oldpendingAdmins.filter((p, i, ar)=>{
                return p.id !== approved.id;
            });
            this.setState({ pendingAdmins });
            return approved;
        }).then((approved)=>{
            var issuee = {
                participant: 'resource:org.bitpoll.net.Admin#'+ approved.id,
                userID: approved.id,
                options: {"issuer" : true}
            }
            Api.post('system/identities/issue', issuee, {withCredentials: true, responseType: 'blob'}).then((res)=>{
                console.log('my file', res);
                var data = new FormData();
               data.append('name', approved.name);
               data.append('id', approved.id);
               data.append('email', approved.email);
               data.append('data', res.data);
                angel.post('sendIdentity/', data)
                .then(res=>{
                    console.log('apprroved id deep ', approved.id)
                    angel.post('approveAdmin/', {id: approved.id}).then((res)=>{
                        alert("email sent and \n" + res.response);
                    }).catch(e=>{
                        console.log('alar email', e);
                    });
                }).catch(e=>{
                    console.log('email failed', e);
                });
            }).catch(e=>{
                console.log('error issuing', e.response);
            });
        }).catch(e=>{
            console.log('No P Admins', e.responseText);
        });
    }
    componentDidMount(){
        this.fetchPAdmins();
    }
    render(){
        const DisplayPAdmins = ()=>{
            if(!this.state.pendingAdmins){
                return <p> There's nothing to see here! </p>
            } else {
                 let list = this.state.pendingAdmins.map(p=>
                 <tr key={p._id}><td>{p.name}</td><td>{p.id}</td><td>{p.email}</td><td><Button onClick={(e)=>{this.Approve(p)}}>Approve</Button></td></tr>
                 );
                return <Table>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Approve</th>
                    </tr>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            }
        }
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <Card className="shadow mt">
                            <CardBody>
                                <DisplayPAdmins></DisplayPAdmins>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}