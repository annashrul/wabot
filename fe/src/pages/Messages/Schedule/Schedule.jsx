import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import moment from 'moment';
import Datetime from 'react-datetime';
import { Calendar, Clock, MoreHorizontal, Paperclip } from 'react-feather';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

import MessageAPI from '../../../api/Message';

import Loading from '../../../components/loading/Loading';
import Breadcrumbs from '../../../components/Breadcrumb';
import Timepicker from '../../../components/Timepicker';

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isTimePick: false,

            data: [],

            time: {
                id: 0,
                recurrent: '',
                sent_count: 0,
                send_time: '',
                limit_time: ''
            },
            message: {
                id: 0,
                id_media: 0,
                varStorage: 0,
                recipient: 0,
                message: '',
                time: '',
                type: ''
            },
            recipient: [],
            media: {
                path_file: '',
                created_at: '2021-09-27T04:44:37.000000Z',
                file_name: ''
            },

            clock : ''
        }

        this.fetchNow = this.fetchNow.bind(this);
        this.viewDetail = this.viewDetail.bind(this);

        this.handleTime = this.handleTime.bind(this);
        this.chooseTime = this.chooseTime.bind(this);
        this.handleLimit = this.handleLimit.bind(this);

        this.modalUpdate = this.modalUpdate.bind(this);
        this.update = this.update.bind(this);

        this.delete = this.delete.bind(this);
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            MessageAPI.getSchedule().then((result) => {
                let data = [];

                if(result.status === 200) {
                    for(let value of result.data) {
                        if(value.status === "ACTIVE"){
                            data.push(value);
                        }
                    }
                }

                if($.fn.dataTable.isDataTable('#schedule-table')) {
                    $('#schedule-table').DataTable().destroy();
                }

                this.setState({
                    isLoading: false,
                    data
                }, () => {
                    var table = $('#schedule-table').DataTable({
                        columnDefs: [ {
                            searchable: false,
                            orderable: false,
                            targets: 0
                        }],
                        order: [[ 1, 'asc' ]]
                    });                    

                    table.on('order.dt search.dt', function () {
                        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                            cell.innerHTML = i+1;
                        });
                    }).draw();
                })
            })
        })
    }

    /* === Badge by Message Type ================================================ */

    badge(target) {
        if(target === 'Text Message') {
            return (
                <span className="history-badge text-badge">Text Message</span>
            )
        }else if(target === 'Media Message') {
            return (
                <span className="history-badge media-badge">Media Message</span>
            )
        }else if(target === 'Variable Message') {
            return (
                <span className="history-badge variable-badge">Variable Message</span>
            )
        }else{
            return null;
        }
    }

    /* === Show Message Detail ================================================== */

    viewDetail(data) {
        /* Store and Assign Variable */
        let message = data.message, recipient = [];
        let media = {
            path_file: '',
            created_at: '',
            file_name: ''
        };

        /* Store Time Detail */
        let time = {
            id: data.id,
            recurrent: data.recurrent,
            sent_count: data.sent_count,
            send_time: data.send_time,
            limit_time: data.limit_time
        }

        /* Preprocess Time Detail */
        if(time.recurrent === 'NONE') {
            time.recurrent = 'No Repeat';
        }else if(time.recurrent === 'EVERYDAY') {
            time.recurrent = 'Everyday';
        }else if(time.recurrent === 'WEEK') {
            time.recurrent = 'Weekly on ' + moment(time.send_time).format('dddd');
        }else if(time.recurrent === 'MONTH') {
            time.recurrent = 'Monthly on ' + moment(time.send_time).format('D');
        }else if(time.recurrent === 'YEAR') {
            time.recurrent = 'Annualy on ' + moment(time.send_time).format('D MMM');
        }else if(time.recurrent === 'DAYS') {
            time.recurrent = 'Weekdays';
        }

        this.setState({
            isLoading: true
        }, async () => {
            if(message.type === 'Variable Message') {
                /* Get Recipient and Variable */
                await MessageAPI.getRecipientVar(message.id).then((result) => {
                    if(result.status === 200) {
                        recipient = result.data;
                    }
                })
            }else{
                /* Get Recipient */
                await MessageAPI.getRecipient(message.id).then((result) => {
                    if(result.status === 200) {
                        recipient = result.data;
                    }
                })
            }
    
            /* Get Media */
            if(message.type === 'Media Message') {
                await MessageAPI.getMedia(message.id_media).then((result) => {
                    if(result.status === 200) {
                        media = result.data[0];
                    }
                })
            }
            
            /* Update */
            this.setState({
                isLoading: false,
                message, recipient, media, time
            }, () => {
                /* Initialize Tooltip */
                $('[data-toggle="tooltip"]').tooltip();

                /* Show Modal */
                $('#modal-detail').modal('show');
            })
        })
    }

    /* === Time Handler ========================================================= */

    handleTime(event) {
        let time = this.state.clock;
        let value = event.target.value;

        if(value.charAt(0) === '2' && value.charAt(1) >= '4') {
            time = "00" + value.substring(2);
        }else{
            time = value;
        }

        this.setState({
            clock: time
        })
    }

    chooseTime(event) {
        let value = event.currentTarget.getAttribute('data-value');
        let type = event.currentTarget.getAttribute('data-type');
        let time = this.state.clock;

        if(type === 'hour') {
            time = value + time.substring(2);
        }else{
            if(time.length < 2) {
                time = '--:' + value;
            }else{
                time = time.substring(0,2) + ':' + value;
            }
        }

        this.setState({
            clock: time
        })
    }

    handleLimit(value) {
        let time = this.state.time;

        time.limit_time = moment(value).format('YYYY-MM-DD');

        this.setState({
            time
        })
    }

    /* === Update Schedule ====================================================== */

    modalUpdate(data, choice) {
        let time = {
            id: data.id,
            recurrent: data.recurrent,
            sent_count: data.sent_count,
            send_time: data.send_time,
            limit_time: moment(data.limit_time).format('YYYY-MM-DD')
        }

        this.setState({
            clock: moment(time.send_time).format('HH:mm'),
            time
        }, () => {
            if(choice === 'time') {
                $('#modal-time').modal('show');
            }else{
                $('#modal-limit').modal('show');
            }
        })
    }

    update(choice) {
        /* Assign Variable */
        let body;

        /* Proccess by Type */
        if(choice === 'time') {
            /* Store Variable Data */
            let clock = moment(this.state.clock, 'HH:mm');
            let time = moment(this.state.time.send_time);
            
            /* Set New Hour and Minute */
            time.set({'hour': clock.hour(), 'minute': clock.minute()});
            
            /* If New Time Before Current Time */
            if(time.isBefore(moment())) {
                /* Processed by Their Recurrent Type */
                if(this.state.time.recurrent === 'EVERYDAY') {
                    time.add(1, 'day');
                }else if(this.state.time.recurrent === 'WEEK') {
                    time.add(7, 'day');
                }else if(this.state.time.recurrent === 'MONTH') {
                    time.add(1, 'month');
                }else if(this.state.time.recurrent === 'YEAR') {
                    time.add(1, 'year');
                }else if(this.state.time.recurrent === 'DAYS') {
                    if(time.format('d') === '5' || time.format('d') === 5) {
                        time.add(2, 'day');
                    }else{
                        time.add(1, 'day');
                    }
                }
            }
            
            /* Store Processed Time */
            body = new URLSearchParams({
                time: time.format('YYYY-MM-DD HH:mm:ss')
            })
        }else{
            /* Store Limit Date */
            body = new URLSearchParams({
                limit: this.state.time.limit_time
            })
        }

        this.setState({
            isLoading: true
        }, () => {
            /* Request to Update */
            MessageAPI.updateSchedule(this.state.time.id, body).then((result) => {
                if(result.status === 200) {
                    /* Handle Success */
                    this.fetchNow();

                    toast.success((choice === 'time' ? 'Time Changed Successfully' : 'Limit Date Changed Successfully'), {
                        position: toast.POSITION.TOP_CENTER
                    });

                    if(choice === 'time') {
                        $('#modal-time').modal('hide');
                    }else{
                        $('#modal-limit').modal('hide');
                    }
                }else{
                    /* Handle Failed */
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Update Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });

                        if(choice === 'time') {
                            $('#modal-time').modal('hide');
                        }else{
                            $('#modal-limit').modal('hide');
                        }
                    })
                }
            })
        })
    }

    /* === Delete Schedule ====================================================== */

    delete(data) {
        let id = data.id;

        this.setState({
            isLoading: true
        }, () => {
            MessageAPI.deleteSchedule(id).then((result) => {
                if(result.status === 200) {
                    /* Handle Success */
                    this.fetchNow();

                    toast.success('Schedule Deleted', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    /* Handle Failed */
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Delete Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    componentDidMount() {
        this.fetchNow();

        /* Timepicker Close */
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
        return (
            <React.Fragment>
                <Helmet title={"Message Schedule - " + process.env.REACT_APP_WEB_NAME} />
                <Loading show={this.state.isLoading} />
                
                <Breadcrumbs title="Schedule" parent="Messages" />

                <Container fluid={false}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table-striped responsive-table" id="schedule-table">
                                        <thead>
                                            <tr className="text-center">
                                                <th width="5%">#</th>
                                                <th width="20%">Next Send</th>
                                                <th>Status</th>
                                                <th>Message</th>
                                                <th>Sent Count</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map((value, index) => {   
                                                    let text = '';
                                                    
                                                    if(value.recurrent === 'EVERYDAY') {
                                                        text = 'EVERYDAY';
                                                    }else if(value.recurrent === 'WEEK') {
                                                        text = 'WEEKLY';
                                                    }else if(value.recurrent === 'MONTH') {
                                                        text = 'MONTHLY';
                                                    }else if(value.recurrent === 'YEAR') {
                                                        text = 'ANNUALY';
                                                    }else if(value.recurrent === 'DAYS') {
                                                        text = 'WEEKDAYS';
                                                    }

                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-center"></td>
                                                            <td className="text-center" data-order={new Date(value.send_time).getTime()}>{moment(value.send_time).format("D MMM YYYY HH:mm")}</td>
                                                            <td className="text-center">
                                                                {
                                                                    value.recurrent === 'NONE' ? (
                                                                        <span className="history-badge variable-badge">NO REPEAT</span>
                                                                    ) : (
                                                                        <span className="history-badge green-badge">{text}</span>
                                                                    )
                                                                }
                                                            </td>
                                                            <td className="text-truncate" style={{maxWidth: '15rem'}}>{value.message.message}</td>
                                                            <td className="text-center">{value.sent_count ? value.sent_count : 0}</td>
                                                            <td align="center">
                                                                <div className="dropdown">
                                                                    <button className="btn btn-primary px-2 d-flex align-items-center" data-toggle="dropdown"><MoreHorizontal size={21}/></button>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <button onClick={this.viewDetail.bind(this, value)} className="dropdown-item w-100" type="button">View Detail</button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={this.modalUpdate.bind(this, value, 'time')} className="dropdown-item w-100" type="button">Change Time</button>
                                                                        {
                                                                            value.recurrent !== 'NONE' && (
                                                                                <button onClick={this.modalUpdate.bind(this, value, 'limit')} className="dropdown-item w-100" type="button">Change Limit</button>
                                                                            )
                                                                        }
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={this.delete.bind(this, value)} className="dropdown-item w-100" type="button">Remove Schedule</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                
                <div className="modal fade" id="modal-detail" tabIndex="-1" aria-labelledby="modal-detail" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Message Detail</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pb-2 modal-scroll">
                                <div className="row">
                                    <div className="col-6 mb-4">
                                        <div className="f-w-500 mb-2">Recurrent</div>
                                        <span>{this.state.time.recurrent}</span>
                                    </div>
                                    {
                                        this.state.time.recurrent !== 'No Repeat' && (
                                            <div className="col-6 mb-4">
                                                <div className="f-w-500 mb-2">Sent Count</div>
                                                <span>{this.state.time.sent_count ? this.state.time.sent_count : 0} Times</span>
                                            </div>
                                        )
                                    }
                                    <div className="col-6 mb-4">
                                        <div className="f-w-500 mb-2">Next Send</div>
                                        <div className="d-flex align-items-center">
                                            <Calendar className="mt-n1 mr-1 text-dark" size={20} />
                                            <span>{moment(this.state.time.send_time).format('D MMMM YYYY HH:mm')}</span>
                                        </div>
                                    </div>
                                    {
                                        this.state.time.recurrent !== 'No Repeat' && (
                                            <div className="col-6 mb-4">
                                                <div className="f-w-500 mb-2">Repeated Until</div>
                                                <div className="d-flex align-items-center">
                                                    <Calendar className="mt-n1 mr-1 text-dark" size={20} />
                                                    <span>{moment(this.state.time.limit_time).format('D MMMM YYYY')}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="col-6 mb-4">
                                        <div className="f-w-500 mb-2">Type</div>
                                        {this.badge(this.state.message.type)}
                                    </div>
                                </div>
                                {
                                    this.state.message.type === 'Media Message' && (
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <div className="f-w-500 mb-2">Media</div>
                                                <div className="d-flex align-items-center">
                                                    <Paperclip size={16} style={{width: '1.5rem'}}/>
                                                    {
                                                        moment().diff(moment(this.state.media.created_at), 'seconds') < 604800 ? (
                                                            <a href={process.env.REACT_APP_API + '/' + this.state.media.path_file} target="_blank" rel="noopener noreferrer" className="pl-2 media-link text-dark">{this.state.media.file_name}</a>
                                                        ) : (
                                                            <div className="pl-2" style={{cursor: 'not-allowed'}} data-toggle="tooltip" data-placement="bottom" title="Sorry, this media file is expired, as it was temporarily stored for 7 days only.">{this.state.media.file_name}</div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="f-w-500 mb-2">Draft Text</div>
                                        <textarea defaultValue={this.state.message.message} style={{fontSize: '14px'}} rows="4" type="text" disabled className="form-control" id="" />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="d-flex justify-content-between">
                                            <div className="f-w-500 mb-2">Recipient List</div>
                                            <div>{this.state.message.recipient} Recipient</div>
                                        </div>
                                        {
                                            this.state.message.type === 'Variable Message' ? (
                                                <div className="list-group databar mt-1" style={{maxHeight: '12rem', overflowY: 'auto'}}>
                                                    {
                                                        this.state.recipient.map((value, index) => {
                                                            let variable = '';

                                                            for(let i=0 ; i<10 ; i++) {
                                                                if(value[('var' + i)]) {
                                                                    if(variable === '') {
                                                                        variable += value[('var' + i)];
                                                                    }else{
                                                                        variable += (' - ' + value[('var' + i)])
                                                                    }
                                                                }
                                                            }

                                                            return (
                                                                <div key={index} className="list-group-item px-3">
                                                                    <div className="d-flex justify-content-between mb-2">
                                                                        <div className="f-w-500">{value.name}</div>
                                                                        <div className="text-dark-soft">{value.phone}</div>
                                                                    </div>
                                                                    <div className="row px-3">
                                                                        <span className="text-dark-soft">{variable}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : (
                                                <div className="list-group databar mt-1" style={{maxHeight: '12rem', overflowY: 'auto'}}>
                                                    {
                                                        this.state.recipient.map((value, index) => {
                                                            let description = '-', name = value.name;

                                                            if(value.type.includes('contact')) {
                                                                if(value.type === 'contactNew') {
                                                                    name = value.phone;
                                                                    description = 'Added Number';
                                                                }else{
                                                                    description = value.phone;
                                                                }
                                                            }else if(value.type === 'group') {
                                                                description = 'Whatsapp Group'
                                                            }else if(value.type === 'category') {
                                                                description = 'Category'
                                                            }else if(value.type === 'broadcast') {
                                                                description = 'Broadcast List'
                                                            }

                                                            return (
                                                                <div key={index} className="list-group-item px-3 d-flex justify-content-between">
                                                                    <div className="f-w-500">{name}</div>
                                                                    <div className="text-dark-soft">{description}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-time" tabIndex="-1" aria-labelledby="modal-time" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change Time</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    Please be aware, if choosed time is before current time ({moment().format('HH:mm')}), next send time will be set to next recurrence.
                                </div>
                                <div className="form-group">
                                    <div id="time-parent" style={{position: 'relative'}}>
                                        <InputMask
                                            value={this.state.clock}
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
                                            this.state.isTimePick && <Timepicker time={this.state.clock} choose={this.chooseTime} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-outline-primary" type="button">Cancel</button>
                                <button onClick={this.update.bind(this, 'time')} className="btn btn-primary" type="button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-limit" tabIndex="-1" aria-labelledby="modal-time" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change Recurrence Limit</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-0" style={{position: 'relative'}}>
                                    <Datetime 
                                        value={moment(this.state.time.limit_time).format('D MMMM YYYY')}
                                        onChange={this.handleLimit}
                                        
                                        isValidDate={(current) => { return current.isAfter(moment(this.state.time.send_time)) }}
                                        dateFormat="D MMMM YYYY"
                                        timeFormat={false}

                                        inputProps={{placeholder: 'Choose Date', className: 'form-control text-placeholder', 'data-type': 'limit'}}

                                        closeOnSelect
                                    />
                                    <Calendar size={19} className="input-icon-add"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-outline-primary" type="button">Cancel</button>
                                <button onClick={this.update.bind(this, 'limit')} className="btn btn-primary" type="button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Schedule;