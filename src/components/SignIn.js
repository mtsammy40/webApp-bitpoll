import React from 'react';
import {FormGroup, Form, Label, Input, Button} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import '../App.css';
import Api from '../api/api';
export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
        this.githubHandler = this.githubHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    githubHandler(e){
        Api.post('http://localhost:3000/auth/github', { withCredentials: true}).then(data => {
            alert('auth.login', data.data);
        }).catch(error => {
            alert(error.data);
        })
    }
    handleChange(e){
        if(e.target.name=== "type"){
            this.setState({[e.target.name]: e.target.value}); 
        } else {
            this.setState({identity: e.target.value});
        }
      

    }
    componentDidMount(){
        Api.get('org.bitpoll.net.Institution', {withCredentials: true}).then(res=>{
            const Institutions = res.data;
            this.setState({Institutions});
            console.log('mother data', this.state)
          }).catch(e=>{
              console.log('signing fetch error', e);
          });
    }
    render(){
        const Logintb = () =>{
            if(this.state.type === "voter"){
                var voters = this.props.Voters;
                var voterlist = voters.map(v=><option key={v.email} value={v.email}>{v.name}</option>)
                return <Input type="select" name="voter">{voterlist}
                </Input>
            } else if(this.state.type === "institution") {
                var inst = this.state.Institutions;
                if(!inst){
                    return <p>loading...</p>
                } else {
                var instlist = inst.map(i=><option key={i.email} value={i.email}>{i.name}</option>)
                return <Input type="select" name="institution">{instlist}
                </Input>
                }  
            } else {
                return <p>Please select type</p>
            }
        }
        var handleLogin = this.props.handleLogin;
     /*    if(this.props.profile.type && this.props.profile.type==="institution"){
            return <Redirect to="/IDashboard/"></Redirect>
        } else if(this.props.profile.type && this.props.profile.type==="voter"){
            return <Redirect to="/Voter/"></Redirect>
        } */
        return(
            <div className="par-middle">
                <div className="align-center middle">
                <div className="d-flex justify-content-center">
                    <Form>
                        <FormGroup>
                            <Label for="lgemailtb">Account</Label>
                            <Input type="select" name="type" id="lgemailtb" placeholder="" onChange={this.handleChange} required>
                                <option value="">Please Select type</option>
                                <option value="voter">Voter</option>
                                <option value="institution">Institution</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lgemailtb">Identity</Label>
                            <Logintb></Logintb>
                        </FormGroup>
                        <Button onClick={()=>handleLogin(this.state.type, this.state.identity)} className="btn btn-success" > Log In</Button>
                    </Form>
                </div>
                <div>
                    <a className="btn btn-primary" href="http://localhost:3000/auth/github" >Log In with Github</a>
                </div>
                <div className="d-flex justify-content-center">
                    Bits and Bytes Co.
                </div>
                </div>
                
            </div>
        );
    }
}