import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Scrollspy from 'react-scrollspy';
import './LandingPage.scss';
import HeroImage from '../../assets/images/landing-page/hero-image.png';
import SectionBG from '../../assets/images/landing-page/section-bg.svg';
import ChatbotImage from '../../assets/images/landing-page/chatbot-image.png';
import HowItWorksImage from '../../assets/images/landing-page/howitworks-image.png';
import { AlignLeft, ArrowUpCircle, Calendar, Clock, Globe, Image, Repeat, Send, Server, Tablet, Upload } from 'react-feather';
import { Helmet } from 'react-helmet';

class LandingPage extends Component {
    state = {  }

    componentDidMount() {
       $(window).scroll(function(){
            if ($(window).scrollTop() >= 30) {
                $('#lp-nav').addClass('lp-shadow');
            }
            else {
                $('#lp-nav').removeClass('lp-shadow');
            }
        });
    }

    render() { 
        return (
            <React.Fragment>
                <Helmet title={process.env.REACT_APP_WEB_NAME} />
                <div id="lp-nav">
                    <div className="lp-container">
                        <nav className="d-flex align-items-center justify-content-between">
                            <Link className="lp-brand" to="/">{process.env.REACT_APP_WEB_NAME}</Link>
                            <Scrollspy className="d-flex align-items-center" offset={-200} items={['hero', 'feature', 'chatbot', 'howitworks', 'getstarted']} currentClassName="active">
                                <li>
                                    <a href="#hero">Home</a>
                                </li>
                                <li>
                                    <a href="#feature">Features</a>
                                </li>
                                <li>
                                    <a href="#chatbot">Chatbot</a>
                                </li>
                                <li>
                                    <a href="#howitworks">How It Works</a>
                                </li>
                                <li>
                                    <a href="#getstarted">Contact</a>
                                </li>
                                <li>
                                    <Link to="/login" className="btn btn-primary text-white px-4">Login</Link>
                                </li>
                            </Scrollspy>
                        </nav>
                    </div>
                </div>
                <section id="hero" className="lp-section">
                    <div className="lp-container">
                        <div className="row d-flex align-items-center">
                            <div className="lp-hero-text col-md-6 order-2 order-md-1">
                                <h1 className="lp-hero-title">Reach More Potential Customer with {process.env.REACT_APP_WEB_NAME}</h1>
                                <div className="lp-hero-subtitle">{process.env.REACT_APP_WEB_NAME} is Whatsapp API gateway service for manage your broadcasting plan by sending and receiving messages, notification, broadcast scheduler, and tracking with simple touch of integration with your whatsapp account.</div>
                                <Link className="btn btn-primary text-white" to="/register">Register Now</Link>
                            </div>
                            <div className="col-md-6 order-1 order-md-2 d-flex justify-content-end align-items-center">
                                <img src={HeroImage} alt="hero-illustration" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="feature" className="lp-section">
                    <div className="lp-container">
                        <div className="row">
                            <div className="col-12 mb-5 text-center">
                                <div className="lp-pre-subtitle">FEATURE</div>
                                <h2 className="lp-title">Broadcast Message</h2>
                                <div className="lp-subtitle">Reach Your Potential Customer with Our Broadcast Message Feature</div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-none">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="feature-icon">
                                            <Send />
                                        </div>
                                        <h3 className="feature-title">Broadcast Message</h3>
                                        <div className="feature-subtitle">Send message to contact, group, or broadcast list you created</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-none">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="feature-icon">
                                            <Clock />
                                        </div>
                                        <h3 className="feature-title">Schedule Message</h3>
                                        <div className="feature-subtitle">Set schedule to send your message at specific date and time</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-none">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="feature-icon">
                                            <Calendar />
                                        </div>
                                        <h3 className="feature-title">Recurring Message</h3>
                                        <div className="feature-subtitle">Repeatedly send your message at specific date, week, or even days</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-none">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="feature-icon">
                                            <Tablet />
                                        </div>
                                        <h3 className="feature-title">Multiple Device</h3>
                                        <div className="feature-subtitle">Manage and add up to 3 devices, for you to use and switch between</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-none">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="feature-icon">
                                            <Upload />
                                        </div>
                                        <h3 className="feature-title">Import & Export Contact</h3>
                                        <div className="feature-subtitle">Export your device contact and import several contact using CSV file</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-none">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="feature-icon">
                                            <Repeat />
                                        </div>
                                        <h3 className="feature-title">Sync Information</h3>
                                        <div className="feature-subtitle">Show your device contact, group, and broadcast list in real time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="chatbot" className="lp-section">
                    <div className="lp-container">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-5">
                                <div className="lp-pre-subtitle">COMING SOON</div>
                                <h2 className="lp-title">Whatsapp Chatbot</h2>
                                <div className="lp-subtitle mb-3">Make your own whatsapp chatbot without any coding skill required, as simple as drag and drop</div>
                                <ul className="d-inline-block">
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            <AlignLeft size={18}/>
                                        </div>
                                        <div className="box-text">Text Response</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            <Image size={18}/>
                                        </div>
                                        <div className="box-text">Multimedia Response</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            <Server size={18}/>
                                        </div>
                                        <div className="box-text">E-Form Response</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            <Globe size={18}/>
                                        </div>
                                        <div className="box-text">Webhook/API Response</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-7 pl-0 pl-md-5">
                                <img className="pl-0 pl-md-5" src={ChatbotImage} alt="" />
                            </div>
                        </div>
                        <img src={SectionBG} alt="Section BG" className="lp-section-bg" />
                    </div>
                </section>
                <section id="howitworks" className="lp-section">
                    <div className="lp-container">
                        <div className="row d-flex aligh-items-center">
                            <div className="col-md-7 order-2 order-md-1">
                                <img src={HowItWorksImage} alt="How It Works Illustration"/>
                            </div>
                            <div className="col-md-5 order-1 order-md-2">
                                <div className="lp-pre-subtitle">EXPLORE</div>
                                <h2 className="lp-title">How It Works</h2>
                                <div className="lp-subtitle mb-3">To send a message and make your own chatbot, you only need to register an account and do these steps</div>
                                <ul className="d-inline-block">
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            1
                                        </div>
                                        <div className="box-text">Add Your Device</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            2
                                        </div>
                                        <div className="box-text">Scan QR Code to Connect</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            3
                                        </div>
                                        <div className="box-text">Send Your Message</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="box-icon">
                                            4
                                        </div>
                                        <div className="box-text">Make Your Own Chatbot</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img src={SectionBG} alt="Section BG" className="lp-section-bg" />
                    </div>
                </section>
                <section id="getstarted" className="lp-section">
                    <div className="lp-container">
                        <div className="lp-started-box">
                            <div className="row">
                                <div className="lp-getstarted col-12 d-flex flex-column align-items-center">
                                    <h2>Ready to Get Started?</h2>
                                    <div>Try Our Feature and Reach More Potential Customer</div>
                                    <Link to="/register" className="btn">
                                        Register Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="contact" className="lp-section">
                    <div className="lp-container d-flex justify-content-end align-items-center">
                        <div className="lp-brand">{process.env.REACT_APP_WEB_NAME}</div>
                        <div className="lp-subbrand">Contact Support</div>
                        <a className="lp-brand-url" href="https://wa.me/6282299097848" target="_blank" rel="noopener noreferrer" >(+62) 822 9909 7848</a>
                        <a className="lp-brand-url" href="mailto:halo@remoteworks.id" target="_blank" rel="noopener noreferrer" >halo@remoteworks.id</a>
                        <a className="d-flex justify-content-end align-items-center" href="#hero"><ArrowUpCircle className="lp-up" size={36} /></a>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
 
export default LandingPage;