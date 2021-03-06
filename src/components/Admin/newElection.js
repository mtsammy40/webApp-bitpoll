import React from 'react';
import {Container, Input, Label, FormGroup, Row, Col} from 'reactstrap';
import Api from '../../api/api';
import Moment from 'moment';
export default class NewElection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            candidateNames:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleChange(e){
        if(e.target.name=== "img"){
            this.setState({[e.target.name] : URL.createObjectURL(e.target.files[0])});
            console.log('img' + this.state.img);
          }  else {
            this.setState({[e.target.name] : e.target.value});
          }
    }
    handleBlur(e){
        // want a multidimensional array? https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
        var candidateNames = [];
        var categories = [];
        for(var i=1; i<=this.state.cand_no; i++){
            var name = document.getElementById("cand_name_"+i).value;
            var category = document.getElementById("cand_cat_"+i).value;
            candidateNames.push(name);
            categories.push(category);
        }
        this.setState({ candidateNames });
        this.setState({ categories });
    }
    handleSubmit(e){

        e.preventDefault();
        /* var candidateNames = [];
        for(var i=1; i<=this.state.cand_no; i++){
            var name = document.getElementById("cand_name_"+i).value;
            candidateNames.push(name);
        }
        console.log('Namessss', candidateNames);
        this.setState({ candidateNames });
        console.log('Namessss2', this.state); */
        delete this.state.cand_no;
        var admin = document.getElementsByName('admin').value;
        this.setState({ admin });
        console.log('state', this.state);
        Api.post('org.bitpoll.net.CreateElection', this.state, { withCredentials: true}).then(res => {
            alert('successfully set: '+ res.data.motion);
            this.props.fetchElections();
            return res.data;
        }).catch(error=> {
            console.log('error', error)
            if(error.response.code){
                alert('connection lost, Please check your internet connection');
            } else {
                alert(error.response.code + 'Please recheck your data and retry');
            } 
        });
    }
    componentWillMount(){
        if(this.props.profile){
            var admin = this.props.profile.id;
            this.setState({ admin });
        }
    }
    componentWillReceiveProps(nextProp){
        if(this.props.profile !== nextProp.profile){
            console.log('profssss', nextProp.profile);
            var admin = "resource:"+nextProp.profile.$class+"#"+nextProp.profile.id;
            this.setState({ admin });
        }
    }

    render(){ 
        console.log('prop='+this.props.profile.id, this.state.admin);
            var tb = [];
            for (var i = 1; i<=this.state.cand_no; i++){   
                tb.push(i);
            }
            var admin;
            if(this.props.profile){
                admin= "resource:"+this.props.profile.$class+"#"+this.props.profile.id;
            } else {
                admin = "...Loading";
            }
            if(!tb){
                const ListItem = <p>No record</p>
            }
            const ListItem = tb.map( (t) =>  
            <FormGroup key={t.toString()} >
                <Label>Candidate {t.toString()} </Label>
                <Input type="text" name="cand_name" id={'cand_name_'+t} dot={t.toString()} placeholder="Candidate Name" onBlur={this.handleBlur} required/>
                <Label>Category for candidate {t.toString()} </Label>
                <Input type="text" name="cand_cat" id={'cand_cat_'+t} dot={t.toString()} placeholder="Candidate Name" onBlur={this.handleBlur} required/>
            </FormGroup>
            );
            const minDate = new Date(Date.now());
        return(
            <Container>
                <form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Label for="motiontb">Motion</Label>
                        <Input type="text" placeholder="Input motion" name="motion" id="motiontb" onChange={this.handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="desctb">Admin</Label>
                        <Input type="text" className="form-control" value={this.state.admin} name="admin" disabled/>
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="starttb">Start Date</Label>
                                <Input type="date" placeholder="The start date of the election" name="start" id="starttb" min={Moment().format('YYYY-MM-DD')}  onChange={this.handleChange} required/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="endb">End Date</Label>
                                <Input type="date" placeholder="The end date of the election" name="end" id="endtb" min={this.state.start} onChange={this.handleChange} required/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                            <Label id="cand_notb">No. of Candidates</Label>
                            <Input type="number" name="cand_no" id="cand_notb" min={2} placeholder="No. of Candidates" onChange={this.handleChange} required />
                        </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup>
                                <Label>Number of Ballots</Label>
                                <Input type="number" name="ballotNo" placeholder="No. of Ballots" min={3} onChange={this.handleChange} required />
                            </FormGroup>
                        </Col>
                    </Row>
                        {ListItem}
                    <Input type="submit" value="Create Election" className="btn btn-success" />
                </form>
            </Container>
        );
    }
}  