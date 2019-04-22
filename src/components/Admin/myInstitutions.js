import React from 'react';
import {Container, Modal, ModalBody, ModalFooter, ModalHeader, Table, Button, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import load from '../../Images/load.gif';
var DataTable = require('react-data-components').DataTable;

export default class MyInstitutions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            DeleteModal : false,
        }
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.onDeletee = this.onDeletee.bind(this);
    }
    toggleDeleteModal(){
        this.setState(prevState => ({
            DeleteModal: !prevState.DeleteModal
          }));
      }
    onDeletee(id){
        let Deletee = this.props.Institutions.filter(a=>{
            return a.id === id
        });
        let Deleteed = Deletee[0];
        this.setState({ Deleteed });
        this.toggleDeleteModal();
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
                        <ListGroupItemHeading>Are you sure you want to delete <span className=" text-strong">{this.state.Deleteed.name}</span>?</ListGroupItemHeading>
                         <ListGroupItem>Email: {this.state.Deleteed.email} </ListGroupItem>
                         <ListGroupItem>Id : {this.state.Deleteed.id}</ListGroupItem>
                     </ListGroup>
                    </Container>
                 </ModalBody>
                 <ModalFooter>
                     <Button outline color="danger" onClick={e=>{this.props.onDeleteInst(this.state.Deleteed.id); alert('Successfully Deleted'); this.toggleDeleteModal();}}>Delete</Button>
                     <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                 </ModalFooter>
                 </Modal>
            }
           
        }
        const InstitutionsTable = ()=>{
            if(!this.props.Institutions){
                return <tr><td>Loading Institutions...</td></tr>
            } else {
                var InstitutionsList = this.props.Institutions.map(v =>       
                    <tr key={v.id}><td>{v.id}</td><td>{v.name}</td><td>{v.email}</td><td className={this.props.showControls}>
                     <Button outline color="danger" onClick={e=>this.onDeletee(v.id)}>Remove</Button>
                </td></tr>
                );
                return <Container>
                    <Table responsive>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th className={this.props.showControls}>Remove</th>
                    </tr>
                        <tbody>{InstitutionsList}</tbody>
                    </Table>
                    <DModal></DModal>
                </Container>
                ;
            }
        }
        return(
            <Container>
                <InstitutionsTable Admins={this.props.Admins}></InstitutionsTable>
                
            </Container>
        );
    }
   
}