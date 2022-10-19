import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import { Calendar, Clock } from 'react-feather';
import { toast } from 'react-toastify';
import moment from 'moment';
import InputMask from 'react-input-mask';
import Datetime from 'react-datetime';
import $ from 'jquery';

import Loading from '../../../components/loading/Loading';
import Timepicker from '../../../components/Timepicker';

import MessageAPI from '../../../api/Message';

toast.configure();

class Step3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isTimePick: false,

            message: '',

            choice: 0,
            time: {
                recurent: '',
                date: '',
                time: '',
                limit: '',
                days: ''
            }
        }

        this.translate = this.translate.bind(this);

        this.handleChoice = this.handleChoice.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.handleDate = this.handleDate.bind(this);
        this.handleLimit = this.handleLimit.bind(this);

        this.handleTime = this.handleTime.bind(this);
        this.chooseTime = this.chooseTime.bind(this);

        this.sendMessage = this.sendMessage.bind(this);
    }

    /* === Translate Message ==================================================== */

    translate() {
        this.setState({
            isLoading: true
        }, () => {
            /* Store Message Data and Assign Result Variable */
            let data = (convertToRaw(this.props.message.getCurrentContent())).blocks, result = '';

            /* Translate Style (Bold, Italic, and Strikethrough) to Whatsapp Markdown */
            for(let i=0 ; i<data.length ; i++) {
                /* Store Value of The Loop */
                let value = data[i];

                /* Assign Variable */
                let changes = [];

                /* Loop to add string same as text length */
                for(let j=0 ; j<value.text.length ; j++) {
                    changes.push('');
                }

                /* Loop to Add Style Markdown */
                for(let style of value.inlineStyleRanges) {
                    /* Store Start Index (Manipulate if Space Included) */
                    let start = (value.text.charAt(style.offset) === ' ') ? (style.offset + 1) : (style.offset);
                    
                    /* Store End Index (Manipulate if Space Included) */
                    let end = (value.text.charAt((style.offset + style.length) - 1) === ' ') ? ((style.offset + style.length) - 1) : (style.offset + style.length);
                    
                    /* Assign Symbol */
                    let symbol = '';

                    /* Store Symbol Depends on Style Type */
                    if(style.style === 'ITALIC'){
                        symbol = '_';
                    }else if(style.style === 'BOLD'){
                        symbol = '*';
                    }else if(style.style === 'STRIKETHROUGH'){
                        symbol = '~';
                    }

                    /* Add Symbol to Changes (Start Index) */
                    changes[start] += symbol;

                    /* Add Symbol to Changes (End Index) */
                    if(changes.length <= end) {
                        /* If Last of Text Line */
                        changes.push(symbol);
                    }else{
                        /* If Not Last of Text Line */
                        changes[end] = symbol + changes[end];
                    }
                }

                /* Store Text and Assign Initial Margin */
                let temp = value.text, margin = 0;

                /* Loop to Add Symbol to Text */
                for(let j=0 ; j<changes.length ; j++) {
                    if(changes[j] !== '') {
                        temp = temp.substring(0, (j + margin)) + changes[j] + temp.substring(j + margin);
                        margin += changes[j].length;
                    }
                }

                /* Add Processed Text to Result */
                result += temp;

                /* If Not Last Line, Add New Line Character */
                if(i !== (data.length - 1)) {
                    result += `\n`;
                }
            }

            /* Change Variable Name to Var1, Var2, etc. */
            for(let i=0 ; i<this.props.variable.length ; i++) {
                result = result.replaceAll(('$' + this.props.variable[i]), ('$var' + i));
            }

            this.setState({
                isLoading: false,
                message: result
            })
        })
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

    sendMessage(save) {
        this.setState({
            isLoading: true
        }, () => {
            /* Assign Recipient Variable */
            let recipient = [];

            /* Add Recipient */
            for(let value of this.props.recipient) {
                let temp = {
                    name: value.name,
                    phone: value.phone
                }

                for(let i=0 ; i<this.props.variable.length ; i++) {
                    temp[('var' + i)] = value[this.props.variable[i]];
                }

                recipient.push(temp);
            }

            /* Store Result */
            let result = {
                id_device: this.props.device.choice,
                message: this.state.message,
                data: recipient,
                total: recipient.length,
                time: {
                    recurent: null,
                    time: null,
                    limit: null,
                    days: null
                }
            }

            /* If Recipient Saved */
            if(save === 'yes') {
                result.category_name = 'Recipient List ' + moment().format('D MMM YYYY HH:mm');
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

            /* Request Send Message */
            MessageAPI.sendCSV(result).then((data) => {
                if(data.status === 200) {
                    $('#modal-save').modal('hide');
                    this.props.reset();
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#modal-save').modal('hide');
                        toast.error(`Sending Message Failed, Please Try Again`, {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 7000,
                        });
                    })
                }
            })
        })
    }

    componentDidMount() {
        /* Scroll to Top */
        window.scrollTo(0, 0);

        /* Translate Message */
        this.translate();

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

        /* Initialize Tooltip */
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() { 
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
                                            Device
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="form-group d-flex">
                                        <select style={{width: 'auto'}} value={this.props.device.choice} onChange={this.props.device.set} id="device-select" onMouseLeave={() => {$('#device_select').tooltip('hide')}} data-toggle="tooltip" data-placement="top" title="If Your Device doesn't show up, please enabled it first in sessions page" name="device" className="form-control">
                                            <option value="" disabled>-- Choose Device --</option>
                                            {
                                                this.props.device.data.map((value, index) => {
                                                    return (
                                                        <option value={value.id} key={index}>{value.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
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
                                        <Editor editorState={this.props.message} readOnly toolbarHidden/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label f-w-500" >Recipient</label>
                                <div className="col-md-9 pt-2">
                                    {this.props.recipient.length} Contact
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between mb-4">
                    <button onClick={this.props.iterateStep} data-direction="prev" className="btn btn-outline-green mr-3">Previous</button>
                    <button onClick={() => { $('#modal-save').modal('show') }} className="btn btn-green" disabled={(this.props.device.choice === "")}>Send</button>
                </div>

                <div className="modal fade" id="modal-save" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="modal-save" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Save Recipient</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Do you want to save this message's recipient?
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.sendMessage.bind(this, 'no')} className="btn btn-danger">No</button>
                                <button onClick={this.sendMessage.bind(this, 'yes')} className="btn btn-success">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Step3;