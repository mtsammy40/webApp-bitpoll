import React from 'react';
import { Table, Row, Col, Card, CardTitle, Button, CardBody, Container} from 'reactstrap';
import Api from '../../api/api';
import angel from '../../api/angel';

export default class PendingAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pendingAdmins: this.props.pendingAdmins
        }
        this.Approve = this.Approve.bind(this);
    }
    Approve(approved){
        delete approved._id;
        delete approved._v;
        delete approved.approved;
        Api.post('org.bitpoll.net.Admin', approved, {withCredentials: true}).then(res=>{
            this.props.updatePAdmins();
            return approved;
        }).then((approved)=>{
            var issuee = {
                participant: 'resource:org.bitpoll.net.Admin#'+ approved.id,
                userID: approved.name,
                options: {"issuer" : true}
            };
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
                        alert("An email has  sent to the Admin: \n"+approved.name);
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
    render(){
        const DisplayPAdmins = ()=>{
            if(!this.props.pendingAdmins){
                return <p className="text-center text-primary"> Currently, there are no Pending Admin applications! </p>
            } else {
                 let list = this.props.pendingAdmins.map(p=>
                 <tr key={p._id}><td>{p.name}</td><td>{p.id}</td><td>{p.email}</td><td><Button onClick={(e)=>{this.Approve(p)}}>Approve</Button></td></tr>
                 );
                return <Table responsive>
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
                                <CardTitle><h2>Pending Admins</h2></CardTitle>
                                <DisplayPAdmins></DisplayPAdmins>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}