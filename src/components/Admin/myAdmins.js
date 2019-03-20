import React from 'react';
import {Container, Modal, ModalBody, ModalFooter, ModalHeader, Table, Button, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import load from '../../Images/load.gif';
import $ from 'jquery';
$.DataTable = require('datatables.net');
export default class MyAdmins extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            DeleteModal : false,
        }
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.onDeletee = this.onDeletee.bind(this);
        this.onSort = this.onSort.bind(this);
    }
    toggleDeleteModal(){
        this.setState(prevState => ({
            DeleteModal: !prevState.DeleteModal
          }));
      }
    onDeletee(id){
        let Deletee = this.props.Admins.filter(a=>{
            return a.id === id
        });
        let Deleteed = Deletee[0];
        this.setState({ Deleteed });
        this.toggleDeleteModal();
    }
    onSort(event, sortKey){
        /*
        assuming your data is something like
        [
          {accountname:'foo', negotiatedcontractvalue:'bar'},
          {accountname:'monkey', negotiatedcontractvalue:'spank'},
          {accountname:'chicken', negotiatedcontractvalue:'dance'},
        ]
        */
        const Admins = this.state.Admins;
        Admins.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({Admins})
      }
    componentDidMount(){
        var Admins = this.props.Admins;
        this.setState({Admins});
        console.log('admins.. oyaaa', Admins);
        }
    render(){
      
        const DModal = (props)=>{
            if(!this.state.Deleteed){
              return <Modal isOpen={this.state.DeleteModal} toggle={this.toggleDeleteModal} className={this.props.className}>
            <ModalHeader toggle={this.toggleDeleteModal}>Delete Confirmation</ModalHeader>
            <ModalBody>
               <img src={load} alt="..loading"></img>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
            } else {
                 return <Modal isOpen={this.state.DeleteModal} toggle={this.toggleDeleteModal} className={this.props.className}>
                 <ModalHeader toggle={this.toggleDeleteModal}>Delete Confirmation</ModalHeader>
                 <ModalBody>
                    <Container className="shadow mt p-2">
                    
                     <ListGroup>
                        <ListGroupItemHeading>Are you sure you want to delete <span className="text-secondary text-strong">{this.state.Deleteed.name}</span>?</ListGroupItemHeading>
                         <ListGroupItem>Email: {this.state.Deleteed.email} </ListGroupItem>
                         <ListGroupItem>Id : {this.state.Deleteed.id}</ListGroupItem>
                         <ListGroupItem>Nationality : {this.state.Deleteed.nationality} </ListGroupItem>
                     </ListGroup>
                    </Container>
                 </ModalBody>
                 <ModalFooter>
                     <Button outline color="danger" onClick={e=>{this.props.onDelete(this.state.Deleteed.id); this.toggleDeleteModal();}}>Delete</Button>
                     <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                 </ModalFooter>
                 </Modal>
            }
            
        }
        const AdminsTable = ()=>{
            if(!this.props.Admins){
                return <tr><td>Loading Admins...</td></tr>
            } else {
                var Adminslist = this.state.Admins.map(v =>       
                    <tr key={v.id}><td>{v.email}</td><td>{v.name}</td><td>{v.nationality}</td><td>{v.gender}</td><td className={this.props.showControls}><div>
                        <Button outline color="danger" onClick={e=>this.onDeletee(v.id)}>Remove</Button>
                   
                </div></td></tr>
                );
                return <Container>
                    <Table responsive ref={el => this.el = el}>
                    <tr>
                        <th>Email</th>
                        <th onClick={e=> this.onSort(e, 'name')}>Name</th>
                        <th>Nationality</th>
                        <th>gender</th>
                        <th className={this.props.showControls}>Remove</th>
                    </tr>
                        <tbody>{Adminslist}</tbody>
                    </Table>
                    <DModal></DModal>
                </Container>
                ;
                
            }

        }
       var adminlist = this.state.Admins;
        return(
            <Container>
                <AdminsTable Admins={this.props.Admins}></AdminsTable>
                <Table responsive>
                <tr>
                        <th>Email</th>
                        <th onClick={e=> this.onSort(e, 'name')}>Name</th>
                        <th>Nationality</th>
                        <th>gender</th>
                        <th className={this.props.showControls}>Remove</th>
                    </tr>
                    <tbody>
                        {adminlist.map(v =>       
                    <tr key={v.id}><td>{v.email}</td><td>{v.name}</td><td>{v.nationality}</td><td>{v.gender}</td><td className={this.props.showControls}><div>
                        <Button outline color="danger" onClick={e=>this.onDeletee(v.id)}>Remove</Button>
                   
                </div></td></tr>
                )}
                    </tbody>
                </Table>
            </Container>
        );
    }
   
}