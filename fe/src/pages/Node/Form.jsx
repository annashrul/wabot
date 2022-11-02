import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import { MoreHorizontal, Power } from 'react-feather';
import $ from 'jquery';
import 'datatables.net';
import 'bootstrap';
import Style from '../Sessions/Sessions.module.scss';
import Breadcrumbs from '../../components/Breadcrumb';
import QRCode from 'react-qr-code';

import { io } from "socket.io-client";
import { RootContext } from '../../Context';
import Loading from '../../components/loading/Loading';
import NodeApi from '../../api/Chatbot/Node';
import DeviceApi from '../../api/Device';

const socket_target = "wss://wabot.pesanku.id/wa-md";

class Form extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);

        this.displayData=[];
        this.state = {
            data:[],
            FormIsi:[],
            DeviceData:[],
            method:'',
            id_device:1,
            id:"",
            isi: {
                eform_name: "",
                id_device: "",
                id: "",
                id_user:"",
                method: ""
            },
            formQuestion:[],

            isLoading: false,
            dropdownMore: false,
            qr: ""
        }

        this.fetchNow = this.fetchNow.bind(this);

        this.toggleDropdown = this.toggleDropdown.bind(this);

        // this.showQR = this.showQR.bind(this);
        // this.disconnect = this.disconnect.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

        this.showModalAdd = this.showModalAdd.bind(this);
        this.eformAdd = this.eformAdd.bind(this);

        this.showModalEdit = this.showModalEdit.bind(this);
        this.EformEdit = this.EformEdit.bind(this);

        this.eformDelete = this.eformDelete.bind(this);
        // this.appendData = this.appendData.bind(this);
        this.removeAppend = this.removeAppend.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
    }

    fetchNow() {
        this.setState({
            isLoading: true,
        }, () => {
            NodeApi.getEformNode(this.state.id_device).then((result) => {
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

    

    handleChange(event) {
        let isi = this.state.data;

        isi[event.target.name] = event.target.value;
        this.setState({
            isi: isi
        })
    }

    handleQuestion(event) {
        const { formQuestion } = this.state;
        const index=event.target.id;
        const value=event.target.value;

        formQuestion[index] = value;

        this.setState({
            formQuestion
        })
    }

    showModalAdd() {
        this.setState({
            isi: {
                eform_name: "",
                id_device: this.state.id_device,
                id: "",
                id_user:"",
                method: ""
            },
            method:"CREATE",
            formQuestion:[]
        }, () => { $('#formModal').modal('toggle'); })
        // this.retrieveDevice();
    }

    eformAdd() {
        this.setState({
            isLoading: true
        }, () => {

            let dataForm = new URLSearchParams({
                eform_name: this.state.isi.eform_name,
                id_device: this.state.id_device
            }) 

            NodeApi.createEform(dataForm).then((result) => {
                if(result.status === 200) {
                    let data = result.data;
                    let question={};
                    this.state.formQuestion.forEach(function (value, i) {
                        question[i+1]=value;
                    });
                    let body = {
                        "id_eform": data.id,
                        "question":question
                    };
                    
                    NodeApi.createQuestion(body).then((result) => {
                        console.log(result)
                        if(result.status === 200) {
                            this.fetchNow();
                            $('#formModal').modal('toggle');
                            toast.success(`Add Question Success!`, {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }else{
                            this.setState({
                                isLoading: false
                            }, () => {
                                $('#formModal').modal('toggle');
                                toast.error(`Add Question Failed (Status Code ${result.status})`, {
                                    position: toast.POSITION.TOP_CENTER
                                });
                            })
                        }
                    })
                    
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#formModal').modal('toggle');
                        toast.error(`Add E-form Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    showModalEdit(value) {
        NodeApi.getQuestion(value.id).then((result) => {
            let data = [];
            let question = [];

            if(result.status === 200) {
                data = result.data;
            }
            for(var item of data){
                question.push(item.question);
            }

            this.setState({
                isi:value,
                formQuestion:question,
                method:"UPDATE",
            }, () => { $('#formModal').modal('toggle'); })
        })

        // this.retrieveDevice();
        
    }

    EformEdit() {
        this.setState({
            isLoading: true
        }, () => {
            let dataForm = new URLSearchParams({
                eform_name: this.state.isi.eform_name,
                id_eform: this.state.isi.id
            }) 

            NodeApi.updateEform(this.state.id_device,dataForm).then((result) => {
                console.log(result)
                if(result.status === 200) {
                    let body = new URLSearchParams({
                        id_question: this.state.formQuestion.id,
                        question: this.state.formQuestion.question,
                        question_number: this.state.formQuestion.question_number
                    }) 
                    
                    // NodeApi.updateQuestion(this.state.isi.id,body).then((result) => {
                    //     console.log(result)
                    //     if(result.status === 200) {
                    //         this.fetchNow();
                    //         $('#formModal').modal('toggle');
                    //         toast.success(`Add Question Success!`, {
                    //             position: toast.POSITION.TOP_CENTER
                    //         });
                    //     }else{
                    //         this.setState({
                    //             isLoading: false
                    //         }, () => {
                    //             $('#formModal').modal('toggle');
                    //             toast.error(`Add Question Failed (Status Code ${result.status})`, {
                    //                 position: toast.POSITION.TOP_CENTER
                    //             });
                    //         })
                    //     }
                    // })
                    
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        $('#formModal').modal('toggle');
                        toast.error(`Update E-form Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    eformDelete(id) {
        this.setState({
            isLoading: true
        }, () => {
            const dataForm = new URLSearchParams({
                id_eform: id,
                id_device:this.state.id_device
            })

            NodeApi.deleteEform(this.state.id_device,dataForm).then((result) => {
                if(result.status === 200) {
                    this.fetchNow();
                    toast.success(`Delete e-Form Success!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    this.setState({
                        isLoading: false
                    }, () => {
                        toast.error(`Delete e-Form Failed (Status Code ${result.status})`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
                }
            })
        })
    }

    appendData = () => {
        return this.state.formQuestion.map((obj, idx) => 
            (
            <div className='row' key={idx}>
                <div className='col-9'>
                    <input type='text' className='form-control textt' name='question' id={idx} onChange={this.handleQuestion} placeholder='Tulis Pertanyaan' value={obj}/></div>
                    <div className='col-3'>
                    <button type='button' className='btn btn-danger' onClick={()=>this.removeAppend(idx)} > x </button>
                </div>
            </div>
            )
        )
      }

    onAddQuestion(){
        const { formQuestion } = this.state;
        formQuestion.push('');
        this.setState({ formQuestion });
    }

    removeAppend(index){
        const {formQuestion} = this.state; 
        formQuestion.splice(index,1);
        this.setState({formQuestion});
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
        return (
            <React.Fragment>
                <Loading show={this.state.isLoading} />
                <Helmet title={"Form Node - " + process.env.REACT_APP_WEB_NAME} />
                <Breadcrumbs title="Form Node" />
                <Container fluid={false}>

                    <div className="modal fade" id="formModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">e-Form</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="form-label">Nama E-Form</label><br></br>
                                        <input type='hidden' name='id' className='form-control' value={this.state.isi.id}/>
                                        <input type='text' name='eform_name' className='form-control' onChange={this.handleChange} value={this.state.isi.eform_name}/>
                                    </div>
                                    {/* <div className="form-group">
                                        <label className="form-label">Device</label><br></br>
                                        <select value={this.state.id_device} onChange={this.handleChange} name="id_device" className="form-control">
                                            <option value="" disabled>-- Choose Device--</option>
                                            {
                                                this.state.DeviceData.map((value, index) => {
                                                return(
                                                    <option value={value.id} key={index}>{value.name}</option>
                                                )
                                                })
                                            }
                                        </select>
                                    </div> */}
                                    <div className='form-group'>
                                        <label className="form-label">Pertanyaan</label><br></br>
                                        <input  type="submit" className="btn btn-primary" onClick={this.onAddQuestion}  value="Tambah Pertanyaan"/>
                                    </div>
                                    <div id="display-data-Container">
                                        {this.appendData()}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {
                                        this.state.method === "CREATE"
                                        ?   <button className="btn btn-success" onClick={this.eformAdd}>Add</button> 
                                        :   <button className="btn btn-info" onClick={this.EformEdit}>Save</button>
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
                                            <h5 className="mt-2">Data Form Node</h5>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select value={this.state.id_device} onChange={this.handleChange} className="custom-select" name='id_device'>
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
                                        <button className="btn mb-2 p-2 px-3 btn-success" onClick={this.showModalAdd}>Add E-form</button>
                                    </div>
                                    </div>
                                    <div className='card-body'>
                                    <div className="datatable">
                                    <table className="table table-hover" id="form-table">
                                        <thead>
                                            <tr>
                                                <th width="5%">#</th>
                                                <th>e-Form Name</th>
                                                <th>Device ID</th>
                                                <th width="20%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.length <= 0 &&
                                                (
                                                    <tr>
                                                        <td colSpan={6} align="middle">There is No Data</td>
                                                    </tr>
                                                )
                                            }
                                            {
                                                this.state.data.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{value.eform_name}</td>
                                                            <td>{value.id_device}</td>
                                                            <td className="d-flex">
                                                                <div className="dropdown">
                                                                    <button className="btn btn-primary px-2 d-flex align-items-center" data-toggle="dropdown"><MoreHorizontal size={21}/></button>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <button className="dropdown-item w-100" type="button" onClick={this.showModalEdit.bind(this, value)}>Edit Device</button>
                                                                        <button className="dropdown-item w-100" type="button" onClick={this.eformDelete.bind(this, value.id)}>Delete Device</button>
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
                </Container>
            </React.Fragment>
        );
    }
}
 
export default Form;