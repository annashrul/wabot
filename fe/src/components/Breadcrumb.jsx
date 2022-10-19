import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Home } from 'react-feather';
import { Link } from 'react-router-dom'

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        return (
            <Container fluid={false}>
                <div className="page-title">
                    <Row>
                        <Col md="6" className="mb-3 mb-md-0 text-center text-md-left">
                            <h3>{this.props.title}</h3>
                        </Col>
                        <Col md="6" className="mb-2 mb-md-0 d-flex justify-content-center justify-content-md-end">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/"><Home /></Link></BreadcrumbItem>
                                {
                                    (this.props.parent)
                                        ? <BreadcrumbItem>{this.props.parent}</BreadcrumbItem>
                                        : ""
                                }
                                <BreadcrumbItem active>{this.props.title}</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}
 
export default Breadcrumbs;