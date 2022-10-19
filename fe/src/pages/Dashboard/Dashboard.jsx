import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Globe, Info, Mail, MoreHorizontal, Send } from 'react-feather';
import $ from 'jquery';
import moment from 'moment';
import Breadcrumbs from '../../components/Breadcrumb';
import Loading from '../../components/loading/Loading';
import { RootContext } from '../../Context';
import Style from './Dashboard.module.scss';
import CountUp from 'react-countup';
import EditUser from '../../others/user/EditUser';
import AuthAPI from '../../api/Auth';

class Dashboard extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            editProfile: false,

            data: []
        }

        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.fetchNow = this.fetchNow.bind(this);
    }

    toggleEditModal() {
        this.setState({
            editProfile: this.state.editProfile ? false : true
        })
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            AuthAPI.getPackage().then((result) => {
                let data = [];

                if(result.status === 200) {
                    data = result.data;
                }

                if($.fn.dataTable.isDataTable('#detail-table')) {
                    $('#detail-table').DataTable().destroy();
                }

                this.setState({
                    isLoading: false,
                    data
                }, () => {
                    var table = $('#detail-table').DataTable({
                        columnDefs: [ {
                            searchable: false,
                            orderable: false,
                            targets: 0
                        } ],
                        order: [[ 1, 'desc' ]],
                        language: {
                            emptyTable: "You Haven't Top Up Your Quota"
                        }
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

    componentDidMount() {
        $('#detail-table').dataTable();
        this.fetchNow()
    }

    render() {
        let date = new Date(this.context.get.user.created_at);
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return (
            <React.Fragment>
                <Loading show={this.state.isLoading} />
                <Helmet title={"Dashboard - " + process.env.REACT_APP_WEB_NAME} />
                <Breadcrumbs title="Dashboard" />

                <Container fluid={false}>
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <div className="card bg-primary" color="primary" style={{height: 'calc(100% - 30px)'}}>
                                <div className="card-body" style={{position: 'relative', overflow: 'hidden'}}>
                                    <Globe size={200} className={`${Style.cardIcon}`}/>
                                    <div className="row d-flex justify-content-between align-items-center mx-0 mb-4">
                                        <h5 className="mt-1">Your Profile</h5>
                                        <div className="dropdown">
                                            <button className={`btn px-2 d-flex align-items-center mt-n1 ${Style.btnBg}`} data-toggle="dropdown"><MoreHorizontal size={21}/></button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button onClick={() => { this.setState({ editProfile: true }, () => { $('#edit-user-modal').modal('toggle') }) }} className="dropdown-item w-100" type="button">Edit Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-4 pr-0">
                                            Name
                                        </div>
                                        <div className="col-8 font-weight-bold">
                                            {this.context.get.user.name}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-4 pr-0">
                                            Email
                                        </div>
                                        <div className="col-8 font-weight-bold">
                                            {this.context.get.user.email}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4 pr-0">
                                            User Since
                                        </div>
                                        <div className="col-8 font-weight-bold">
                                            {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="card" style={{height: 'calc(100% - 30px)'}}>
                                <div className="card-body pb-4">
                                    <div className="header-top mb-4">
                                        <h5 className="mt-1">Remaining Quota</h5>
                                        <a className="btn btn-primary px-3 mt-n2" href="https://wa.me/6288224826819?text=Saya%20mau%20top%20akun%20saya" target="_blank" rel="noopener noreferrer" >
                                            <i className="icofont icofont-plus mr-2"></i>Top Up
                                        </a>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-xl-6 mb-4 d-flex">
                                            <div className="mr-4 bg-info rounded-circle d-flex align-items-center justify-content-center quota-icon">
                                                <Send size={24} className="ml-n1" />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <p className="quota-title">Send Quota</p>
                                                <p className="quota-value"><CountUp end={this.context.get.user.kuota_sent} /></p>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 mb-4 d-flex">
                                            <div className="mr-4 bg-secondary rounded-circle d-flex align-items-center justify-content-center quota-icon">
                                                <Mail size={24} />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <p className="quota-title">Receive Quota</p>
                                                <p className="quota-value"><CountUp end={this.context.get.user.kuota_receive} /></p>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="alert quota-alert d-flex align-items-center" onClick={() => { $('#package-modal').modal('toggle') }}>
                                                <Info style={{marginTop: '-6px'}} />
                                                {
                                                    this.state.data.length > 0
                                                    ?   <p className="ml-2">Last top up {moment(this.state.data[(this.state.data.length-1)].updated_at).fromNow()}</p>
                                                    :   <p className="ml-2">You Haven't Top Up Your Quota</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                {
                    this.state.editProfile && <EditUser user={this.context.get.user} toggle={this.toggleEditModal} />
                }

                <div className="modal fade" id="package-modal" tabIndex="-1" aria-labelledby="package" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Top Up History</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="datatable">
                                    <table className="table table-striped table-hover responsive-table" id="detail-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Top Up Time</th>
                                                <th>Send Quota</th>
                                                <th>Receive Quota</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td width="7.5%"></td>
                                                            <td data-order={new Date(value.updated_at).getTime()}>{moment(value.updated_at).format("DD MMMM YYYY HH:mm:ss")}</td>
                                                            <td>{value.package_sent}</td>
                                                            <td>{value.package_receive}</td>
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
 
export default Dashboard;