import React, { Component } from 'react';

import { PageControl } from '../components/Handler';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NotFound from './NotFound.jsx';

import Dashboard from './Dashboard/Dashboard';

import Sessions from './Sessions/Sessions.jsx';

import ContactGroup from './ContactGroup/ContactGroup.jsx';

import SendMessage from './Messages/SendMessage';
import SendCSV from './Messages/SendCSV';
import Schedule from './Messages/Schedule/Schedule';
import History from './Messages/History/History';
import APIDocs from './Messages/API/APIDocs';

import Chatbot from './Chatbot/Chatbot';

import Support from './Support/Support';
import Diagram from './Diagram/Diagram';
import FormNode from './Node/Form';
import ApiNode from './Node/ApiNode';
import Diagramtest from './Diagram/Diagramtest.js';

class Page extends Component {
    pageSwitch(name) {
        switch (name) {
            case 'dashboard':
                return <Dashboard />

            case 'sessions':
                return <Sessions />

            case 'contact':
                return <ContactGroup />

            case 'message':
                return <SendMessage />
            case 'message/csv':
                return <SendCSV />
            case 'message/schedule':
                return <Schedule />
            case 'message/history':
                return <History />
            case 'message/api':
                return <APIDocs />

            case 'chatbot':
                return <Chatbot />
                case 'diagram/diagramtest':
                return <Diagramtest />
            
            case 'support':
                return <Support />
            case 'diagram':
                return <Diagram />
            case 'node/form':
                return <FormNode />
            case 'node/api':
                return <ApiNode />
            default:
                return <NotFound />
        }
    }

    render() { 
        return (
            <PageControl>
                <div className="page-wrapper compact-wrapper" id="pageWrapper">
                    <Header />
                    <div className="page-body-wrapper sidebar-icon">
                        <Sidebar />
                        <div className="page-body">
                            {this.pageSwitch(this.props.name)}
                        </div>
                    </div>
                </div>
            </PageControl>
        );
    }
}
 
export default Page;