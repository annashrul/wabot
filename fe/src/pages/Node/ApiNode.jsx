import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import { MoreHorizontal, Power } from 'react-feather';
import $, { data } from 'jquery';
import 'datatables.net';
import 'bootstrap';
import Style from '../Sessions/Sessions.module.scss';
import Breadcrumbs from '../../components/Breadcrumb';

import { RootContext } from '../../Context';
import Loading from '../../components/loading/Loading';
import NodeApi from '../../api/Chatbot/Node';
import DeviceApi from '../../api/Device';

class ApiNode extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.displayData=[];
        this.state = {
            data:[],
            method:'',
            DeviceData:[],
            isi: {
                url: '',
                id_device: '',
                id: '',
                id_user:'',
                method: '',
                var:'',
                param:'',
                success:'',
                failed:''
            },
            isLoading: false,
            dropdownMore: false,
        }

        this.fetchNow = this.fetchNow.bind(this);
        this.retrieveDevice = this.retrieveDevice.bind(this);

        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

        this.showModalAdd = this.showModalAdd.bind(this);
        this.apinodeAdd = this.apinodeAdd.bind(this);

        this.showModalEdit = this.showModalEdit.bind(this);
        this.apinodeEdit = this.apinodeEdit.bind(this);

        this.deviceDelete = this.deviceDelete.bind(this);
    }

    fetchNow() {
        this.setState({
            isLoading: true
        }, () => {
            NodeApi.getAPINode(this.state.isi.id_device).then((result) => {
                let data = [];

                console.log("################",result)

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

    handleChange(event) {
        let isi = this.state.isi;

        isi[event.target.name] = event.target.value;

        this.setState({
            isi
        })
    }

    showModalAdd() {
        this.setState({
            isi: {
                url: '',
                id_device: this.state.isi.id_device,
                id: '',
                id_user:'',
                method: '',
                var:'',
                param:'',
                success:'',
                failed:''
            },
            method: "CREATE",
            formQuestion:[]
        }, () => { $('#formModal').modal('toggle'); })
    }

    apinodeAdd() {
        this.setState({
            isLoading: true
        }, () => {
            let isiparam = this.state.isi.param;
            let isivar = this.state.isi.var;
            let body = {
                id_device : this.state.isi.id_device,
                url : this.state.isi.url,
                method: this.state.isi.method,
                param : isiparam.split(','),
                var : isivar.split(','),
                success : this.state.isi.success,
                failed : this.state.isi.failed
            };
            console.log(body)

            NodeApi.createApiNode(body).then((result) => {
                console.log(result)
                if(result.status === 200) {
                    this.fetchNow();
                    $('#formModal').modal('toggle');
                    toast.success(`Add API Node Success!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#formModal').modal('toggle');
                        toast.error(`Add API Node Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    showModalEdit(value) {
        let param = '';
        let variabel = '';
        
        for(let i =0;i<=5;i++){
            if(value['param'+i]!=null){
                param += value['param'+i] +',';
            }
        }

        for(let i =0;i<=10;i++){
            if(value['var'+i]!=null){
                variabel += value['var'+i] + ',';
            }
        }

        param = param.slice(0, -1);
        variabel= variabel.slice(0, -1); 

        value.param = param;
        value.var = variabel;
        this.setState({
            isi:value,
            method:'UPDATE'
        }, () => {
            $('#formModal').modal('toggle'); })
    }

    apinodeEdit() {
        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new URLSearchParams({
                "url": this.state.isi.url,
                "method": this.state.isi.method
            })

            // let dataForm = new FormData();

            let param = this.state.isi.param.split(',');
            let variabel = this.state.isi.var.split(',');

            param.forEach(function (value, i) {
                dataForm.append('param'+i,value);
                // dataForm['param'+i]= value;
            });

            variabel.forEach(function (value, i) {
                dataForm.append('var'+i, value);
                // dataForm['var'+i]= value;
            });

            NodeApi.updateApiNode(this.state.isi.id,dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow();
                    $('#formModal').modal('toggle');
                    toast.success(`Edit API Node Success!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#formModal').modal('toggle');
                        toast.error(`Edit API Node Failed (Status Code ${result.status})`, {
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
                id_api: id
            })

            NodeApi.deleteApiNode(id,dataForm).then((result) => {
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

    retrieveDevice(){
        this.setState({
          isLoading: true
        }, () => {
            /* Request Get */
            DeviceApi.get().then((result) => {
              let DeviceData = [];
              if(result.status === 200) {
                DeviceData = result.data;
              }

              if(DeviceData.length >0){
                this.setState({
                    isi:
                    {
                        id_device : DeviceData[0].id
                    }
                })
              }
    
              this.setState({
                  isLoading: false,
                  DeviceData
              })
              this.fetchNow();
            })
        })
      }

    handleFilter() {
        console.log(this.state.isi)
        this.setState({
            isLoading: true,
        }, () => {
            this.fetchNow();
        })
    }

    componentDidMount() {
        this.retrieveDevice();
    }

    render() { 
        console.log("this.state.data",this.state.data);
        return (
            <React.Fragment>
                <Loading show={this.state.isLoading} />
                <Helmet title={"API Node - " + process.env.REACT_APP_WEB_NAME} />
                <Breadcrumbs title="API Node" />
                <Container fluid={false}>

                    <div className="modal fade" id="formModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        this.state.method === "CREATE"
                                        ?   <h5 className="modal-title" id="exampleModalLabel">Tambah API Node</h5>
                                        :   <h5 className="modal-title" id="exampleModalLabel">Edit API Node</h5>
                                    }
                                    
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="form-label">Url API</label><br></br>
                                        <input type='hidden' name='id_device' className='form-control' value={this.state.isi.id_device}/>
                                        <input type='url' name='url' className='form-control' onChange={this.handleChange} value={this.state.isi.url}/>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Method</label><br></br>
                                        <select value={this.state.isi.method} onChange={this.handleChange} name="method" className="form-control">
                                            <option value="" disabled>-- Choose Method--</option>
                                            <option value="POST">POST</option>
                                            <option value="GET">GET</option>
                                            <option value="PUT">PUT</option>
                                            <option value="DELETE">DELETE</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Parameter</label><br></br>
                                        <input type='text' name='param' className='form-control' onChange={this.handleChange} value={this.state.isi.param}/>
                                        <small>Tambahkan tanda koma (,) untuk pemisah. ex: test1,test2</small>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Variabel</label><br></br>
                                        <input type='text' name='var' className='form-control' onChange={this.handleChange} value={this.state.isi.var}/>
                                        <small>Tambahkan tanda koma (,) untuk pemisah. ex: test1,test2</small>
                                    </div>
                                    {
                                        this.state.method === "CREATE" ?
                                        <React.Fragment>
                                            <div className="form-group">
                                                <label className="form-label">Response Sukses</label><br></br>
                                                <textarea name='success' className='form-control' onChange={this.handleChange} value={this.state.isi.success}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Response Gagal</label><br></br>
                                                <input type='text' name='failed' className='form-control' onChange={this.handleChange} value={this.state.isi.failed}/>
                                            </div>
                                        </React.Fragment>
                                    :''
                                    }
                                </div>
                                <div className="modal-footer">
                                    {
                                        this.state.method === "CREATE"
                                        ?   <button className="btn btn-success" onClick={this.apinodeAdd}>Add</button> 
                                        :   <button className="btn btn-info" onClick={this.apinodeEdit}>Save</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header pt-2 pb-2">
                                        <div className="row">
                                            <div className="col-12 col-md text-center text-lg-left mb-3 mb-lg-0">
                                                <h5 className="mt-2">Data API Node</h5>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <select value={this.state.isi.id_device} onChange={this.handleChange} className="custom-select" name='id_device'>
                                                            <option value="" disabled>— Choose Device —</option>
                                                            {
                                                                this.state.DeviceData.map((value, index) => {
                                                                    return (
                                                                        <option key={index} value={value.id}>{value.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        {
                                                            this.state.DeviceData.length > 0 &&
                                                            <div className="input-group-append">
                                                                <button onClick={this.handleFilter} className="btn btn-primary px-3" type="button">Choose</button>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-success" onClick={this.showModalAdd}>Add API</button>
                                        </div>
                                    </div>
                                <div className="card-body">
                                    
                                    <table className={`table table-striped ${Style.tableResponsive}`} id="myTable">
                                        <thead>
                                            <tr>
                                                <th width="5%">#</th>
                                                <th>API URL</th>
                                                <th>Method</th>
                                                <th width="20%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.length <= 0 || this.state.data === 0 &&
                                                (
                                                    <tr>
                                                        <td colSpan={6} align="middle">There is No Data</td>
                                                    </tr>
                                                )
                                            }
                                            {
                                                this.state.data.length> 0 || this.state.data!==0 && this.state.data.map((value, index) => {
                                                    

                                                    return (
                                                        <tr key={index}>
                                                            <td style={{paddingTop: '20px'}}>{index + 1}</td>
                                                            <td style={{paddingTop: '20px'}}>{value.url}</td>
                                                            <td style={{paddingTop: '20px'}}>{value.method}</td>
                                                            <td className="d-flex">
                                                                <div className="dropdown">
                                                                    <button className="btn btn-primary px-2 d-flex align-items-center" data-toggle="dropdown"><MoreHorizontal size={21}/></button>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <button className="dropdown-item w-100" type="button" onClick={this.showModalEdit.bind(this, value)}>Edit API Node</button>
                                                                        <button className="dropdown-item w-100" type="button" onClick={this.deviceDelete.bind(this, value.id)}>Delete API Node</button>
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
 
export default ApiNode;