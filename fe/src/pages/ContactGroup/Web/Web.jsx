import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';
import { RootContext } from '../../../Context';
import { Edit2, Trash2, UserPlus } from 'react-feather';
import ContactAPI from '../../../api/Contact';

toast.configure();

class Web extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            
            data: [],
            contact: {
                id: 0,
                contact_name: "",
                contact_number: "",
                method: "CREATE"
            }
        }

        this.fetchNow = this.fetchNow.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.modalCreate = this.modalCreate.bind(this);
        this.create = this.create.bind(this);

        this.modalUpdate = this.modalUpdate.bind(this);
        this.update = this.update.bind(this);

        this.delete = this.delete.bind(this);
    }

    fetchNow(cb) {
        this.setState({
            isLoading: true
        }, () => {
            ContactAPI.get().then((result) => {
                let data = [];

                if(result.status === 200) {
                    data = result.data;
                }

                if($.fn.dataTable.isDataTable('#web-contact-table')) {
                    $('#web-contact-table').DataTable().destroy();
                }

                this.setState({
                    isLoading: false,
                    data
                }, () => {
                    var table = $('#web-contact-table').DataTable({
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

                    if(cb) cb();
                })
            })
        })
    }

    handleChange(event) {
        let data = this.state.contact;

        data[event.target.name] = event.target.value;

        this.setState({
            contact: data
        })
    }

    modalCreate() {
        this.setState({
            contact: {
                id: 0,
                contact_name: "",
                contact_number: "",
                method: "CREATE"
            }
        }, () => { $('#contact-modal').modal('toggle') })
    }

    create() {
        this.setState({
            isLoading: true
        }, () => {
            let dataForm = new FormData();

            dataForm.append("contact_name", this.state.contact.contact_name);
            dataForm.append("contact_number", ("62" + this.state.contact.contact_number));

            ContactAPI.create(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow(this.props.fetchTotal());
                    $('#contact-modal').modal('toggle');
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#contact-modal').modal('toggle');

                        toast.error(`Create Contact Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    modalUpdate(event) {
        let target = this.state.data[parseInt(event.currentTarget.getAttribute('index'))];
        let phone = parseInt(target.contact_number.substring(2));

        this.setState({
            contact: {
                id: target.id,
                contact_name: target.contact_name,
                contact_number: phone,
                method: "UPDATE"
            }
        }, () => { $('#contact-modal').modal('toggle') })
    }

    update() {
        this.setState({
            isLoading: true
        }, () => {
            let dataForm = new URLSearchParams({
                id: this.state.contact.id,
                contact_name: this.state.contact.contact_name,
                contact_number: ("62" + this.state.contact.contact_number)
            })

            ContactAPI.update(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow();
                    $('#contact-modal').modal('toggle');
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#contact-modal').modal('toggle');

                        toast.error(`Edit Contact Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    delete(event) {
        let id = event.currentTarget.getAttribute('id');
        this.setState({
            isLoading: true
        }, () => {
            let dataForm = new URLSearchParams({
                id: id
            })

            ContactAPI.delete(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow(this.props.fetchTotal());
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Delete Contact Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
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
                            <div className="card-header pt-4 pb-4">
                                <div className="row">
                                    <div className="col-12 col-lg text-center text-lg-left mb-3 mb-lg-0">
                                        <h5 className="mt-2">Web Contact</h5>
                                    </div>
                                    <div className="col-12 col-lg-2 pl-lg-0">
                                        <button onClick={this.modalCreate} className="btn btn-success w-100 d-flex align-items-center justify-content-center mb-2 p-2"><UserPlus size={16} className="mr-2"/>Add Contact</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="datatable">
                                    <table className="table table-hover responsive-table" id="web-contact-table">
                                        <thead>
                                            <tr>
                                                <th width="7.5%">#</th>
                                                <th width="30%">Name</th>
                                                <th>Phone Number</th>
                                                <th width="30%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td style={{paddingTop: '1rem'}}></td>
                                                            <td style={{paddingTop: '1rem'}}>{value.contact_name}</td>
                                                            <td style={{paddingTop: '1rem'}}>{value.contact_number}</td>
                                                            <td className="d-flex">
                                                                <button onClick={this.modalUpdate} index={index} className="btn btn-info d-flex align-items-center mr-1"><Edit2 size={15} className="mr-1"/>Edit</button>
                                                                <button onClick={this.delete} id={value.id} className="btn btn-danger d-flex align-items-center mr-1"><Trash2 size={15} className="mr-1"/>Delete</button>
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
                </div>

                <div className="modal fade" id="contact-modal" tabIndex="-1" aria-labelledby="contact modal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.state.contact.method === "CREATE" ? "Add New " : "Edit "}Contact</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label style={{fontSize: '1rem', fontWeight: 500}}>Name</label>
                                    <input value={this.state.contact.contact_name} onChange={this.handleChange} type="text" name="contact_name" placeholder="Enter Contact Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label style={{fontSize: '1rem', fontWeight: 500}}>Phone Number</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">+62</div>
                                        </div>
                                        <input value={this.state.contact.contact_number} onChange={this.handleChange} type="number" name="contact_number" placeholder="Enter Phone Number" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {
                                    this.state.contact.method === "CREATE"
                                    ? <button className="btn btn-success" onClick={this.create}>Add</button>
                                    : <button className="btn btn-primary" onClick={this.update}>Save</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Web;