import React, { Component } from 'react';
import { MoreHorizontal, PlusCircle, Users } from 'react-feather';
import $ from 'jquery';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';
import { RootContext } from '../../../Context';
import { Typeahead } from 'react-bootstrap-typeahead';
import CategoryAPI from '../../../api/Category';
import ContactAPI from '../../../api/Contact';

toast.configure();

class Category extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            isChoice: false,
            index: 0,

            data: [],
            category: {
                id: "",
                category_name: "",
                method: "CREATE",
                member: []
            },

            contact: [],
            selected: []
        }

        this.addRef = React.createRef();

        this.fetchNow = this.fetchNow.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.modalCreate = this.modalCreate.bind(this);
        this.create = this.create.bind(this);

        this.modalUpdate = this.modalUpdate.bind(this);
        this.change = this.change.bind(this);

        this.modalDetail = this.modalDetail.bind(this);
        this.modalAddMember = this.modalAddMember.bind(this);
        
        this.fetchMember = this.fetchMember.bind(this);
        this.setSelected = this.setSelected.bind(this);
        
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
    }

    fetchNow(cb) {
         this.setState({
            isLoading: true
        }, () => {
            CategoryAPI.get().then((result) => {
                let data = [];

                if(result.status === 200) {
                    data = result.data;
                }

                if($.fn.dataTable.isDataTable('#category-table')) {
                    $('#category-table').DataTable().destroy();
                }

                this.setState({
                    isLoading: false,
                    data
                }, () => {
                    var table = $('#category-table').DataTable({
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
        let data = this.state.category;

        data[event.target.name] = event.target.value;

        this.setState({
            category: data
        })
    }

    modalCreate() {
        this.setState({
            category: {
                id: "",
                category_name: "",
                method: "CREATE",
                member: []
            }
        }, () => { $('#category-modal').modal('toggle') })
    }

    create() {
        this.setState({
            isLoading: true
        }, () => {
            let dataForm = new URLSearchParams({
                category_name: this.state.category.category_name
            })

            CategoryAPI.create(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow(this.props.fetchTotal);
                    $('#category-modal').modal('toggle');
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#category-modal').modal('toggle');

                        toast.error(`Create Category Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    modalUpdate(event) {
        let target = this.state.data[parseInt(event.currentTarget.getAttribute('index'))];

        this.setState({
            category: {
                id: target.id,
                category_name: target.category_name,
                method: "UPDATE",
                member: []
            }
        }, () => { $('#category-modal').modal('toggle') })
    }

    change(method, event) {
        let id = event.currentTarget.getAttribute('id') || "";

        this.setState({
            isLoading: true
        }, () => {
            if(method === "PUT") {
                let dataForm = new URLSearchParams({
                    id: this.state.category.id,
                    category_name: this.state.category.category_name,
                })

                CategoryAPI.update(dataForm).then((result) => {
                    if(result.status === 200) {
                        this.fetchNow();
                        $('#category-modal').modal('toggle');
                    }else{
                        this.setState({
                            isLoading: false
                        }, () => {
                            $('#category-modal').modal('toggle');

                            toast.error(`Change Category Name Failed (Status ${result.status})`, {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                    }
                })
            }else{
                let dataForm = new URLSearchParams({
                    id: id
                })

                CategoryAPI.delete(dataForm).then((result) => {
                    if(result.status === 200) {
                        this.fetchNow(this.props.fetchTotal);
                    }else{
                        this.setState({
                            isLoading: false
                        }, () => {
                            toast.error(`Delete Category Failed (Status ${result.status})`, {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                    }
                })
            }
        })
    }

    fetchMember() {
        let value = this.state.data[this.state.index];

        this.setState({
            isLoading: true
        }, () => {
            CategoryAPI.getMember(value.id).then((result) => {
                let category = this.state.category;

                if(result.status === 200) {
                    category.member = result.member ? result.member : [];
                    category.category_name = value.category_name;
                    category.id = value.id;
                }

                if($.fn.dataTable.isDataTable('#detail-table')) {
                    $('#detail-table').DataTable().destroy();
                }

                this.setState({
                    isLoading: false,
                    isChoice: false,
                    category
                }, () => {
                    var table = $('#detail-table').DataTable({
                        columnDefs: [ {
                            searchable: false,
                            orderable: false,
                            targets: 0
                        } ],
                        order: [[ 1, 'asc' ]],
                        paging: false,
                        info: false,
                        searching: false
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

    modalDetail(event) {
        let index = event.currentTarget.getAttribute('index');

        this.setState({
            index: index
        }, () => {
            this.fetchMember();
            $('#detail-modal').modal('toggle');
        })
    }

    removeMember(event) {
        let target = parseInt(event.currentTarget.getAttribute('id'));

        this.setState({
            isLoading: true
        }, () => {
            let dataForm = new URLSearchParams({
                id_category: this.state.category.id,
                id_member: target,
            })

            CategoryAPI.removeMember(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow(this.fetchMember());
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Remove Member Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    modalAddMember() {
        this.setState({
            isLoading: true
        }, () => {
            ContactAPI.get().then((result) => {
                let contact = [];

                if(result.status === 200) {
                    loop: for(let value of result.data) {
                        for(let value2 of this.state.category.member) {
                            if(value2.id_contact === value.id) {
                                continue loop;
                            }
                        }
                        contact.push(value);
                    }
                }

                this.setState({
                    isLoading: false,
                    isChoice: true,
                    selected: [],
                    contact
                }, () => {
                    this.addRef.current.focus();
                })
            })
        })
    }

    setSelected(value) {
        this.setState({
            selected: value
        })
    }

    addMember() {
        this.setState({
            isLoading: true
        }, async () => {
            let isError = false;

            for(let value of this.state.selected) {
                let status;

                let dataForm = new URLSearchParams({
                    id_category: this.state.category.id,
                    id_contact: value.id
                })

                await CategoryAPI.addMember(dataForm).then((result) => {
                    status = result.status;
                })

                if(status !== 200) {
                    isError = true;
                    break;
                }
            }

            this.setState({
                isLoading: false,
                isChoice: false
            }, () => {
                if(!isError) {
                    this.fetchNow(this.fetchMember());
                }else{
                    toast.error(`Add Member Partialy Failed`, {
                        position: toast.POSITION.TOP_CENTER
                    });
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
                                        <h5 className="mt-2">Category</h5>
                                    </div>
                                    <div className="col-12 col-lg-3 d-flex justify-content-lg-end justify-content-center">
                                        <button onClick={this.modalCreate} className="btn btn-info d-flex align-items-center mb-2 p-2 px-3"><PlusCircle size={16} className="mr-2"/>Create Category</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="datatable">
                                    <table className="table table-hover responsive-table" id="category-table">
                                        <thead>
                                            <tr>
                                                <th width="7.5%">#</th>
                                                <th width="40%">Category Name</th>
                                                <th>Member</th>
                                                <th width="25%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td style={{paddingTop: '14px'}}></td>
                                                            <td style={{paddingTop: '14px'}}>{value.category_name}</td>
                                                            <td className="d-flex align-items-center" style={{paddingTop: '14px'}}><Users className="mr-2" size={16} />{`${value.jumlah_member ? value.jumlah_member : "0"} Contact`}</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <button onClick={this.modalDetail} index={index} className="btn btn-primary d-flex align-items-center mr-1"><Users size={15} className="mr-1"/>Member</button>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-primary px-2 d-flex align-items-center" data-toggle="dropdown"><MoreHorizontal size={21}/></button>
                                                                        <div className="dropdown-menu dropdown-menu-right">
                                                                            <button onClick={this.modalUpdate} index={index} className="dropdown-item w-100" type="button">Rename Category</button>
                                                                            <button onClick={this.change.bind(this, "DELETE")} id={value.id} className="dropdown-item w-100" type="button">Delete Category</button>
                                                                        </div>
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
                </div>

                <div className="modal fade" id="category-modal" tabIndex="-1" aria-labelledby="categorymodal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.state.category.method === "CREATE" ? "Add New " : "Rename "}Category</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label style={{fontSize: '1rem', fontWeight: 500}}>Name</label>
                                    <input value={this.state.category.category_name} onChange={this.handleChange} type="text" name="category_name" placeholder="Enter Category Name" className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {
                                    this.state.category.method === "CREATE"
                                    ? <button className="btn btn-success" onClick={this.create}>Add</button>
                                    : <button className="btn btn-primary" onClick={this.change.bind(this, "PUT")}>Rename</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="detail-modal" tabIndex="-1" aria-labelledby="Category Detail" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.state.category.category_name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pb-5">
                                {
                                    this.state.isChoice 
                                    ?   <div className="form-group">
                                            <label style={{fontSize: '1rem', fontWeight: 500}}>Add Member</label>
                                            <div className="input-group">
                                                <Typeahead onChange={this.setSelected} selected={this.state.selected} options={this.state.contact} labelKey={(option) => `${option.contact_name} (${option.contact_number})`} multiple placeholder="Search" id="typeAdd" ref={this.addRef} />
                                                <div className="input-group-append">
                                                    <button onClick={this.addMember} className="btn btn-success px-3">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    :   <React.Fragment>
                                            <div className="form-group d-flex justify-content-between align-items-center">
                                                <label className="m-0 p-0" style={{fontSize: '1rem', fontWeight: 500}}>Member List</label>
                                                <button className="btn px-3 btn-success" onClick={this.modalAddMember}>Add Member</button>
                                            </div>
                                            <div className="datatable">
                                                <table className="table table-striped table-hover responsive-table" id="detail-table">
                                                    <thead>
                                                        <tr>
                                                            <th width="5%">#</th>
                                                            <th width="40%">Name</th>
                                                            <th>Number</th>
                                                            <th width="20%">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.category.member.map((value, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td style={{paddingTop: '14px'}}></td>
                                                                        <td style={{paddingTop: '14px'}}>{value.contact_name}</td>
                                                                        <td style={{paddingTop: '14px'}}>{value.contact_number}</td>
                                                                        <td>
                                                                            <button onClick={this.removeMember} id={value.id_member} className="btn btn-sm btn-danger px-2">Remove</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Category;