import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Phone, Send, Users } from 'react-feather';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import CoreAPI from '../../api/Core.jsx';
import Breadcrumbs from '../../components/Breadcrumb.jsx';
import { RootContext } from '../../Context.js';
import Broadcast from './Broadcast/Broadcast.jsx';
import Category from './Category/Category.jsx';
import Style from './ContactGroup.module.scss';
import Device from './Device/Device.jsx';
import Group from './Group/Group.jsx';
import Web from './Web/Web.jsx';

class ContactGroup extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            tab: localStorage.getItem('contact-tab') ? parseInt(localStorage.getItem('contact-tab')) : 0,
            total: {
                contact: 0,
                group: 0,
                category: 0,
                broadcast: 0
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.fetchNow = this.fetchNow.bind(this);
    }

    handleChange(event) {
        this.setState({
            tab: parseInt(event.currentTarget.getAttribute('value'))
        });
        localStorage.setItem('contact-tab', parseInt(event.currentTarget.getAttribute('value')));
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            CoreAPI.getTotal().then((result) => {
                let total = this.state.total;

                if(result.status === 200) {
                    total.contact = result.data['Contact WA'] + result.data['Contact Web'];
                    total.group = result.data['Group WA'];
                    total.category = result.data['Category Web'];
                    total.broadcast = result.data['Broadcast List WA'];
                }

                this.setState({
                    isLoading: false,
                    total
                })
            })
        })
    }

    componentDidMount() {
        if(!localStorage.getItem('contact-tab')) {
            localStorage.setItem('contact-tab', this.state.tab);
        }
        this.fetchNow();
    }

    render() { 
        return (
            <React.Fragment>
                <Helmet title={"Contact and Group - " + process.env.REACT_APP_WEB_NAME} />
                <Breadcrumbs title="Contact and Group"/>
                <Container fluid={false}>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card o-hidden">
                                <div className="bg-secondary b-r-4 card-body p-4">
                                    <div className="media static-top-widget py-2">
                                        <div className="align-self-center text-center"><Phone /></div>
                                        <div className="media-body pl-4"><span className="m-0">Contact</span>
                                            <h4 className="mb-0 counter"><CountUp end={this.state.total.contact || 0} /></h4><Phone className="icon-bg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card o-hidden">
                                <div className="bg-primary b-r-4 card-body p-4">
                                    <div className="media static-top-widget py-2">
                                        <div className="align-self-center text-center"><Users /></div>
                                        <div className="media-body pl-4"><span className="m-0">WA Group</span>
                                            <h4 className="mb-0 counter"><CountUp end={this.state.total.group || 0} /></h4><Users className="icon-bg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card o-hidden">
                                <div className="bg-primary b-r-4 card-body p-4">
                                    <div className="media static-top-widget py-2">
                                        <div className="align-self-center text-center"><Users /></div>
                                        <div className="media-body pl-4"><span className="m-0">Category</span>
                                            <h4 className="mb-0 counter"><CountUp end={this.state.total.category || 0} /></h4><Users className="icon-bg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card o-hidden">
                                <div className="bg-primary b-r-4 card-body p-4">
                                    <div className="media static-top-widget py-2">
                                        <div className="align-self-center text-center"><Send /></div>
                                        <div className="media-body pl-4"><span className="m-0">Broadcast List</span>
                                            <h4 className="mb-0 counter"><CountUp end={this.state.total.broadcast || 0} /></h4><Send className="icon-bg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className={`${Style.tabcard}`}>
                                <ul className="d-flex">
                                    <li className={this.state.tab === 0 ? Style.active : ""} onClick={this.handleChange} value="0">Web Contact</li>
                                    <li className={this.state.tab === 1 ? Style.active : ""} onClick={this.handleChange} value="1">Category</li>
                                    <li className={this.state.tab === 2 ? Style.active : ""} onClick={this.handleChange} value="2">Whatsapp Contact</li>
                                    <li className={this.state.tab === 3 ? Style.active : ""} onClick={this.handleChange} value="3">Whatsapp Group</li>
                                    <li className={this.state.tab === 4 ? Style.active : ""} onClick={this.handleChange} value="4">Whatsapp Broadcast List</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    { this.state.tab === 0 ? <Web fetchTotal={this.fetchNow} /> : "" }
                    { this.state.tab === 1 ? <Category fetchTotal={this.fetchNow} /> : "" }
                    { this.state.tab === 2 ? <Device fetchTotal={this.fetchNow} /> : "" }
                    { this.state.tab === 3 ? <Group fetchTotal={this.fetchNow} /> : "" }
                    { this.state.tab === 4 ? <Broadcast fetchTotal={this.fetchNow} /> : "" }
                </Container>
            </React.Fragment>
        );
    }
}
 
export default ContactGroup;