import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Media } from 'reactstrap';
import sad from '../assets/images/other-images/sad.png';

class NotFound extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <Helmet title={process.env.REACT_APP_WEB_NAME} />
                <div className="page-wrapper">
                    <div className="error-wrapper">
                        <Container>
                            <Media body className="img-100" src={sad} alt="" />
                            <div className="error-heading pt-sm-3 my-2">
                                <h3 className="headline font-danger mt-0" style={{fontSize: "4rem"}}>Under Maintenance</h3>
                            </div>
                            <Col md="8 offset-md-2">
                                <p className="sub-content mt-4">{"The page you are attempting to reach is currently under maintenance"}</p>
                            </Col>
                            <Link to="/"><Button color="danger" size='lg'>Back to Home</Button></Link>
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default NotFound;