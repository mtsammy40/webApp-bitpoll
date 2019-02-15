import React from 'react';
import { Pie } from 'react-chartjs-2';

export default class ResultsPie extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div className="ResultsBar">
                <Pie data={this.props.data} options={this.props.options} redraw>
                </Pie>
            </div>
        );
    }
}