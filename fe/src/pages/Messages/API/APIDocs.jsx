import React, { Component } from 'react';
import { Copy, Paperclip } from 'react-feather';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Breadcrumbs from '../../../components/Breadcrumb';
import Loading from '../../../components/loading/Loading';
import AuthAPI from '../../../api/Auth';

const sendText = {
    header: 
`{
  Authorization: "Bearer {API Key}",
  Content-Type: "application/json"
}`,
    body: 
`{
  "phone": "08987406469",
  "message": "Hello",
  "recipient": {
    "contact": [
      "08776765432"
    ]
  },
  "total": 0,
  "time": {
    "recurrent": "EVERYDAY",
    "time": "2021-09-20 18:00",
    "limit": "2021-09-20 18:00",
    "days": [
      0
    ]
  }
}`,
    response: {
        success: 
`{
  "status": 200,
  "message": "The Message Will be Process",
  "data": {}
}`,
        error:
`{
  "status": 400,
  "message": "Sending Message Failed",
  "data": {}
}`
    }
}

const sendMedia = {
    header: 
`{
  Authorization: "Bearer {API Key}"
}`,
    response: {
        success: 
`{
  "status": 200,
  "message": "The Message Will be Process",
  "data": {}
}`,
        error:
`{
  "status": 400,
  "message": "Sending Message Failed",
  "data": {}
}`
    }
}

class APIDocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            token: ''
        }

        this.copied = this.copied.bind(this);
        this.fetchNow = this.fetchNow.bind(this);
    }

    copied(target) {
        document.getElementById(target).classList.toggle('show');

        setTimeout(() => {
            document.getElementById(target).classList.toggle('show');
        }, 700);
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            AuthAPI.get().then(async (result) => {
                let token = '';

                if(result.status === 200) {
                    if(result.data.token) {
                        token = result.data.token;
                    }else{
                        await AuthAPI.generateToken().then((result2) => {
                            if(result2.status === 200) {
                                token = result2.data.token;
                            }
                        })
                    }
                }

                this.setState({
                    isLoading: false,
                    token
                })
            })
        })
    }

    componentDidMount() {
        this.fetchNow()
    }

    render() { 
        return (
            <React.Fragment>
                <Helmet title={"API Documentation - " + process.env.REACT_APP_WEB_NAME} />
                <Loading show={this.state.isLoading} />
                <Breadcrumbs title="API Documentation" parent="Message" />

                <Container fluid={false}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <CopyToClipboard text={this.state.token} onCopy={this.copied.bind(this, 'api-key')}> 
                                        <div className="api-box">
                                            <div className="api-type">
                                                <div className="api-badge bg-danger">
                                                    API KEY
                                                </div>
                                            </div>
                                            <div className="api-url">
                                                <code className="text-dark" style={{fontSize: '14px'}}>{this.state.token === '' ? '-' : this.state.token}</code>
                                                <Copy className="copy-icon ml-2" size={16}/>
                                            </div>
                                            <div id="api-key" className="badge badge-dark copy-status">API Key Copied</div>
                                        </div>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card">
                                <div className="card-header py-4">
                                    <div className="mx-0 d-flex align-items-center justify-content-between">
                                        <h5 className="m-0 pt-1">Send Text Message</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <CopyToClipboard text={process.env.REACT_APP_API + '/api/open/message/send'} onCopy={this.copied.bind(this, 'text-url')}> 
                                        <div className="api-box mb-4">
                                            <div className="api-type">
                                                <div className="api-badge">
                                                    POST
                                                </div>
                                            </div>
                                            <div className="api-url">
                                                <code className="text-dark" style={{fontSize: '14px'}}>{process.env.REACT_APP_API}/api/open/message/send</code>
                                                <Copy className="copy-icon ml-2" size={16}/>
                                            </div>
                                            <div id="text-url" className="badge badge-dark copy-status">URL Copied</div>
                                        </div>
                                    </CopyToClipboard>
                                    <h6 className="mb-4">API Request</h6>
                                    <ul className="nav nav-tabs" id="send-text-request-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="send-text-request-body-tab" data-toggle="tab" href="#send-text-request-body" role="tab" aria-controls="send-text-request-body" aria-selected="true">Body (JSON)</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="send-text-request-headers-tab" data-toggle="tab" href="#send-text-request-headers" role="tab" aria-controls="send-text-request-headers" aria-selected="false">Headers</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content pb-3" id="myTabContent">
                                        <div className="pt-4 tab-pane fade show active" id="send-text-request-body" role="tabpanel" aria-labelledby="send-text-request-body-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <table className="table table-striped responsive-table api-table">
                                                        <thead>
                                                            <tr>
                                                                <th width="30%">Attribute</th>
                                                                <th width="70%">Description</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">phone</span><br/>
                                                                    <span className="text-disabled">string</span>
                                                                </td>
                                                                <td className="text-disabled">Phone number used to send message</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">message</span><br/>
                                                                    <span className="text-disabled">string</span>
                                                                </td>
                                                                <td className="text-disabled">Text message</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">contact</span><br/>
                                                                    <span className="text-disabled">array</span>
                                                                </td>
                                                                <td className="text-disabled">List of recipient's phone number</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">total</span><br/>
                                                                    <span className="text-disabled">int</span>
                                                                </td>
                                                                <td className="text-disabled">Total amount of recipients</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">recurrent</span><br/>
                                                                    <span className="text-disabled">string</span>
                                                                </td>
                                                                <td className="text-disabled">Specify repeat message type. <code>'EVERYDAY'</code> if daily repeat, <code>'WEEK'</code> if weekly repeat, <code>'MONTH'</code> if monthly repeat, <code>'YEAR'</code> if annualy repeat, and <code>'DAYS'</code> if repeat only in weekdays. Use <code>null</code> if sending no repeat message.</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">time</span><br/>
                                                                    <span className="text-disabled">string</span>
                                                                </td>
                                                                <td className="text-disabled">Send message time, used when sending schedule or repeat message. Use <code>null</code> to send immediately, or date time in <code>'yyyy-mm-dd hh:mm'</code> format.</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">limit</span><br/>
                                                                    <span className="text-disabled">string</span>
                                                                </td>
                                                                <td className="text-disabled">Limit date for repeat message. Use <code>null</code> when send immediately and schedule message, or date time in <code>'yyyy-mm-dd hh:mm'</code> format when sending repeat message.</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="api-code h-100">
                                                        <SyntaxHighlighter language="JSON" style={stackoverflowLight} customStyle={{fontSize: '14px', marginBottom: '0'}}>
                                                            {sendText.body}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4 tab-pane fade" id="send-text-request-headers" role="tabpanel" aria-labelledby="send-text-request-headers-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <table className="table table-striped responsive-table api-table">
                                                        <thead>
                                                            <tr>
                                                                <th width="30%">Attribute</th>
                                                                <th width="70%">Description</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">Authorization</span><br/>
                                                                    <span className="text-disabled">Bearer</span>
                                                                </td>
                                                                <td className="text-disabled">Use your API Key as a bearer token</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">Content-Type</span><br/>
                                                                    <span className="text-disabled">JSON</span>
                                                                </td>
                                                                <td className="text-disabled">application/json</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="api-code h-100">
                                                        <SyntaxHighlighter language="JSON" style={stackoverflowLight} customStyle={{fontSize: '14px', marginBottom: '0'}}>
                                                            {sendText.header}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="my-4">API Response</h6>
                                    <ul className="nav nav-tabs" id="send-text-response-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="send-text-response-success-tab" data-toggle="tab" href="#send-text-response-success" role="tab" aria-controls="send-text-response-success" aria-selected="true">Success</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="send-text-response-failed-tab" data-toggle="tab" href="#send-text-response-failed" role="tab" aria-controls="send-text-response-failed" aria-selected="false">Failed</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="pt-4 tab-pane fade show active" id="send-text-response-success" role="tabpanel" aria-labelledby="send-text-response-success-tab">
                                            <div className="api-code">
                                                <SyntaxHighlighter language="JSON" style={stackoverflowLight} customStyle={{fontSize: '14px', marginBottom: '0'}}>
                                                    {sendText.response.success}
                                                </SyntaxHighlighter>
                                            </div>
                                        </div>
                                        <div className="pt-4 tab-pane fade" id="send-text-response-failed" role="tabpanel" aria-labelledby="send-text-response-failed-tab">
                                            <div className="api-code">
                                                <SyntaxHighlighter language="JSON" style={stackoverflowLight} customStyle={{fontSize: '14px', marginBottom: '0'}}>
                                                    {sendText.response.error}
                                                </SyntaxHighlighter>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card">
                                <div className="card-header py-4">
                                    <div className="mx-0 d-flex align-items-center justify-content-between">
                                        <h5 className="m-0 pt-1">Send Media Message</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <CopyToClipboard text={process.env.REACT_APP_API + '/api/open/message/media'} onCopy={this.copied.bind(this, 'text-media')}> 
                                        <div className="api-box mb-4">
                                            <div className="api-type">
                                                <div className="api-badge">
                                                    POST
                                                </div>
                                            </div>
                                            <div className="api-url">
                                                <code className="text-dark" style={{fontSize: '14px'}}>{process.env.REACT_APP_API}/api/open/message/media</code>
                                                <Copy className="copy-icon ml-2" size={16}/>
                                            </div>
                                            <div id="text-media" className="badge badge-dark copy-status">URL Copied</div>
                                        </div>
                                    </CopyToClipboard>
                                    <h6 className="mb-4">API Request</h6>
                                    <ul className="nav nav-tabs" id="send-media-request-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="send-media-request-body-tab" data-toggle="tab" href="#send-media-request-body" role="tab" aria-controls="send-media-request-body" aria-selected="true">Body (Form)</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="send-media-request-headers-tab" data-toggle="tab" href="#send-media-request-headers" role="tab" aria-controls="send-media-request-headers" aria-selected="false">Headers</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content pb-3" id="myTabContent">
                                        <div className="pt-4 tab-pane fade show active" id="send-media-request-body" role="tabpanel" aria-labelledby="send-media-request-body-tab">
                                            <table className="table table-striped responsive-table api-table">
                                                <thead>
                                                    <tr>
                                                        <th width="15%">Attribute</th>
                                                        <th width="35%">Example Value</th>
                                                        <th width="50%">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">phone</span><br/>
                                                            <span className="text-disabled">string</span>
                                                        </td>
                                                        <td><code>08987406469</code></td>
                                                        <td className="text-disabled">Phone number used to send message</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">message</span><br/>
                                                            <span className="text-disabled">string</span>
                                                        </td>
                                                        <td><code>Hello world</code></td>
                                                        <td className="text-disabled">Text message</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">contact</span><br/>
                                                            <span className="text-disabled">string</span>
                                                        </td>
                                                        <td><code>089602653346, 089602677789</code></td>
                                                        <td className="text-disabled">List of recipient's phone number. Use comma (,) as a separator to send to multiple recipients.</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">file</span><br/>
                                                            <span className="text-disabled">file</span>
                                                        </td>
                                                        <td><code><Paperclip style={{marginBottom: '-2px', marginRight: '.25rem'}} size={14} />File</code></td>
                                                        <td className="text-disabled">File or media to send</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">total</span><br/>
                                                            <span className="text-disabled">int</span>
                                                        </td>
                                                        <td><code>1</code></td>
                                                        <td className="text-disabled">Total amount of recipients</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">recurrent</span><br/>
                                                            <span className="text-disabled">string</span>
                                                        </td>
                                                        <td><code>EVERYDAY</code> | <code>WEEK</code> | <code>MONTH</code> | <code>YEAR</code> | <code>DAYS</code></td>
                                                        <td className="text-disabled">Specify repeat message type. <code>'EVERYDAY'</code> if daily repeat, <code>'WEEK'</code> if weekly repeat, <code>'MONTH'</code> if monthly repeat, <code>'YEAR'</code> if annualy repeat, and <code>'DAYS'</code> if repeat only in weekdays. Set empty if sending no repeat message.</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">time</span><br/>
                                                            <span className="text-disabled">string</span>
                                                        </td>
                                                        <td><code>2021-09-20 18:00</code></td>
                                                        <td className="text-disabled">Send message time, used when sending schedule or repeat message. Set empty to send immediately, or date time in <code>'yyyy-mm-dd hh:mm'</code> format.</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="f-w-500">limit</span><br/>
                                                            <span className="text-disabled">string</span>
                                                        </td>
                                                        <td><code>2021-09-21 18:00</code></td>
                                                        <td className="text-disabled">Limit date for repeat message. Set empty when send immediately and schedule message, or date time in <code>'yyyy-mm-dd hh:mm'</code> format when sending repeat message.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pt-4 tab-pane fade" id="send-media-request-headers" role="tabpanel" aria-labelledby="send-media-request-headers-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <table className="table table-striped responsive-table api-table">
                                                        <thead>
                                                            <tr>
                                                                <th width="30%">Attribute</th>
                                                                <th width="70%">Description</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <span className="f-w-500">Authorization</span><br/>
                                                                    <span className="text-disabled">Bearer</span>
                                                                </td>
                                                                <td className="text-disabled">Use your API Key as a bearer token</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="api-code h-100">
                                                        <SyntaxHighlighter language="JSON" style={stackoverflowLight} customStyle={{fontSize: '14px', marginBottom: '0'}}>
                                                            {sendMedia.header}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="my-4">API Response</h6>
                                    <ul className="nav nav-tabs" id="send-media-response-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="send-media-response-success-tab" data-toggle="tab" href="#send-media-response-success" role="tab" aria-controls="send-media-response-success" aria-selected="true">Success</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="send-media-response-failed-tab" data-toggle="tab" href="#send-media-response-failed" role="tab" aria-controls="send-media-response-failed" aria-selected="false">Failed</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="pt-4 tab-pane fade show active" id="send-media-response-success" role="tabpanel" aria-labelledby="send-media-response-success-tab">
                                            <div className="api-code">
                                                <SyntaxHighlighter language="JSON" style={stackoverflowLight} customStyle={{fontSize: '14px', marginBottom: '0'}}>
                                                    {sendMedia.response.success}
                                                </SyntaxHighlighter>
                                            </div>
                                        </div>
                                        <div className="pt-4 tab-pane fade" id="send-media-response-failed" role="tabpanel" aria-labelledby="send-media-response-failed-tab">
                                            <div className="api-code">
                                                <SyntaxHighlighter language="JSON" style={stackoverflowLight} customStyle={{fontSize: '14px', marginBottom: '0'}}>
                                                    {sendMedia.response.error}
                                                </SyntaxHighlighter>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
 
export default APIDocs;