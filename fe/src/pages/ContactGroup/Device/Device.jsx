import React, { Component } from 'react';
import $ from 'jquery';
import {toast} from 'react-toastify';
import Loading from '../../../components/loading/Loading.jsx';
import { RootContext } from '../../../Context.js';
import CoreAPI from '../../../api/Core.jsx';
import DeviceAPI from '../../../api/Device.jsx';

toast.configure();

class Device extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            choice: "",

            device: [],
            data: []
        }

        this.fetchNow = this.fetchNow.bind(this);
        this.fetchContact = this.fetchContact.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.handleSync = this.handleSync.bind(this);
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            DeviceAPI.get().then((result) => {
                /* Assign Variable */
                let device = [], choice = '';

                /* Store Device Data if There is Device */
                if(result.status === 200 && result.data.length > 0) {
                    choice = 0;
                    device = result.data;
                }

                this.setState({
                    isLoading: false,
                    choice, device
                }, () => {
                    if(this.state.choice !== '') {
                        /* Get Data from Default Device */
                        this.fetchContact();
                    }else{
                        /* Handle Empty Device */
                        var table = $('#contact-table').DataTable({
                            columnDefs: [ {
                                searchable: false,
                                orderable: false,
                                targets: 0
                            } ],
                            order: [[ 1, 'asc' ]]
                        });

                        table.on('order.dt search.dt', function () {
                            table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                                cell.innerHTML = i+1;
                            });
                        }).draw();
                    }
                })
            })
        })
    }

    fetchContact(cb) {
        this.setState({
            isLoading: true
        }, () => {
            CoreAPI.getContact(this.state.device[this.state.choice].id).then((result) => {
                /* Assign Variable */
                let data = [];

                /* Store Result */
                if(result.status === 200) {
                    data = result.data;
                }

                /* Remove Current Datatable */
                if($.fn.dataTable.isDataTable('#contact-table')) {
                    $('#contact-table').DataTable().destroy();
                }

                this.setState({
                    isLoading: false,
                    data
                }, () => {
                    /* Add New Datatable Config */
                    var table = $('#contact-table').DataTable({
                        columnDefs: [ {
                            searchable: false,
                            orderable: false,
                            targets: 0
                        } ],
                        order: [[ 1, 'asc' ]]
                    });

                    table.on('order.dt search.dt', function () {
                        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                            cell.innerHTML = i+1;
                        });
                    }).draw();

                    /* If Callback Exist */
                    if(cb) cb();
                })
            })
        })
    }

    handleSync() {
        this.setState({
            isLoading: true
        }, () => {
            CoreAPI.syncContact(this.state.device[this.state.choice].id).then((result) => {
                if(result.status === 200) {
                    this.fetchContact(this.props.fetchTotal());
                    
                    toast.success("Contact Successfully Synced", {
                        position: toast.POSITION.TOP_CENTER
                    })
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error("Sync Failed, Please Try Again", {
                            position: toast.POSITION.TOP_CENTER
                        })
                    })
                }
            })
        })
    }

    handleChange(event) {
        this.setState({
            choice: event.target.value
        }, () => { this.fetchContact() })
    }

    componentDidMount() {
        this.fetchNow();
    }

    render() { 
        return (
            <React.Fragment>
                <Loading show={this.state.isLoading} />
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header pt-4 pb-2">
                                <div className="row">
                                    <div className="col-12 col-md text-center text-lg-left mb-3 mb-lg-0">
                                        <h5 className="mt-2">Whatsapp Contact</h5>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <select value={this.state.choice} onChange={this.handleChange} className="custom-select sync">
                                                    <option value="" disabled>— Choose Device —</option>
                                                    {
                                                        this.state.device.map((value, index) => {
                                                            return (
                                                                <option key={index} value={index}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {
                                                    this.state.choice !== "" &&
                                                    <div className="input-group-append">
                                                        <button onClick={this.handleSync} className="btn btn-primary px-3" type="button"><i className="icofont icofont-refresh mr-2"></i>Sync</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="datatable">
                                    <table className="table table-hover" id="contact-table">
                                        <thead>
                                            <tr>
                                                <th width="7.5%"></th>
                                                <th width="40%">Name</th>
                                                <th>Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td></td>
                                                            <td>{value.name}</td>
                                                            <td>{value.jid}</td>
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
                </div>
            </React.Fragment>
        );
    }
}
 
export default Device;