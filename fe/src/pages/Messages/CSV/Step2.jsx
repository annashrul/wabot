import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { HelpCircle } from 'react-feather';

class Step2 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mention: []
        }
    }

    componentDidMount() {
        /* Scroll to Top */
        window.scrollTo(0, 0);

        /* Assign Data */
        let mention = [];

        /* Add Variable Name to Data */
        for(let value of this.props.variable) {
            mention.push({
                text: value,
                value: value,
                url: value
            })
        }

        /* Update */
        this.setState({
            mention
        })
    }

    render() { 
        return (
            <React.Fragment>
                <div className="col-12">
                    <div className="alert alert-primary alert-dismissible fade show" role="alert" style={{borderRadius: '.5rem'}}>
                        <HelpCircle className="mr-3" size={20}/>
                        To add variable in your message text, please write $ and choose variable you want to add
                        <button type="button" className="close mt-0" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card overflow-hidden">
                        <div className="card-body p-0">
                            <Editor
                                placeholder="Write your message"
                                editorClassName="message-editor"
                                toolbarClassName="message-toolbar"
                                editorState={this.props.message}
                                onEditorStateChange={this.props.handleMessage}
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
                                mention={{
                                    separator: ' ',
                                    trigger: '$',
                                    suggestions: this.state.mention
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-between mb-4">
                    <button onClick={this.props.iterateStep} data-direction="prev" className="btn btn-outline-green mr-3">Previous</button>
                    <button onClick={this.props.iterateStep} data-direction="next" className="btn btn-green">Next</button>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Step2;