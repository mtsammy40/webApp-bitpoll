import React from 'react';
import {Pie} from 'react-chartjs-2';
import angel from '../api/angel';
import load from '../Images/load.gif';
import {Card, Row, CardTitle, CardBody, Col} from 'reactstrap';
export default class CandidateChart extends React.Component{
    constructor(props){
        super(props);
        this.state ={}
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(){
        angel.get('votesForElection?election='+this.props.election).then(res=>{
            var electionData = res.data;
            this.setState({ electionData });
        }).catch(err=>{
            if(err.status === 404){
                console.log('this election does not exist', this.props.election);
            } else if(err.status === 304){
                this.setState({ electionDataErr: 'No data'});
            }
    });
    }
    componentDidMount(){
        this.fetchData();
    }
    render(){
        if(this.props.refetch){
            this.fetchData();
            this.props.toggleRefetch();
        }
        const MChart = (props)=>{   
            if(this.state.electionData){
                var candidates=[]
                var cdata = this.state.electionData.mChart;
                console.log('ddata labels length', cdata.labels.length);
                for(var i=0; i<cdata.labels.length; i++){
                    // eslint-disable-next-line no-loop-func
                    var candidate = props.candidates.filter(c=>{
                        return c.candidateId === cdata.labels[i]
                    });
                    console.log('props cands', props.candidates);
                    console.log('candidate', candidate);
                candidates.push(candidate[0].name);
                
                }
                console.log('candidateNamesM', candidates);
                cdata.labels = candidates;
                return <div>
                <h3>Male Voters</h3>
                <Pie data={cdata}></Pie>
                </div>
            } else {
                if(this.state.electionDataErr){
                    return <span>this.state.electionDataErr</span>;
                }
                return <p>No gender Data Available</p>;
            }
        }
        const FChart = (props)=>{   
            if(this.state.electionData && props){
                var candidates=[]
                var cdata = this.state.electionData.fChart;
                console.log('chartData ', cdata);
                for(var i=0; i<cdata.labels.length; i++){
                    // eslint-disable-next-line no-loop-func
                    var candidate = props.candidates.filter(c=>{
                        return c.candidateId === cdata.labels[i]
                    });
                candidates.push(candidate[0].name);
                
                }
                cdata.labels = candidates;
                return <div>
                    <h4>Female Voters</h4>
                    <Pie data={cdata}></Pie>
                    </div>
            } else {
                return <p>No gender data available</p>;
            }
        }
        
        return(
            <Card className="mt shadow p-2">
                <CardBody>
                    <CardTitle>
                        <h3>Votes By Gender</h3>
                    </CardTitle>
                    <Row>
                        <Col md={6} sm={12}>
                            <MChart candidates ={this.props.candidates} election={this.props.election}></MChart>
                        </Col>
                        <Col md={6} sm={12}>
                            <FChart candidates ={this.props.candidates} election={this.props.election}></FChart>
                        </Col>
                    </Row>
                </CardBody>
               
            </Card> 
        );
    }
}