import React, { Component } from 'react';
import { convertToRaw, Editor } from 'draft-js';
import { Calendar, Clock } from 'react-feather';
import { toast } from 'react-toastify';
import draftToMarkdown from 'draftjs-to-markdown';
import moment from 'moment';
import Datetime from 'react-datetime';
import InputMask from 'react-input-mask';
import $ from 'jquery'

import MediaAPI from '../../../api/Media';
import MessageAPI from '../../../api/Message';

import Loading from '../../../components/loading/Loading';
import Timepicker from '../../../components/Timepicker';


const DeepClone = require('rfdc')();
toast.configure();

class Step3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isTimePick: false,

            message: this.translator(this.props.message),

            choice: 0,
            time: {
                recurent: '',
                date: '',
                time: '',
                limit: '',
                days: ''
            }
        }

        this.handleChoice = this.handleChoice.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.handleDate = this.handleDate.bind(this);
        this.handleLimit = this.handleLimit.bind(this);

        this.handleTime = this.handleTime.bind(this);
        this.chooseTime = this.chooseTime.bind(this);

        this.sendMessage = this.sendMessage.bind(this);
    }

    /* === Message Translator =================================================== */

    translator(message) {
        let value = draftToMarkdown(convertToRaw(message.getCurrentContent()));

        /* Temporary Bold */
        value = value.replace(/\*\*(?!\*)(.*?!*)(?<!\*)\*\*/gim, '=#=$1=#=');
        
        /* Italic */
        value = value.replace(/\*(.*?!*)\*/gim, '_$1_');

        /* Strikethrough */
        value = value.replace(/~~(.*?!*)~~/gim, '~$1~');
        
        /* Bold (Replace Temporary) */
        value = value.replace(/=#=(.*?!*)=#=/gim, '*$1*');

        /* Temporary Fix Space Before Symbol */
        value = value.replace(/ (?=\*)\*/gim, '*=#=').replace(/ (?=_)_/gim, '_=#=').replace(/ (?=~)~/gim, '~=#=');
        
        /* Fix Space After Symbol */
        value = value.replace(/\*(?<= )\*/gim, ' *').replace(/_(?<=_) /gim, ' _').replace(/~(?<=~) /gim, ' ~');
        
        /* Fix Space Before Symbol (Replace Temporary) */
        value = value.replace(/\*=#=/gim, '* ').replace(/_=#=/gim, '_ ').replace(/~=#=/gim, '~ ');

        return value;
    }

    /* === Recipient UI ========================================================= */

    recipientBadge(value, index) {
        /* Return Badge by Recipient Type */
        if(value.type === 'contactWeb' || value.type === 'contactDevice' || value.type === 'contactNew') {
            return <div key={index} className="badge badge-primary">{`${value.name} - ${value.detail}`}</div>
        }else if(value.type === 'category') {
            return <div key={index} className="badge badge-secondary">{`${value.name} - Category`}</div>
        }else if(value.type === 'group') {
            return <div key={index} className="badge badge-info">{`${value.name} - WA Group`}</div>
        }else if(value.type === 'broadcast') {
            return <div key={index} className="badge badge-success">{`${value.name} - Broadcast List`}</div>
        }
    }

    /* === Message Send Time ==================================================== */

    handleChoice(event){
        /* Assign Variable */
        let choice = parseInt(event.target.value), time;

        /* Check if Scheduled Message or Not */
        if(choice === 1) {
            /* Assign Moment Object */
            let mom = moment().add(1, 'hours');

            /* Assign Scheduled Variable */
            time = {
                recurent: 'NONE',
                date: mom.format('YYYY-MM-DD'),
                time: mom.format('HH:mm'),
                limit: mom.add(2, 'months').format('YYYY-MM-DD'),
                days: ''
            };
        }else{
            /* Assign Empty Variable */
            time = {
                recurent: '',
                time: '',
                limit: '',
                days: ''
            };
        }

        /* Update */
        this.setState({
            choice, time
        })
    }

    handleChange(event) {
        /* Assign Variable */
        let name = event.target.name, time = this.state.time;

        /* Update Target */
        time[name] = event.target.value;

        /* Change Date if Weekday Only */
        if(name === 'recurent' && event.target.value === 'DAYS') {
            if(moment(time.date).format('d') === '0'){
                time.date = moment(time.date).add(1, 'days').format('YYYY-MM-DD');
            }else if(moment(time.date).format('d') === '6') {
                time.date = moment(time.date).add(2, 'days').format('YYYY-MM-DD');
            }
        }

        /* Update */
        this.setState({
            time
        })
    }

    handleDate(value) {
        let time = this.state.time;

        time.date = moment(value).format('YYYY-MM-DD');
        time.limit = moment(value).add(1, 'months').format('YYYY-MM-DD');

        this.setState({
            time
        })
    }

    handleLimit(value) {
        let time = this.state.time;

        time.limit = moment(value).format('YYYY-MM-DD');

        this.setState({
            time
        })
    }

    handleTime(event) {
        let time = this.state.time;
        let value = event.target.value;

        if(value.charAt(0) === '2' && value.charAt(1) >= '4') {
            time.time = "00" + value.substring(2);
        }else{
            time.time = value;
        }

        this.setState({
            time
        })
    }

    chooseTime(event) {
        let value = event.currentTarget.getAttribute('data-value');
        let type = event.currentTarget.getAttribute('data-type');
        let time = this.state.time;

        if(type === 'hour') {
            time.time = value + time.time.substring(2);
        }else{
            if(time.time.length < 2) {
                time.time = '--:' + value;
            }else{
                time.time = time.time.substring(0,2) + ':' + value;
            }
        }

        this.setState({
            time
        })
    }

    /* === Send Message ========================================================= */

    sendMessage() {
        this.setState({
            isLoading: true
        }, () => {
            /* Assign Recipient Variable */
            let recipient = {
                contactDevice: [],
                contactWeb: [],
                contactNew: [],
                group: [],
                broadcast: [],
                category: []
            }

            /* Add Recipient */
            for(let value of this.props.recipient) {
                if(value.type === 'contactNew') {
                    recipient.contactNew.push(value.name);
                }else{
                    recipient[value.type].push(value.id);
                }
            }

            /* Store Result */
            let result = {
                id_device: this.props.device,
                message: this.state.message,
                recipient: recipient,
                total: this.props.recipient.length,
                time: {
                    recurent: null,
                    time: null,
                    limit: null,
                    days: null
                }
            }

            /* Check if Schedule Message */
            if(this.state.choice === 1)
            {
                /* Assign Data to Temporary Variable */
                let time = {
                    recurent: this.state.time.recurent,
                    time: this.state.time.date + ' ' + this.state.time.time + ':00',
                    limit: this.state.time.limit + ' 23:59:59',
                    days: this.state.time.days
                };

                /* If Not Repeated */
                if(time.recurent === 'NONE') 
                {
                    result.time.recurent = 'NONE';
                    result.time.time = time.time;
                }

                /* If Repeated */
                else
                {
                    result.time.recurent = time.recurent;
                    result.time.time = time.time;
                    result.time.limit = time.limit;
                    
                    /* If Repeated Every Weekday */
                    if(time.recurent === 'DAYS') {
                        result.time.days = [1,2,3,4,5];
                    }
                }
            }

            if(this.props.media.file.length <= 0) {
                /* Request Send Message */
                MessageAPI.send(result).then((data) => {
                    if(data.status === 200) {
                        this.props.reset();
                    }else{
                        this.setState({
                            isLoading: false
                        }, () => {
                            toast.error(`Sending Message Failed, Please Try Again`, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 7000,
                            });
                        })
                    }
                })
            }else{
                let body = new FormData();

                body.append('media', this.props.media.file[0]);
                
                MediaAPI.upload(body).then((data) => {
                    if(data.status === 200) {
                        result.id_media = data.data.id;

                        MessageAPI.sendMedia(result).then((data2) => {
                            if(data2.status === 200) {
                                this.props.reset();
                            }else{
                                this.setState({
                                    isLoading: false
                                }, () => {
                                    toast.error(`Sending Message Failed, Please Try Again`, {
                                        position: toast.POSITION.TOP_CENTER,
                                        autoClose: 7000,
                                    });
                                })
                            }
                        })
                    }else{
                        this.setState({
                            isLoading: false
                        }, () => {
                            toast.error(`Sending Message Failed, Please Try Again`, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 7000,
                            });
                        })
                    }
                })
            }
        })
    }

    /* === Sorting Algorithm ==================================================== */

    compare(a, b) {
        if(a.type < b.type){
            return -1;
        }else if(a.type > b.type){
            return 1;
        }else{
            return 0;
        }
    }

    componentDidMount() {
        /* Scroll to Top */
        window.scrollTo(0, 0);

        /* Timepicker Outside Click */
        $('body').on('click', (e) => {
            if (!$('#time-parent').is(e.target) 
                && $('#time-parent').has(e.target).length === 0 
                && $('.open').has(e.target).length === 0
            ) {
                this.setState({
                    isTimePick: false
                })
            }
        });
    }

    render() { 
        /* Store Temporary */
        let recipient = DeepClone(this.props.recipient);

        /* Sort by Type */
        recipient.sort(this.compare);

        return (
            <React.Fragment>
                <Loading show={this.state.isLoading} />
                <div className="col-12">
                    <div className="card">
                        <div className="card-header py-4">
                            <h5>Configuration</h5>
                        </div>
                        <div className="card-body py-4">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="col-form-label f-w-500" >
                                            When to Send
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="form-group p-2 pl-0 m-checkbox-inline mb-0">
                                        <div className="radio radio-primary mr-4">
                                            <input value={0} checked={this.state.choice === 0 ? true : false} onChange={this.handleChoice} name="choice" id="send-time-1" type="radio"/>
                                            <label className="mb-0" htmlFor="send-time-1">Send Now</label>
                                        </div>
                                        <div className="radio radio-primary mr-4">
                                            <input value={1} checked={this.state.choice === 1 ? true : false} onChange={this.handleChoice} name="choice" id="send-time-2" type="radio"/>
                                            <label className="mb-0" htmlFor="send-time-2">Scheduled</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.choice === 1 && (
                                    <React.Fragment>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label f-w-500">Schedule Time</label>
                                            <div className="col-md-9 d-flex">
                                                <div className="mr-3" style={{position: 'relative', width: '10rem'}}>
                                                    <Datetime 
                                                        value={this.state.time.date === '' ? '' : moment(this.state.time.date).format('D MMM YYYY')}
                                                        onChange={this.handleDate}
                                                        
                                                        isValidDate={(current) => {
                                                            if(this.state.time.recurent === 'DAYS') {
                                                                return current.isAfter(moment().subtract(1, 'days')) && current.format('d') !== '0' && current.format('d') !== '6';
                                                            }else{
                                                                return current.isAfter(moment().subtract(1, 'days'));
                                                            }
                                                        }}
                                                        dateFormat="D MMM YYYY"
                                                        timeFormat={false}

                                                        inputProps={{placeholder: 'Choose Date', className: 'form-control text-placeholder', 'data-type': 'date'}}

                                                        closeOnSelect
                                                    />
                                                    <Calendar size={19} className="input-icon-add d-none d-md-block"/>
                                                </div>
                                                <div className="mr-3" style={{position: 'relative', width: '6rem'}}>
                                                    <div id="time-parent">
                                                        <InputMask
                                                            value={this.state.time.time}
                                                            onChange={this.handleTime}
                                                            onFocus={() => {this.setState({isTimePick: true})}} 

                                                            mask={[/[0-2]/,/\d/,":",/[0-5]/,/\d/]}
                                                            maskPlaceholder="--:--"

                                                            id="time-pick"
                                                            className="form-control"

                                                            alwaysShowMask
                                                        />
                                                        <Clock size={19} className="input-icon-add d-none d-md-block"/>
                                                        {
                                                            this.state.isTimePick && <Timepicker time={this.state.time.time} choose={this.chooseTime} />
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    <select value={this.state.time.recurent} onChange={this.handleChange} name="recurent" className="form-control">
                                                        <option value="NONE">No Repeat (Once)</option>
                                                        <option value="EVERYDAY">Daily</option>
                                                        <option value="WEEK">Weekly on {this.state.time.date && moment(this.state.time.date).format('dddd')}</option>
                                                        <option value="MONTH">Monthly on {moment(this.state.time.date).format('D')}</option>
                                                        <option value="YEAR">Annually on {moment(this.state.time.date).format('MMMM D')}</option>
                                                        <option value="DAYS">Every Weekday</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.time.recurent !== 'NONE' && (
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label f-w-500">Repeated Until</label>
                                                    <div className="col-md-9">
                                                        <div className="mr-3" style={{position: 'relative', width: '10rem'}}>
                                                            <Datetime 
                                                                value={this.state.time.limit === '' ? '' : moment(this.state.time.limit).format('D MMM YYYY')}
                                                                onChange={this.handleLimit}
                                                                
                                                                isValidDate={(current) => { return current.isAfter(moment(this.state.time.date)) }}
                                                                dateFormat="D MMM YYYY"
                                                                timeFormat={false}

                                                                inputProps={{placeholder: 'Choose Date', className: 'form-control text-placeholder', 'data-type': 'limit'}}

                                                                closeOnSelect
                                                            />
                                                            <Calendar size={19} className="input-icon-add"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header py-4">
                            <h5>Message Summary</h5>
                        </div>
                        <div className="card-body py-4">
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label f-w-500" >Message</label>
                                <div className="col-md-9 d-flex">
                                    <div className="summary-message-box">
                                        <Editor readOnly toolbarHidden editorState={this.props.message} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label f-w-500" >Recipient</label>
                                <div className="col-md-9 d-flex">
                                    <div className="summary-recipient-box">
                                        {
                                            recipient.map((value, index) => {
                                                return this.recipientBadge(value, index);
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between mb-4">
                    <button onClick={this.props.iterateStep} data-direction="prev" className="btn btn-outline-green mr-3">Previous</button>
                    <button onClick={this.sendMessage} className="btn btn-green">Send</button>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Step3;