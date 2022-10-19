import { EditorState } from 'draft-js';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import $ from 'jquery';
import { toast } from 'react-toastify';

import Breadcrumbs from '../../components/Breadcrumb';
import Loading from '../../components/loading/Loading'

import Step1 from './Message/Step1';
import Step2 from './Message/Step2';
import Step3 from './Message/Step3';

import DeviceAPI from '../../api/Device';

import CheckIcon from '../../assets/images/check.svg';
import './SendMessage.scss';
import { Helmet } from 'react-helmet';

const DeepClone = require('rfdc')();
toast.configure();

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            step: 0,
            step_status: [true, false, false],

            message: EditorState.createEmpty(),
            media: {
                file: [],
                url: ""
            },

            device_choice: "",
            device: [],

            recipient: []
        }

        this.handleStep = this.handleStep.bind(this);
        this.iterateStep = this.iterateStep.bind(this);

        this.handleMessageChange = this.handleMessageChange.bind(this);

        this.handleMedia = this.handleMedia.bind(this);
        this.removeMedia = this.removeMedia.bind(this);

        this.fetchDevice = this.fetchDevice.bind(this);
        this.setChoice = this.setChoice.bind(this);

        this.addRecipient = this.addRecipient.bind(this);
        this.removeRecipient = this.removeRecipient.bind(this);
        this.resetRecipient = this.resetRecipient.bind(this);
        this.batchRecipient = this.batchRecipient.bind(this);
        this.batchRemoveRecipient = this.batchRemoveRecipient.bind(this);

        this.reset = this.reset.bind(this)
    }

    /* === Sorting Algorithm ==================================================== */

    compare(a, b) {
        if(a.name < b.name){
            return -1;
        }else if(a.name > b.name){
            return 1;
        }else{
            return 0;
        }
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

    /* === Message ============================================================== */

    handleMessageChange(message) {
        this.setState({
            message: message
        });
    }

    /* === Media ================================================================ */

    handleMedia(media) {
        let result = this.state.media;

        result.file = media;

        if(media[0].type.includes("image")) {
            const reader = new FileReader();

            reader.onloadend = () => {
                result.url = reader.result;

                this.setState({
                    media: result
                }, () => {
                    $('#media-modal').modal('hide')
                })
            }

            reader.readAsDataURL(media[0]);
        }else{
            this.setState({
                media: result
            }, () => {
                $('#media-modal').modal('hide')
            })
        }
    }

    removeMedia() {
        this.setState({
            media: {
                file: [],
                url: ""
            }
        })
    }

    /* === Fetch Device ========================================================= */

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

    /* === Set Choice =========================================================== */

    setChoice(target) {
        this.setState({
            device_choice: target
        })
    }

    /* === Manage Recipients ==================================================== */

    addRecipient(value) {
        let data = this.state.recipient;

        data.push(value);
        data.sort(this.compare);

        this.setState({
            recipient: data
        })
    }

    removeRecipient(index) {
        let data = this.state.recipient;

        data.splice(index, 1);

        this.setState({
            recipient: data
        })
    }

    resetRecipient(){
        this.setState({
            recipient: []
        })
    }

    batchRecipient(value) {
        let data = this.state.recipient;

        for(let val of value){
            data.push(val);
        }

        this.setState({
            recipient: data
        })
    }

    batchRemoveRecipient(value) {
        let data = DeepClone(this.state.recipient);

        /* Remove Recipient from Backward */
        for(let i=value.length-1 ; i>=0 ; i--) {
            data.splice(parseInt(value[i]), 1);
        }

        this.setState({
            recipient: data
        })
    }

    /* === Reset All ============================================================ */

    reset() {
        this.setState({
            step: 0,
            step_status: [true, false, false],
            message: EditorState.createEmpty(),
            media: {
                file: [],
                url: ""
            },
            device_choice: "",
            device: [],
            recipient: []
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
                <Loading show={this.state.isLoading} />
                <Helmet title={"Send Message - " + process.env.REACT_APP_WEB_NAME} />
                <Breadcrumbs title="Send Message" parent="Message" />
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
                                            <span>Message Draft</span>
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
                                            <span>Recipient</span>
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
                        { this.state.step === 0 && <Step1 iterateStep={this.iterateStep} message={{get: this.state.message, set: this.handleMessageChange}} media={{get: this.state.media, set: this.handleMedia, remove: this.removeMedia}} /> }
                        { this.state.step === 1 && <Step2 iterateStep={this.iterateStep} device={{data: this.state.device, choice: this.state.device_choice, setChoice: this.setChoice}} recipient={{get: this.state.recipient, add: this.addRecipient, remove: this.removeRecipient, reset: this.resetRecipient, batch: this.batchRecipient, batchRemove: this.batchRemoveRecipient}} /> }
                        { this.state.step === 2 && <Step3 iterateStep={this.iterateStep} message={this.state.message} media={this.state.media} recipient={this.state.recipient} device={this.state.device_choice} reset={this.reset}/> }
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
 
export default SendMessage;