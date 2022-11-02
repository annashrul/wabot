import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, FormGroup, Label } from 'reactstrap';
import { InputData } from '../../components/Form';
import { PageControl } from '../../components/Handler';
import Loading from '../../components/loading/Loading';
import { RootContext } from '../../Context';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'react-feather';
import AuthAPI from '../../api/Auth';
import { Helmet } from 'react-helmet';
toast.configure();

class Login extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.state = {
            isPassShow: false,
            isLoading: false,
            data: {
                email: new InputData(),
                password: new InputData()
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    handleChange(event) {
        let value = this.state.data;

        value[event.target.name].data = event.target.value;

        this.setState({
            data: value
        })
    }

    submitLogin(event) {
        event.preventDefault();

        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new FormData();

            dataForm.append("email", this.state.data.email.data);
            dataForm.append("password", this.state.data.password.data);

            AuthAPI.login(dataForm).then((result) => {
                if(result.status === 200) {
                    /* Login Success */
                    localStorage.setItem('token', result.data.access_token);
                    window.location.reload();
                }else{
                    /* Handle Error */
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Email or Password is Wrong`, {
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
                <Helmet title={"Login - " + process.env.REACT_APP_WEB_NAME} />
                <Container fluid={true} className="p-0">
                    <Loading show={this.state.isLoading} />
                    <div className="row m-0">
                        <div className="col-12 p-0">
                            <div className="login-card">
                                <div className="login-main">
                                    <form className="theme-form" onSubmit={this.submitLogin}>
                                        <h4 className="text-lg-center">Sign In to {process.env.REACT_APP_WEB_NAME}</h4>
                                        <p className="text-lg-center">Use Your Account's Credential</p>
                                        <FormGroup>
                                            <Label className="col-form-label">Email Address</Label>
                                            <input tabIndex={1} name="email" value={this.state.data.email.data} onChange={this.handleChange} className="form-control" type="email" autoComplete="email" placeholder="Enter email address" />
                                        </FormGroup>
                                        <FormGroup className="mb-4">
                                            <Label className="col-form-label">Password</Label>
                                            <div className="input-group">
                                                <input tabIndex={2} name="password" value={this.state.data.password.data} onChange={this.handleChange} className="form-control" type={this.state.isPassShow ? "text" : "password"} autoComplete="password" placeholder="Enter password"/>
                                                <div className="input-group-append">
                                                    <button tabIndex={-1} className="btn bt-icon btn-primary px-2 py-0 d-flex align-items-center" type="button" onClick={() => { this.setState({ isPassShow: this.state.isPassShow ? false : true }) }}>{ (!this.state.isPassShow) ? <Eye size={16}/> : <EyeOff size={16}/> }</button>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <div className="form-group mb-0 text-lg-center">
                                            <Button tabIndex={3} color="primary" className="btn-block" type="submit">Sign In</Button>
                                            <p className="mt-4 mb-0">Don't have account?<Link tabIndex={-1} to="/register" className="ml-1">Register</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </PageControl>
        );
    }
}
 
export default Login;