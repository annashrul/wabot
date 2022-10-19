import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { RootContext } from '../../Context';
import Loading from '../../components/loading/Loading';
import AuthAPI from '../../api/Auth';

const DeepClone = require('rfdc')();
toast.configure();

class EditUser extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user: DeepClone(this.props.user)
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(event){
        let data = this.state.user;

        data[event.target.name] = event.target.value;

        this.setState({
            user: data
        })
    }

    handleUpdate() {
        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new URLSearchParams({
                name: this.state.user.name,
                email: this.state.user.email
            })

            AuthAPI.update(dataForm).then((result) => {
                if(result.status === 200) {
                    /* Update Success */
                    this.context.fetch();
                    toast.success(`Edit Profile Success`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    $('#edit-user-modal').modal('toggle');
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Edit Profile Failed (Status ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                        $('#edit-user-modal').modal('toggle');
                    })
                }
            })
        })
    }

    componentDidMount() {
        $('#edit-user-modal').on('hidden.bs.modal', () => {
            this.props.toggle();
        })
    }

    render() { 
        return (
            <React.Fragment>
                <Loading show={this.state.isLoading} />
                <div className="modal fade" id="edit-user-modal" tabIndex="-1" aria-labelledby="editmodal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label style={{fontSize: '1rem', fontWeight: 500}}>Name</label>
                                    <input value={this.state.user.name} onChange={this.handleChange} type="text" name="name" placeholder="Enter Your Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label style={{fontSize: '1rem', fontWeight: 500}}>Email</label>
                                    <input value={this.state.user.email} onChange={this.handleChange} type="email" name="email" placeholder="Enter Your Email" className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleUpdate} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default EditUser;