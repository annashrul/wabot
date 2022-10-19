import moment from 'moment';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Paperclip } from 'react-feather';
import { Container } from 'reactstrap';
import $ from 'jquery';

import MessageAPI from '../../../api/Message';

import Breadcrumbs from '../../../components/Breadcrumb';
import Loading from '../../../components/loading/Loading';

class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            
            data: [],

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
            }
        }

        this.fetchNow = this.fetchNow.bind(this);
        this.viewRecipient = this.viewRecipient.bind(this);
    }

    /* === Fetch Data =========================================================== */

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            /* Get Message History */
            MessageAPI.getHistory().then((result) => {
                /* Assign Variable */
                let data = [];

                /* Store Message History */
                if(result.status === 200) {
                    data = result.data[0];
                }

                /* Remove Datatable */
                if($.fn.dataTable.isDataTable('#history-table')) {
                    $('#history-table').DataTable().destroy();
                }

                /* Update */
                this.setState({
                    isLoading: false,
                    data
                }, () => {
                    /* Initialize New Datatable */
                    var table = $('#history-table').DataTable({
                        columnDefs: [ {
                            searchable: false,
                            orderable: false,
                            targets: 0
                        }],
                        order: [[ 1, 'desc' ]]
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

    viewRecipient(data) {
        /* Store and Assign Variable */
        let message = data, recipient = [];
        let media = {
            path_file: '',
            created_at: '',
            file_name: ''
        };

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
                message, recipient, media
            }, () => {
                /* Initialize Tooltip */
                $('[data-toggle="tooltip"]').tooltip();

                /* Show Modal */
                $('#modal-recipient').modal('show');
            })
        })
    }

    componentDidMount() {
        /* Fetch Data */
        this.fetchNow();
    }

    render() {

        return (
            <React.Fragment>
                <Helmet title={"Messages History - " + process.env.REACT_APP_WEB_NAME} />
                <Loading show={this.state.isLoading} />
                <Breadcrumbs title="History" parent="Message" />

                <Container fluid={false}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table-striped responsive-table" id="history-table">
                                        <thead>
                                            <tr className="text-center">
                                                <th width="5%">#</th>
                                                <th width="20%">Time</th>
                                                <th width="35%">Message</th>
                                                <th width="17.5%">Type</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map((value, index) => {                                                    
                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-center"></td>
                                                            <td data-order={new Date(value.created_at).getTime()}>{moment(value.created_at).format("D MMM YYYY HH:mm")}</td>
                                                            <td className="text-truncate" style={{maxWidth: '10rem'}}>{value.message}</td>
                                                            <td className="text-center">{this.badge(value.type)}</td>
                                                            <td className="text-center"><button onClick={this.viewRecipient.bind(this, value)} className="btn btn-primary" index={index}>View Detail</button></td>
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
                <div className="modal fade" id="modal-recipient" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Message Detail</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pb-2 modal-scroll">
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <div className="f-w-500 mb-2">Type</div>
                                        {this.badge(this.state.message.type)}
                                    </div>
                                    <div className="col-6">
                                        <div className="f-w-500 mb-2">Time Sent</div>
                                        <span>{moment(this.state.message.time).format("D MMMM YYYY HH:mm")}</span>
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
            </React.Fragment>
        );
    }
}
 
export default History;