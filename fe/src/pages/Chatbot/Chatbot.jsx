import React, { Component } from 'react';
import { GitPullRequest, Globe, HelpCircle, MoreHorizontal, Plus, User, Users } from 'react-feather';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import { toast } from 'react-toastify';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import DeviceAPI from '../../api/Device';
import RuleAPI from '../../api/Chatbot/Rule';

import Breadcrumbs from '../../components/Breadcrumb';
import Loading from '../../components/loading/Loading';

const DeepClone = require('rfdc')();

class Chatbot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            device: [],
            data: [],

            modal: {
                id: '',
                id_device: '',
                rule_name: '',
                target: ''
            }
        }

        this.fetchNow = this.fetchNow.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.modalCreate = this.modalCreate.bind(this);
        this.create = this.create.bind(this);

        this.modalUpdate = this.modalUpdate.bind(this);
        this.update = this.update.bind(this);

        this.modalDelete = this.modalDelete.bind(this);
        this.delete = this.delete.bind(this);
    }

    /* === Core Process ========================================================= */

    findById(target, data) {
        for(let value of data) {
            if(parseInt(target) === value.id) {
                return value;
            }
        }

        return null;
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            RuleAPI.get().then((result) => {
                /* Assign Variable */
                let data = [];

                /* Store if There is Rule */
                if(result.status === 200 && result.data.rule) {
                    for(let value of result.data.rule) {
                        let temp = value;

                        temp.id_device = this.findById(value.id_device, this.state.device);

                        data.push(temp);
                    }
                }

                /* Remove Datatable */
                if($.fn.dataTable.isDataTable('#rule-table')) {
                    $('#rule-table').DataTable().destroy();
                }

                this.setState({
                    isLoading: false,
                    data
                }, () => {
                    /* Initialize New Datatable */
                    var table = $('#rule-table').DataTable({
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

    handleChange(event) {
        let modal = this.state.modal;

        modal[event.target.name] = event.target.value;

        this.setState({
            modal
        })
    }

    /* === Create Rule ========================================================== */

    modalCreate() {
        this.setState({
            modal: {
                id: '',
                id_device: '',
                rule_name: '',
                target: ''
            }
        }, () => { $('#modal-create').modal('show') })
    }

    create() {
        this.setState({
            isLoading: true
        }, () => {
            /* Store Request Body */
            let body = new URLSearchParams({
                id_device: parseInt(this.state.modal.id_device),
                rule_name: this.state.modal.rule_name,
                target: this.state.modal.target
            })

            /* Request */
            RuleAPI.create(body).then((result) => {
                if(result.status === 200) {
                    /* Handle Success */
                    this.fetchNow();

                    $('#modal-create').modal('hide');

                    toast.success(`Chatbot Rule Created Succesfully`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    /* Handle Error/Failed */
                    this.setState({
                        isLoading: false
                    }, () => {
                        // $('#modal-create').modal('hide');

                        toast.error(`Create Chatbot Rule Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    /* === Update Rule ========================================================== */

    modalUpdate(data, type) {
        /* Store Data */
        let modal = DeepClone(data), target = '#modal-' + type;

        /* Store Id Device */
        modal.id_device = data.id_device.id;

        /* Update */
        this.setState({
            modal
        }, () => { $(target).modal('show') })
    }

    update(type, modal_type) {
        /* Store Target */
        let target = type, modal = '#modal-' + modal_type;

        this.setState({
            isLoading: true
        }, () => {
            /* Store Body Request */
            let body = new URLSearchParams({
                [target]: this.state.modal[target]
            })

            /* Request Update */
            RuleAPI.update(this.state.modal.id, body).then((result) => {
                if(result.status === 200) {
                    /* Handle Success */
                    this.fetchNow();

                    $(modal).modal('hide');

                    toast.success(`Chatbot Rule Updated Succesfully`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    /* Handle Error/Failed */
                    this.setState({
                        isLoading: false
                    }, () => {
                        $(modal).modal('hide');

                        toast.error(`Update Chatbot Rule Data Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    /* === Delete Rule ========================================================== */

    modalDelete(modal) {
        this.setState({
            modal
        }, () => { $('#modal-delete').modal('show') })
    }

    delete() {
        this.setState({
            isLoading: true
        }, () => {
            /* Request Delete */
            RuleAPI.delete(this.state.modal.id).then((result) => {
                if(result.status === 200) {
                    /* Handle Success */
                    this.fetchNow();

                    $('#modal-delete').modal('hide');

                    toast.success(`Chatbot Rule Removed Succesfully`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    /* Handle Error/Failed */
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#modal-delete').modal('hide');

                        toast.error(`Remove Chatbot Rule Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    /* === Badge by Target ====================================================== */

    badge(target) {
        if(target === 'default') {
            return (
                <span className="rule-badge default-badge">
                    <Globe size={15} style={{marginBottom: '-3px'}} className="mr-2"/>
                    <span>Default</span>
                </span>
            )
        }else if(target === 'contact') {
            return (
                <span className="rule-badge contact-badge">
                    <User size={15} style={{marginBottom: '-3px'}} className="mr-2"/>
                    <span>Contact</span>
                </span>
            )
        }else if(target === 'group') {
            return (
                <span className="rule-badge group-badge">
                    <Users size={15} style={{marginBottom: '-3px'}} className="mr-2"/>
                    <span>Group</span>
                </span>
            )
        }else{
            return null;
        }
    }

    componentDidMount() {
        /* Initialize Tooltip */
        $('[data-toggle="tooltip"]').tooltip();

        /* Get Device Data */
        this.setState({
            isLoading: true
        }, () => {
            DeviceAPI.get().then((result) => {
                this.setState({
                    device: result.status === 200 ? result.data : []
                }, () => {
                    this.fetchNow();
                })
            })
        })
    }

    render() { 
        return (
            <React.Fragment>
                <Helmet title={"Chatbot - " + process.env.REACT_APP_WEB_NAME} />
                <Loading show={this.state.isLoading} />
                <Breadcrumbs title="Chatbot" />

                <Container fluid={false}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header py-4">
                                    <div className="mx-0 d-flex align-items-center justify-content-between">
                                        <h5 className="m-0 pt-1">Rule List</h5>
                                        <button onClick={this.modalCreate} className="btn btn-success d-flex align-items-center px-3">
                                            <Plus className="mr-2" size={18} style={{marginTop: '-2px'}}/>
                                            Create Rule
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body" style={{paddingTop: '2rem', paddingBottom: '2.5rem'}}>
                                    <table className="table-striped responsive-table" id="rule-table">
                                        <thead>
                                            <tr>
                                                <th width="5%">#</th>
                                                <th>Device</th>
                                                <th>Rule Name</th>
                                                <th>Target</th>
                                                <th width="25%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map((value, index) => {                                                    
                                                    return (
                                                        <tr key={index}>
                                                            <td></td>
                                                            <td>{value.id_device.name}</td>
                                                            <td>{value.rule_name}</td>
                                                            <td>{this.badge(value.target)}</td>
                                                            <td className="d-flex">
                                                            <Link to={`/chatbot/${value.id}`} className="btn btn-dark d-flex align-items-center mr-1 px-3 text-nowrap"><GitPullRequest size={15} className="mr-2"/>Chatbot Builder</Link>
                                                                <div className="dropdown">
                                                                    <button className="btn btn-dark px-2 d-flex align-items-center" data-toggle="dropdown"><MoreHorizontal size={21}/></button>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <button onClick={this.modalUpdate.bind(this, value, 'rename')} className="dropdown-item w-100" type="button">Rename Chatbot</button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={this.modalUpdate.bind(this, value, 'target')} className="dropdown-item w-100" type="button">Change Target</button>
                                                                        <button onClick={this.modalUpdate.bind(this, value, 'device')} className="dropdown-item w-100" type="button">Change Device</button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={this.modalDelete.bind(this, value)} className="dropdown-item w-100" type="button">Remove Chatbot</button>
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

                <div className="modal fade" id="modal-create" tabIndex="-1" aria-labelledby="modal-create" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Rule</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input value={this.state.modal.rule_name} onChange={this.handleChange} type="text" name="rule_name" placeholder="Enter Chatbot Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Device</label>
                                    <select value={this.state.modal.id_device} onChange={this.handleChange} name="id_device" className="form-control">
                                        <option value="" disabled>-- Choose Device --</option>
                                        {
                                            this.state.device.map((value, index) => {
                                                return (
                                                    <option value={value.id} key={index}>{value.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-2">
                                        <label className="form-label mb-0 mr-1">Chatbot Target</label>
                                        <HelpCircle style={{cursor: 'help'}} size={18} data-toggle="tooltip" data-placement="right" title="Choose Who Allowed to Use Your Chatbot. Contact Only, Group Only, or Default for Everyone"  />
                                    </div>
                                    <select value={this.state.modal.target} onChange={this.handleChange} name="target" className="form-control">
                                        <option value="" disabled>-- Choose Target --</option>
                                        <option value="default">Default</option>
                                        <option value="group">Group</option>
                                        <option value="contact">Contact</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-outline-success">Cancel</button>
                                <button onClick={this.create} className="btn btn-success">Create</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-rename" tabIndex="-1" aria-labelledby="modal-rename" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Rename Chatbot</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input value={this.state.modal.rule_name} onChange={this.handleChange} type="text" name="rule_name" placeholder="Enter Chatbot Name" className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-outline-primary">Cancel</button>
                                <button onClick={this.update.bind(this, 'rule_name', 'rename')} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-target" tabIndex="-1" aria-labelledby="modal-target" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change Target</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-2">
                                        <label className="form-label mb-0 mr-1">Chatbot Target</label>
                                        <HelpCircle style={{cursor: 'help'}} size={18} data-toggle="tooltip" data-placement="right" title="Choose Who Allowed to Use Your Chatbot. Contact Only, Group Only, or Default for Everyone"  />
                                    </div>
                                    <select value={this.state.modal.target} onChange={this.handleChange} name="target" className="form-control">
                                        <option value="" disabled>-- Choose Target --</option>
                                        <option value="default">Default</option>
                                        <option value="group">Group</option>
                                        <option value="contact">Contact</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-outline-primary">Cancel</button>
                                <button onClick={this.update.bind(this, 'target', 'target')} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-device" tabIndex="-1" aria-labelledby="modal-device" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change Device</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Device</label>
                                    <select value={this.state.modal.id_device} onChange={this.handleChange} name="id_device" className="form-control">
                                        <option value="" disabled>-- Choose Device --</option>
                                        {
                                            this.state.device.map((value, index) => {
                                                return (
                                                    <option value={value.id} key={index}>{value.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-outline-primary">Cancel</button>
                                <button onClick={this.update.bind(this, 'id_device', 'device')} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-delete" tabIndex="-1" aria-labelledby="modal-delete" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Remove Chatbot</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Chatbot will be removed permanently. Are you sure?
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-outline-danger">Cancel</button>
                                <button onClick={this.delete} className="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Chatbot;