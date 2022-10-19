import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Download, Paperclip } from 'react-feather';
import { readString } from 'react-papaparse';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import $ from 'jquery';

import Template from '../../../assets/Template.csv';

import Loading from '../../../components/loading/Loading';

const DeepClone = require('rfdc')();
toast.configure();

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isShow: (this.props.file.length > 0) ? true : false,

            search: '',
            data: (this.props.file.length > 0) ? this.props.recipient.data : []
        }

        this.parseRecipient = this.parseRecipient.bind(this);

        this.search = this.search.bind(this);
    }
 
    /* === CSV Parsing ========================================================== */
    
    parseRecipient() {
        this.setState({
            isLoading: true
        }, () => {
            /* Assign File Reader */
            let reader = new FileReader();
            
            /* Read File */
            reader.readAsText(this.props.file[0]);
            
            /* Called when Reading File Finished */
            reader.onload = () => {
                /* Assign Variable */
                let data = (readString(reader.result, {header: true, skipEmptyLines: true})).data;
                let variable = [], recipient = [];
                let isShow = false;
                
                /* Store Variable Name */
                if(data.length > 0) {
                    if(data[0].hasOwnProperty('name') && data[0].hasOwnProperty('name')) {
                        /* Sort Recipient by Name */
                        data.sort(this.compare);

                        isShow = true;
                        recipient = DeepClone(data);

                        for(let name of Object.keys(data[0])){
                            variable.push(name);
                        }
                    }
                }
                
                /* Update */
                this.setState({
                    isLoading: false,
                    data: recipient,
                    isShow
                }, () => {
                    if(isShow) {
                        /* Update Data */
                        this.props.recipient.set(data, variable);
                    }else{
                        /* Handle Error */
                        if(data.length === 0) {
                            toast.error(`Uploaded CSV is Empty`, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 5000,
                            });
                        }else{
                            toast.error(`Uploaded CSV doesn't Match with Required Format`, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 5000,
                            });
                        }
                    }
                })
            }
        })
    }
    
    /* === Add-On Function ====================================================== */

    compare(a, b) {
        if(a.name < b.name){
            return -1;
        }else if(a.name > b.name){
            return 1;
        }else{
            return 0;
        }
    }
    
    toggleDetail(e) {
        let target = e.currentTarget.parentNode;

        if(target.classList.contains('csv-show')){
            target.classList.replace('csv-show', 'csv-hide');
        }else{
            target.classList.replace('csv-hide', 'csv-show');
        }
    }

    search(event) {
        /* Assign Variable */
        let target = event.target.value.toLowerCase();
        let data = [];

        /* Search Word in Data */
        for(let value of this.props.recipient.data) {
            if(value.name.toLowerCase().includes(target) || value.phone.toString().toLowerCase().includes(target)) {
                data.push(value);
            }
        }

        /* Update */
        this.setState({
            search: event.target.value,
            data
        })
    }

    componentDidMount() {
        /* Scroll to Top */
        window.scrollTo(0, 0);
    }

    render() {
        if(this.state.isShow) {
            return (
                <React.Fragment>
                    <Loading show={this.state.isLoading} />
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body py-4">
                                <div className="d-flex align-items-center">
                                    <div className="attached-box">
                                        <Paperclip />
                                    </div>
                                    <div className="attached-name">
                                        <div>Attached File</div>
                                        <div>{this.props.file[0].name}</div>
                                    </div>
                                    <button onClick={() => {$('#remove-modal').modal('show')}} className="btn btn-danger px-3 ml-auto">Change File</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header py-4">
                                <div className="mx-0 d-flex align-items-center justify-content-between" style={{height: '38px'}}>
                                    <h5 className="m-0 pt-1">Variable</h5>
                                </div>
                            </div>
                            <div className="card-body pb-5">
                                <div className="overflow-auto databar" style={{height: '21.875rem'}}>
                                    <ListGroup>
                                        {
                                            this.props.variable.map((value, index) => {
                                                return (
                                                    <ListGroupItem key={index} className="recipient-list list-contact not-pointer d-flex align-items-center justify-content-between">
                                                        <div style={{maxWidth: '100%', overflow: 'hidden'}} >
                                                            <span className="contact-name">{value}</span><br/>
                                                            <span className="contact-description">Variable {index + 1}</span>
                                                        </div>
                                                    </ListGroupItem>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header py-4">
                                <div className="mx-0 d-flex align-items-center justify-content-between" style={{height: '38px'}}>
                                    <h5 className="m-0 pt-1">Recipient List</h5>
                                </div>
                            </div>
                            <div className="card-body pb-5">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text bg-white"><i className="icofont icofont-search"></i></div>
                                    </div>
                                    <input value={this.state.search} onChange={this.search} type="search" placeholder="Search" className="form-control border-left-0 pl-0 search-bar-step-2" />
                                </div>
                                <div className="overflow-auto databar" style={{height: '18.5rem'}}>
                                    <ListGroup className="mb-3">
                                        {
                                            this.state.data.map((value, index) => {
                                                return (
                                                    <div key={index} className="csv-hide">
                                                        <ListGroupItem onClick={this.toggleDetail} className="recipient-list list-contact csv-head">
                                                            <div className="csv-contact">
                                                                <span className="contact-name">{value.name}</span><br/>
                                                                <span className="contact-description">{value.phone}</span>
                                                            </div>
                                                            <div className="csv-head-icon">
                                                                <i className="icofont icofont-simple-up mr-0 remove-recipient"></i>
                                                                <i className="icofont icofont-simple-down mr-0 remove-recipient"></i>
                                                            </div>
                                                        </ListGroupItem>
                                                        <ListGroupItem className="recipient-list list-contact not-pointer csv-content">
                                                            {
                                                                Object.keys(value).map((value2, index2) => {
                                                                    if(value2 !== 'phone' && value2 !== 'name') {
                                                                        return (
                                                                            <div key={index2} className="csv-content-row">
                                                                                <span className="f-w-500">{value2}</span>
                                                                                <span>{value[value2]}</span>
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return <React.Fragment key={index2} />;
                                                                    }
                                                                } )
                                                            }
                                                        </ListGroupItem>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-end mb-4">
                        <button onClick={this.props.iterateStep} data-direction="next" className="btn btn-green">Next</button>
                    </div>

                    <div className="modal fade" id="remove-modal" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Change File</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Changing file will remove your message draft. Are you sure?
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-outline-danger" data-dismiss="modal">Cancel</button>
                                    <button className="btn btn-danger" onClick={() => { window.location.reload() }}>Change File</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <Loading show={this.state.isLoading} />
                    <div className="col-md-6">
                        <div className="card" style={{height: 'calc(100% - 30px)'}}>
                            <div className="card-header py-4">
                                <div className="mx-0 d-flex align-items-center justify-content-between">
                                    <h5 className="m-0 pt-1">CSV Template</h5>
                                    <a href={Template} download={process.env.REACT_APP_WEB_NAME + " - Template.csv"} className="btn btn-dark d-flex align-items-center px-3">
                                        <Download className="mr-2" size={18} style={{marginTop: '-2px'}}/>
                                        Download
                                    </a>
                                </div>
                            </div>
                            <div className="card-body" style={{paddingTop: '2rem', paddingBottom: '2.5rem'}}>
                                <p>In order to upload your data to {process.env.REACT_APP_WEB_NAME}, please use CSV template that we provided above.</p>
                                <p>Keep in mind that name and phone field is required for all data, and write your variable name in camelcase with no space or dash (example dateOfBirth).</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card" style={{height: 'calc(100% - 30px)'}}>
                            <div className="card-body">
                                <Dropzone onDropAccepted={this.props.handleFile.bind(this, this.parseRecipient)} accept=".csv">
                                    {({getRootProps, getInputProps}) => (
                                        <section className="media-container">
                                            <div {...getRootProps({className: 'media-dropzone'})} style={{borderRadius: '1rem'}}>
                                                <input {...getInputProps()} />
                                                <p className="text-center">Drop or Click Here to Upload Your CSV File</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}
 
export default Step1;