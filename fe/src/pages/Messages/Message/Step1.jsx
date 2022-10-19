import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Paperclip } from 'react-feather';
import $ from 'jquery';
import Dropzone from 'react-dropzone';

class AddMedia extends Component {
    render() { 
        if(this.props.show.length <= 0) {
            return (
                <button className="btn btn-primary ml-auto" onClick={() => { $('#media-modal').modal('show') }}>Add Media</button>
            );
        }else{
            return null;
        }
    }
}

class Step1 extends Component {
    componentDidMount() {
        /* Scroll to Top */
        window.scrollTo(0, 0)
    }

    render() { 
        return (
            <React.Fragment>
                {
                    this.props.media.get.file.length > 0 &&
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body py-4">
                                <div className="d-flex align-items-center">
                                    {
                                        this.props.media.get.url !== ""
                                        ?   <img className="attached-image" src={this.props.media.get.url} alt="Attached Media" />
                                        :   <div className="attached-box">
                                                <Paperclip />
                                            </div>
                                    }
                                    <div className="attached-name">
                                        <div>Attached Media</div>
                                        <div>{this.props.media.get.file[0].name}</div>
                                    </div>
                                    <div onClick={this.props.media.remove} className="btn btn-danger px-3 ml-auto">Remove Media</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12">
                    <div className="card overflow-hidden">
                        <div className="card-body p-0">
                            <Editor
                                placeholder="Write your message"
                                editorClassName="message-editor"
                                toolbarClassName="message-toolbar"
                                editorState={this.props.message.get}
                                onEditorStateChange={this.props.message.set}
                                stripPastedStyles
                                toolbar={{
                                    options: ['inline'],
                                    inline: {
                                        className: "message-toolbar-inline",
                                        options: ['bold', 'italic', 'strikethrough'],
                                        bold: {
                                            className: 'toolbar-icon'
                                        },
                                        italic: {
                                            className: 'toolbar-icon'
                                        },
                                        strikethrough: {
                                            className: 'toolbar-icon'
                                        }
                                    }
                                }}
                                toolbarCustomButtons={[<AddMedia show={this.props.media.get.file} />]}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-end mb-4">
                    <button onClick={this.props.iterateStep} data-direction="next" className="btn btn-green">Next</button>
                </div>

                <div className="modal fade" id="media-modal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Media</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Dropzone onDrop={this.props.media.set}>
                                    {({getRootProps, getInputProps}) => (
                                        <section className="media-container">
                                            <div {...getRootProps({className: 'media-dropzone'})}>
                                                <input {...getInputProps()} />
                                                <p>Drop or Click Here to Upload Your File</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Step1;