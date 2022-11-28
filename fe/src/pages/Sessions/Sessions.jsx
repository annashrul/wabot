import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import { MoreHorizontal, Power } from 'react-feather';
import $ from 'jquery';
import 'datatables.net';
import 'bootstrap';
import Style from './Sessions.module.scss';
import Breadcrumbs from '../../components/Breadcrumb';
import QRCode from 'react-qr-code';

import { io } from "socket.io-client";
import { RootContext } from '../../Context';
import Loading from '../../components/loading/Loading';
import DeviceAPI from '../../api/Device';
const socket_target = `wss://${process.env.REACT_APP_WA_SOCKET}/wa-md`;
// const socket_target = `wss://wabot.pesanku.id/wa-md`;

class Sessions extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            device: {
                name: "",
                phone: "",
                id: "",
                type:"",
                method: ""
            },

            isLoading: false,
            dropdownMore: false,
            qr: ""
        }

        this.fetchNow = this.fetchNow.bind(this);

        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.showQR = this.showQR.bind(this);
        this.disconnect = this.disconnect.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.showModalAdd = this.showModalAdd.bind(this);
        this.deviceAdd = this.deviceAdd.bind(this);

        this.showModalEdit = this.showModalEdit.bind(this);
        this.deviceEdit = this.deviceEdit.bind(this);

        this.deviceDelete = this.deviceDelete.bind(this);
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            DeviceAPI.get().then((result) => {
                let data = [];

                if(result.status === 200) {
                    data = result.data;
                }

                this.setState({
                    isLoading: false,
                    data
                })
            })
        })
    }

    toggleDropdown() {
        this.setState({
            dropdownMore: (this.state.dropdownMore) ? false : true
        })
    }

    showQR(value) {
        const socket = io(socket_target);

        socket.connect(socket_target)
        socket.emit('connect-wa', { deviceId: value.uid });

        let timeoutHandler = setTimeout(() => {
            socket.emit('disconnect-wa', { deviceId: value.uid });
            $('#exampleModal').modal('hide');

            toast.error(`⏳ Connection Timeout! Please Try Again`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 7000,
            });
        }, 15000000);

        $('#exampleModal').on('hidden.bs.modal', function (e) {
            socket.disconnect();
            window.clearTimeout(timeoutHandler);
        })

        this.setState({
            qr: null
        }, () => {
            $('#exampleModal').modal('toggle');

            socket.on('connecting', () => {
                console.log('connecting');
                this.setState({
                    qr: null
                })
            })

            socket.on('qrReload', (msg) => {
                console.log('qrReload');
                this.setState({
                    qr: msg.qr
                })
            })

            socket.on('connected', () => {
                console.log('connected');

                this.fetchNow();

                $('#exampleModal').modal('hide');
            })
        })
    }

    disconnect(uid) {
        this.setState({
            isLoading: true
        }, () => {
            const socket = io(socket_target);
    
            socket.connect(socket_target)
            socket.emit('disconnect-wa', { deviceId: uid });

            let timeoutHandler = setTimeout(() => {
                socket.disconnect();
                
                toast.error(`⏳ Connection Timeout! Please Try Again`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 7000,
                });

                this.setState({
                    isLoading: false
                })
            }, 15000);
    
            socket.on('disconnected', () => {
                socket.disconnect();
                window.clearTimeout(timeoutHandler);

                this.fetchNow();
                console.log('disconnected');
            })
        })
    }

    handleChange(event) {
        let device = this.state.device;

        device[event.target.name] = event.target.value;

        this.setState({
            device: device
        })
    }

    showModalAdd() {
        this.setState({
            device: {
                name: "",
                phone: "",
                id: "",
                type:"",
                method: "CREATE"
            }
        }, () => { $('#deviceModal').modal('toggle'); })
    }

    deviceAdd() {
        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new FormData();

            dataForm.append("phone", this.state.device.phone);
            dataForm.append("name", this.state.device.name);
            dataForm.append("type", this.state.device.type);

            DeviceAPI.create(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow();
                    $('#deviceModal').modal('toggle');
                    toast.success(`Add Device Success!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#deviceModal').modal('toggle');
                        toast.error(`Add Device Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    showModalEdit(value) {
        this.setState({
            device: {
                name: value.name,
                phone: value.phone_number,
                id: value.id,
                type:value.type,
                method: "UPDATE"
            }
        }, () => { $('#deviceModal').modal('toggle'); })
    }

    deviceEdit() {
        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new URLSearchParams({
                "id": this.state.device.id,
                "phone_number": this.state.device.phone,
                "name": this.state.device.name,
                "type": this.state.device.type
            })

            DeviceAPI.update(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow();
                    $('#deviceModal').modal('toggle');
                    toast.success(`Edit Device Success!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#deviceModal').modal('toggle');
                        toast.error(`Edit Device Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    deviceDelete(id) {
        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new URLSearchParams({
                id_device: id
            })

            DeviceAPI.delete(dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow();
                    toast.success(`Delete Device Success!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Delete Device Failed (Status Code ${result.status})`, {
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
                <Helmet title={"Device Session - " + process.env.REACT_APP_WEB_NAME} />
                <Breadcrumbs title="Device Session" />
                <Container fluid={false}>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Device Session</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-center">
                                           {
                                               this.state.qr ? <QRCode value={this.state.qr} /> : <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                                           }
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    {
                                        this.state.qr ? "Scan QR using Your Whatsapp" : "Please wait for a while"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="deviceModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Device</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input value={this.state.device.name} onChange={this.handleChange} type="text" name="name" placeholder="Enter device name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input value={this.state.device.phone} onChange={this.handleChange} type="text" name="phone" placeholder="ex. 08112345678" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select value={this.state.device.type} onChange={this.handleChange} name="type" className="form-control">
                                            <option value="" disabled>-- Pilih Type --</option>
                                            <option value="onedevice">One Device</option>
                                            <option value="multidevice">Multi Device</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {
                                        this.state.device.method === "CREATE"
                                        ?   <button className="btn btn-success" onClick={this.deviceAdd}>Add</button> 
                                        :   <button className="btn btn-info" onClick={this.deviceEdit}>Save</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row d-flex justify-content-between align-items-center mx-0 mb-4">
                                        <h5 className="mt-1">Your Device</h5>
                                        {/* {
                                            this.state.data.length >= 3
                                            ?   <span title="You Can Only Add 3 Devices"><button disabled className="btn btn-success">Add Device</button></span>
                                            :   <button className="btn btn-success" onClick={this.showModalAdd}>Add Device</button>
                                        } */}
                                        <button className="btn btn-success" onClick={this.showModalAdd}>Add Device</button>
                                    </div>
                                    <table className={`table table-striped ${Style.tableResponsive}`} id="myTable">
                                        <thead>
                                            <tr>
                                                <th width="5%">#</th>
                                                <th>Device Name</th>
                                                <th>Device Number</th>
                                                <th>Status</th>
                                                <th width="20%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.length <= 0 &&
                                                (
                                                    <tr>
                                                        <td colSpan={6} align="middle">There is No Device</td>
                                                    </tr>
                                                )
                                            }
                                            {
                                                this.state.data.map((value, index) => {
                                                    let phone = "";

                                                    if(value.phone_number.charAt(0) === "0") {
                                                        phone = "62" + value.phone_number.slice(1);
                                                    }else{
                                                        phone = value.phone_number;
                                                    }

                                                    return (
                                                        <tr key={index}>
                                                            <td style={{paddingTop: '20px'}}>{index + 1}</td>
                                                            <td style={{paddingTop: '20px'}}>{value.name}</td>
                                                            <td style={{paddingTop: '20px'}}>{phone}</td>
                                                            <td style={{paddingTop: '20px'}}>
                                                                {
                                                                    (value.status === "Connected")
                                                                    ?   <div className="d-flex align-items-center text-success">
                                                                            <div className={`${Style.dot} ${Style.online}`} />
                                                                            Online
                                                                        </div>
                                                                    :   <div className="d-flex align-items-center text-danger">
                                                                            <div className={`${Style.dot}`} />
                                                                            Offline
                                                                        </div>
                                                                }
                                                            </td>
                                                            <td className="d-flex">
                                                                {
                                                                    (value.status === "Connected")
                                                                    ?   <button className="btn btn-danger d-flex align-items-center mr-1" onClick={this.disconnect.bind(this, value.uid)}><Power size={15} className="mr-1"/> Disable</button>
                                                                    :   <button className="btn btn-primary d-flex align-items-center mr-1" onClick={this.showQR.bind(this, value)}><Power size={15} className="mr-1"/> Enable</button>

                                                                }
                                                                <div className="dropdown">
                                                                    <button className="btn btn-primary px-2 d-flex align-items-center" data-toggle="dropdown"><MoreHorizontal size={21}/></button>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <button className="dropdown-item w-100" type="button" onClick={this.showModalEdit.bind(this, value)}>Edit Device</button>
                                                                        <button className="dropdown-item w-100" type="button" onClick={this.deviceDelete.bind(this, value.id)}>Delete Device</button>
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
            </React.Fragment>
        );
    }
}
 
export default Sessions;