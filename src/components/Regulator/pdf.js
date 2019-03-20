import React, {Component, PropTypes}from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Container, Row, Col, Button} from 'reactstrap';

export default class PdfView extends Component{
    constructor(props){
        super(props);
        this.state ={}
    }
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        }
    render(){
        return(
          <Container fluid style={{overflowX: 'scroll'}}>
            <span className="d-flex justify-content-center">
            <Button color="primary" outline block onClick={this.printDocument}>Print</Button>
            </span>
            <Container id="divToPrint" className="mt4" style={{backgroundColor: '#f5f5f5',
            width: '210mm',
            minHeight: '297mm',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding : '40px'}}
              >
                <Row>
                    <Col sm={12}>
                        <span className="d-flex justify-content-center"><h1>Bitpoll Statistics Report</h1></span>
                    </Col>
                </Row>
                <Row >
                  <Col sm={12}>
                  {this.props.children}
                  </Col>
                </Row>
              </Container>
          </Container>
            
        )
    }
}