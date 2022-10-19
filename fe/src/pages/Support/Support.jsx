import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Breadcrumb';
import Image from '../../assets/images/support-illustration.png';

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
            <React.Fragment>
                <Helmet title={"Support - " + process.env.REACT_APP_WEB_NAME} />
                <Breadcrumbs title="Support" />
                <Container fluid={false}>
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="card" style={{height: 'calc(100% - 30px)'}}>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                                    <img style={{width: '10rem', marginBottom: '2rem'}} src={Image} alt="Support Illustration" />
                                    <h4>Got Any Problem?</h4>
                                    <p style={{fontSize: '14px'}}>If you have any problem about the usage of this application, kindly contact us to get the support you need.</p>
                                    <a target="_blank" rel="noopener noreferrer" className="btn btn-primary" href="https://wa.me/6289602653343">Contact Us</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="card" style={{height: 'calc(100% - 30px)'}}>
                                <div className="card-body">
                                    <div className="header-top mb-3">
                                        <h5>Disclaimer</h5>
                                    </div>
                                    <p style={{fontSize: '14px'}}>
                                        This application system is not affiliated with Whatsapp. Whatsapp is a brand registered by Whatsapp Inc. Warranty software that binds to this application system is limited to modules for processing data, received, and send via this application.
                                        <br /><br />
                                        Policies that have been or will be published by Whatsapp Inc. as Whatsapp trademark holders which can cause this application to not work are not part of this warranty service. The policy in question can be related to access to the use of the Whatsapp application, the features of the Whatsapp application, supporting device specifications, and other policies which are the full rights of Whatsapp Inc. as the trademark owner.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
 
export default Support;