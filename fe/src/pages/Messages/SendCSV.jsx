import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { EditorState } from 'draft-js';

import CheckIcon from '../../assets/images/check.svg';
import './SendCSV.scss';

import Breadcrumbs from '../../components/Breadcrumb';
import Loading from '../../components/loading/Loading';

import DeviceAPI from '../../api/Device';

import Step1 from './CSV/Step1';
import Step2 from './CSV/Step2';
import Step3 from './CSV/Step3';

toast.configure();

class SendCSV extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            step: 0,
            step_status: [true, false, false],

            file: [],
            message: EditorState.createEmpty(),

            recipient: [],
            variable: [],

            device_choice: "",
            device: []
        }

        this.handleStep = this.handleStep.bind(this);
        this.iterateStep = this.iterateStep.bind(this);

        this.handleFile = this.handleFile.bind(this);
        this.setRecipient = this.setRecipient.bind(this);

        this.handleMessage = this.handleMessage.bind(this);

        this.fetchDevice = this.fetchDevice.bind(this);
        this.handleDevice = this.handleDevice.bind(this);

        this.reset = this.reset.bind(this);
    }

    /* === Step Navigation ====================================================== */

    handleStep(event) {
        let index = parseInt(event.currentTarget.getAttribute('data-index'));
        let step = this.state.step;

        if(this.state.step_status[index]) {
            step = index;
        }

        this.setState({
            step: step
        })
    }

    iterateStep(event) {
        let target = event.currentTarget;
        let step = this.state.step;
        let step_status = this.state.step_status;

        if(target.getAttribute('data-direction') === "next") {
            step++;
        }else{
            step--;
        }

        if(step_status[step] !== true) {
            step_status[step] = true;
        }

        this.setState({
            step: step,
            step_status: step_status
        })
    }

    /* === File Handling ======================================================== */

    handleFile(cb, file) {
        this.setState({
            file
        }, () => {
            if(cb) cb();
        })
    }

    setRecipient(recipient, variable) {
        this.setState({
            recipient, variable
        })
    }

    /* === Message Handling ===================================================== */

    handleMessage(message) {
        this.setState({
            message
        });
    }

    /* === Fetch Device Data ==================================================== */

    fetchDevice() {
        this.setState({
            isLoading: true
        }, () => {
            DeviceAPI.get().then((data) => {
                /* Assign Variables */
                let choice = "", device = [];

                if(data.status === 200) {
                    /* Store Connected Device */
                    for(let value of data.data) {
                        if(value.status === 'Connected'){
                            device.push(value);
                        }
                    }

                    /* Choose Default First Device */
                    if(device.length > 0) {
                        choice = device[0].id;
                    }
                }

                this.setState({
                    isLoading: false,
                    device_choice: choice,
                    device
                })
            })
        })
    }

    handleDevice(event) {
        this.setState({
            device_choice: event.target.value
        })
    }

    /* === Reset Data =========================================================== */

    reset() {
        this.setState({
            step: 0,
            step_status: [true, false, false],

            file: [],
            message: EditorState.createEmpty(),

            recipient: [],
            variable: [],

            device_choice: "",
            device: []
        }, () => {
            this.fetchDevice();
            toast.success(`Message Successfully Send`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 7000,
            });
        })
    }

    componentDidMount() {
        this.fetchDevice();
    }

    render() { 
        return (
            <React.Fragment>
                <Helmet title={"Send Message by CSV - " + process.env.REACT_APP_WEB_NAME} />
                <Loading show={this.state.isLoading} />
                <Breadcrumbs title="Send Message by CSV" parent="Message" />

                <Container fluid={false}>
                    <div className="row">
                        <div className="col-md-4">
                            <div onClick={this.handleStep} data-index={0} className={`card card-message ${this.state.step === 0 && 'active'} ${this.state.step_status[0] ? 'done' : 'non-done'}`}>
                                <div className={`card-body card-step`}>
                                    <div className="card-line">&nbsp;</div>
                                    <div className="step flex-grow-1">
                                        <div className="step-subtitle">
                                            Step 1
                                        </div>
                                        <div className="step-title">
                                            <span>Upload CSV</span>
                                            <img src={CheckIcon} alt="check" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div onClick={this.handleStep} data-index={1} className={`card card-message ${this.state.step === 1 && 'active'} ${this.state.step_status[1] ? 'done' : 'non-done'}`}>
                                <div className={`card-body card-step `}>
                                    <div className="card-line">&nbsp;</div>
                                    <div className="step flex-grow-1">
                                        <div className="step-subtitle">
                                            Step 2
                                        </div>
                                        <div className="step-title">
                                            <span>Message Draft</span>
                                            <img src={CheckIcon} alt="check" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div onClick={this.handleStep} data-index={2} className={`card card-message ${this.state.step === 2 && 'active'} ${this.state.step_status[2] ? 'done' : 'non-done'}`}>
                                <div className={`card-body card-step `}>
                                    <div className="card-line">&nbsp;</div>
                                    <div className="step flex-grow-1">
                                        <div className="step-subtitle">
                                            Step 3
                                        </div>
                                        <div className="step-title">
                                            <span>Send Message</span>
                                            <img src={CheckIcon} alt="check" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        { this.state.step === 0 && <Step1 iterateStep={this.iterateStep} file={this.state.file} handleFile={this.handleFile} recipient={{data: this.state.recipient, set: this.setRecipient}} variable={this.state.variable} /> }
                        { this.state.step === 1 && <Step2 iterateStep={this.iterateStep} message={this.state.message} handleMessage={this.handleMessage} variable={this.state.variable}/> }
                        { this.state.step === 2 && <Step3 iterateStep={this.iterateStep} message={this.state.message} variable={this.state.variable} recipient={this.state.recipient} device={{data: this.state.device, choice: this.state.device_choice, set: this.handleDevice}} reset={this.reset}/> }
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
 
export default SendCSV;