import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Eye, EyeOff } from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'reactstrap';
import { toast } from 'react-toastify';
import { PageControl } from '../../components/Handler';
import Loading from '../../components/loading/Loading';
import { RootContext } from '../../Context';
import AuthAPI from '../../api/Auth';
import { Helmet } from 'react-helmet';

toast.configure();

class Register extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isShow: 'password',
            isSuccess: null,

            data: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            error: {
                password: null,
                password_confirmation: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleRequirement = this.handleRequirement.bind(this);

        this.toggleShow = this.toggleShow.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let data = this.state.data;

        data[event.target.name] = event.target.value;

        this.setState({
            data: data
        })
    }

    handleConfirmation() {
        let data = this.state.data;

        if(data.password === data.password_confirmation && data.password !== "" && data.password_confirmation !== "") {
            return true;
        }else if(data.password === "" && data.password_confirmation === ""){
            return true;
        }else{
            return false;
        }
    }

    handleRequirement() {
        let password = this.state.data.password;
        
        if(password !== "" && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password)){
            return (
                <React.Fragment>
                    { (!/^(?=.{8,})/.test(password)) && <React.Fragment>Password must be eight characters or longer <br/></React.Fragment> }
                    { (!/^(?=.*[A-Z])/.test(password)) && <React.Fragment>Password must contain at least 1 uppercase character <br/></React.Fragment> }
                    { (!/^(?=.*[a-z])/.test(password)) && <React.Fragment>Password must contain at least 1 lowercase character <br/></React.Fragment> }
                    { (!/^(?=.*[0-9])/.test(password)) && <React.Fragment>Password must contain at least 1 numeric character <br/></React.Fragment> }
                </React.Fragment>
            )
        }else{
            return null;
        }
    }

    toggleShow() {
        this.setState({
            isShow: this.state.isShow === 'password' ? 'text' : 'password'
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new FormData();

            dataForm.append("name", this.state.data.name);
            dataForm.append("email", this.state.data.email);
            dataForm.append("password", this.state.data.password);
            dataForm.append("password_confirmation", this.state.data.password_confirmation);

            AuthAPI.register(dataForm).then((result) => {
                if(result.status === 200) {
                    /* Register Success */
                    this.setState({
                        isLoading: false,
                        isSuccess: <Redirect to="/login" />
                    }, () => {
                        toast.success("Creating Account Success! You can login to your account now!", {
                            position: toast.POSITION.TOP_CENTER
                        })
                    })
                }else if(result.status === 400) {
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(result.message || `Creating Account Failed (${result.status})` , {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Creating Account Failed (${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    render() { 
        return (
            <PageControl type="auth">
                { this.state.isSuccess }
                <Helmet title={"Register - " + process.env.REACT_APP_WEB_NAME} />
                <Loading show={this.state.isLoading} />
                <Container fluid={true} className="p-0">
                    <div className="row m-0">
                        <div className="col-12 p-0">
                            <div className="login-card">
                                <div className="login-main">
                                    <Form className="theme-form" onSubmit={this.handleSubmit}>
                                        <h4 className="text-lg-center">Register Your Account</h4>
                                        <p className="text-lg-center">Enter your personal detail to create account</p>
                                        <div className="form-group">
                                            <label className="col-form-label">Name</label>
                                            <input tabIndex={1} value={this.state.data.name} onChange={this.handleChange} name="name" className="form-control" type="text" placeholder="Enter your name" autoComplete="name" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Email Address</label>
                                            <input tabIndex={2} value={this.state.data.email} onChange={this.handleChange} name="email" className="form-control" type="email" placeholder="Enter email address" autoComplete="email" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Password</label>
                                            <div className="input-group">
                                                <input tabIndex={3} value={this.state.data.password} onChange={this.handleChange} name="password" className={`form-control ${this.handleRequirement() === null ? "" : " is-invalid"}`} type={this.state.isShow} placeholder="Enter password" autoComplete="new-password" />
                                                <div className="input-group-append">
                                                    <button className="btn bt-icon btn-primary px-2 py-0 d-flex align-items-center" type="button" onClick={this.toggleShow}>{ (this.state.isShow === 'password') ? <Eye size={16}/> : <EyeOff size={16}/> }</button>
                                                </div>
                                                <div className="invalid-feedback">{this.handleRequirement()}</div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="col-form-label">Password Confirmation</label>
                                            <input tabIndex={4} value={this.state.data.password_confirmation} onChange={this.handleChange} name="password_confirmation" className={`form-control ${this.handleConfirmation() ? "" : " is-invalid"}`} type={this.state.isShow} placeholder="Enter password again" autoComplete="new-password" />
                                            <div className="invalid-feedback">Password doesn't match</div>
                                        </div>
                                        <div className="form-group mb-0 text-lg-center">
                                            <button tabIndex={5} className="btn btn-primary btn-block">Sign Up</button>
                                            <p className="mt-4 mb-0">Already have an account?<Link to="/login" className="ml-1">Login</Link></p>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </PageControl>
        );
    }
}
 
export default Register;