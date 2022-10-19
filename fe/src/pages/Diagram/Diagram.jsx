import React,{Component} from 'react';
import Tree from 'react-d3-tree';
import { GitPullRequest, Globe, HelpCircle, MoreHorizontal, Plus, User, Users } from 'react-feather';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import { toast } from 'react-toastify';
import $, { type } from 'jquery';
import { withRouter } from "react-router";
import NodeApi from '../../api/Chatbot/Node';
import RuleApi from '../../api/Chatbot/Rule';
import "./../../assets/scss/treecustom.css";


import Breadcrumbs from '../../components/Breadcrumb';
import Loading from '../../components/loading/Loading';

class Diagram extends Component {
constructor(props) {
  super(props);

  this.displayData=[];
  this.state = {
      isLoading: false,
      data: [],
      type: [],
      types: [],
      rule: [],
      apiData: [],
      FormIsi: [],
      // trigger:false,
      method:'',

      modal: {
          id: '',
          id_currentNode: '',
          id_nextNode: '',
          id_eform: '',
          id_api: '',
          name:'',
          type: '',
          key: '',
          response:'',
          title:'',
          trigger:false,
          eform:{
            eform_name:'',
            question:''
          }
      }
  }

  
  this.modalCreate = this.modalCreate.bind(this);
  this.fetchNow = this.fetchNow.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.checkChange = this.checkChange.bind(this);
  this.nodeType = this.nodeType.bind(this);
  this.create = this.create.bind(this);
  this.editPath = this.editPath.bind(this);
  this.deletePath = this.deletePath.bind(this);
  this.appendData = this.appendData.bind(this);
  this.removeAppend = this.removeAppend.bind(this);
 
}

  /* === Core Process ========================================================= */

  fetchNow(){
    this.setState({
      isLoading: true
    }, () => {
        /* Request Get */

        RuleApi.get().then((res) => {
          let rule = [];
          if(res.status === 200) {
            rule = res.data;
            if(rule !=null){
              let id=this.props.match.params.id;
              rule = rule.rule;
              rule = rule.find(function(item) {
                return item.id === parseInt(id);
              });
            }
            if(!rule || rule.length === 0){
              window.location.href=`/chatbot`;
            }
            this.setState({
              isLoading:false,
              rule
            })

            NodeApi.getPathByRule(this.props.match.params.id).then((result) => {
              let data = [];
              if(result.status === 200) {
                data = result.data;
                let idnode = [];
                let isi={};
                let tempdata=[];
                for(let index in data){
                  if(data[0]){
                    //first data
                    if(data[index].id_currentNode===data[index].id_nextNode){
                      data[index].name='Start';
                      data[index].children=[];
                      isi[index]=data[index];
                      tempdata.push(data[index]);
                    }   
                  }else{
                    //for child
                    if(tempdata[tempdata.length - 1].id_nextNode === data[index].id_currentNode){
                      let last = tempdata[tempdata.length - 1];
                      if('children' in tempdata[(tempdata.length-1)]){
                        last.children.push(data[index]);
                      }else{
                        last.children=data[index];
                      }
                    }else{
                      tempdata.push(data[index]);
                    }
                  }


                  // if(idnode.includes(item.id_currentNode)){
                  //   if('children' in isi[(idnode.length-1)]){
                  //     let child = isi[(idnode.length-1)].children;
                  //     child.push(item);
                  //   }else{
                  //     isi[(idnode.length-1)].children=[item];
                  //   }
                  // }else{
                  //   idnode.push(item.id_currentNode);
                  //   isi.push(item);
                  // }
                }
                // for(let item of data){
                //   if(idnode.includes(item.id_currentNode)){
                //     if('children' in isi[(idnode.length-1)]){
                //       let child = isi[(idnode.length-1)].children;
                //       child.push(item);
                //     }else{
                //       isi[(idnode.length-1)].children=[item];
                //     }
                //   }else{
                //     idnode.push(item.id_currentNode);
                //     isi.push(item);
                //   }
                // }
                data = idnode;
              }
              
              this.setState({
                  isLoading: false,
                  data
              })
            })
        }
      })
    })
  }

  componentDidMount() {
    this.fetchNow()
  }

  /* === Create node ========================================================= */

  create() {
    this.setState({
        isLoading: true
    }, () => {
        /* Store Request Body */
        
        // if(this.state.modal.type==='default'){
          let isi = new URLSearchParams({
            response: this.state.modal.response,
            title: this.state.modal.title
          })
  
          /* Request */
          NodeApi.create(isi).then((result) => {
            if(result.status === 200) {
                /* Handle Success */
                let body = new URLSearchParams({
                  id_rule: parseInt(this.props.match.params.id),
                  id_currentNode: parseInt(this.state.modal.id_currentNode),
                  id_nextNode: parseInt(result.data.id),
                  type: this.state.modal.type,
                  key: this.state.modal.key
              })
    
              /* Request */
              NodeApi.createPathDefault(body).then((result) => {
                  if(result.status === 200) {
                      /* Handle Success */
                      this.fetchNow();
    
                      $('#modal-create').modal('hide');
    
                      toast.success(`Chatbot Path Created Succesfully`, {
                          position: toast.POSITION.TOP_CENTER
                      });
                  }else{
                      /* Handle Error/Failed */
                      this.setState({
                          isLoading: false
                      }, () => {
                          // $('#modal-create').modal('hide');
    
                          toast.error(`Create Chatbot Path Failed (Status ${result.status})`, {
                              position: toast.POSITION.TOP_CENTER
                          });
                      })
                  }
              })
            }else{
                /* Handle Error/Failed */
                this.setState({
                    isLoading: false
                }, () => {
                    // $('#modal-create').modal('hide');
  
                    toast.error(`Create Chatbot Path Failed (Status ${result.status})`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
            }
          })
          
          

        // }else if(this.state.modal.type==='api'){
        //   let body = new URLSearchParams({
        //     id_rule: parseInt(this.props.match.params.id),
        //     id_api:parseInt(this.state.modal.id_api),
        //     id_currentNode: parseInt(this.state.modal.id_currentNode),
        //     id_nextNode: parseInt(this.state.modal.id_nextNode),
        //     key: parseInt(this.state.modal.key)
        //   })

        //   /* Request */
        //   NodeApi.createPathAPI(body).then((result) => {
        //       if(result.status === 200) {
        //           /* Handle Success */
        //           this.fetchNow();

        //           $('#modal-create').modal('hide');

        //           toast.success(`Chatbot Path Created Succesfully`, {
        //               position: toast.POSITION.TOP_CENTER
        //           });
        //       }else{
        //           /* Handle Error/Failed */
        //           this.setState({
        //               isLoading: false
        //           }, () => {
        //               // $('#modal-create').modal('hide');

        //               toast.error(`Create Chatbot Path Failed (Status ${result.status})`, {
        //                   position: toast.POSITION.TOP_CENTER
        //               });
        //           })
        //       }
        //   })

        // }else if(this.state.modal.type==='eform'){
        //   let body = new URLSearchParams({
        //     id_rule: parseInt(this.props.match.params.id),
        //     id_eform:parseInt(this.state.modal.id_api),
        //     id_currentNode: parseInt(this.state.modal.id_currentNode),
        //     id_nextNode: parseInt(this.state.modal.id_nextNode),
        //     key: parseInt(this.state.modal.key)
        //   })
        //   console.log(body)

        //   /* Request */
        //   NodeApi.createPathForm(body).then((result) => {
        //       if(result.status === 200) {
        //           /* Handle Success */
        //           this.fetchNow();

        //           $('#modal-create').modal('hide');

        //           toast.success(`Chatbot Path Created Succesfully`, {
        //               position: toast.POSITION.TOP_CENTER
        //           });
        //       }else{
        //           /* Handle Error/Failed */
        //           this.setState({
        //               isLoading: false
        //           }, () => {
        //               // $('#modal-create').modal('hide');

        //               toast.error(`Create Chatbot Path Failed (Status ${result.status})`, {
        //                   position: toast.POSITION.TOP_CENTER
        //               });
        //           })
        //       }
        //   })
        // }else{

        // }
    })
  }

  //===================EDIT PATH============================================

  editPath() {
    this.setState({
        isLoading: true
    }, () => {
        /* Store Request Body */
        let body = new URLSearchParams({
          id_nextNode: parseInt(this.state.modal.id_nextNode),
          type: this.state.modal.type,
          key: this.state.modal.key,
        }) 

        /* Request */
        NodeApi.updatePath(this.state.modal.id,body).then((result) => {
          if(result.status === 200) {
              /* Handle Success */

            let isi = new URLSearchParams({
              response: this.state.modal.response,
              title: this.state.modal.title
            })
              /* Request */
            NodeApi.update(this.state.modal.id_nextNode,isi).then((result) => {
              if(result.status === 200) {
                  /* Handle Success */
                  this.fetchNow();
                  $('#modal-create').modal('hide');
                  toast.success(`Chatbot Path Updated Succesfully`, {
                      position: toast.POSITION.TOP_CENTER
                  });
              }else{
                  /* Handle Error/Failed */
                  this.setState({
                      isLoading: false
                  }, () => {
                      toast.error(`Update Chatbot Path Failed (Status ${result.status})`, {
                          position: toast.POSITION.TOP_CENTER
                      });
                  })
              }
            })
          }else{
              /* Handle Error/Failed */
              this.setState({
                  isLoading: false
              }, () => {
                  // $('#modal-create').modal('hide');

                  toast.error(`Update Chatbot Path Failed (Status ${result.status})`, {
                      position: toast.POSITION.TOP_CENTER
                  });
              })
          }
        })

        
        // if(this.state.key==='default'){
        //   let body = new URLSearchParams({
        //       id_rule: parseInt(this.props.match.params.id),
        //       id_currentNode: parseInt(this.state.modal.id_currentNode),
        //       id_nextNode: parseInt(this.state.modal.id_nextNode),
        //       type: this.state.modal.type,
        //       key: parseInt(this.state.modal.key)
        //   })

        //   /* Request */
        //   NodeApi.createPathDefault(body).then((result) => {
        //       if(result.status === 200) {
        //           /* Handle Success */
        //           this.fetchNow();

        //           $('#modal-create').modal('hide');

        //           toast.success(`Chatbot Path Created Succesfully`, {
        //               position: toast.POSITION.TOP_CENTER
        //           });
        //       }else{
        //           /* Handle Error/Failed */
        //           this.setState({
        //               isLoading: false
        //           }, () => {
        //               // $('#modal-create').modal('hide');

        //               toast.error(`Create Chatbot Path Failed (Status ${result.status})`, {
        //                   position: toast.POSITION.TOP_CENTER
        //               });
        //           })
        //       }
        //   })

        // }
    })
  }

  //======================== DELETE PATH =========================================
  deletePath(){
    this.setState({
      isLoading: true
    }, () => {
        /* Request Delete */
        NodeApi.deletePath(this.state.modal.id).then((result) => {
            if(result.status === 200) {
                /* Handle Success */
                this.fetchNow();

                $('#modal-create').modal('hide');

                toast.success(`Chatbot Path Removed Succesfully`, {
                    position: toast.POSITION.TOP_CENTER
                });
            }else{
                /* Handle Error/Failed */
                this.setState({
                    isLoading: false
                }, () => {
                    $('#modal-create').modal('hide');

                    toast.error(`Remove Path Failed (Status ${result.status})`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
            }
        })
    })
  }

  handleChange(event) {
    let modal = this.state.modal;
    modal[event.target.name] = event.target.value;
    // console.log(event.target.checked)
    this.setState({
        modal:modal
    })
  }

  checkChange(event) {
    let trg = this.state.modal.key;
    if(event.target.checked){
      trg='';
    }
    this.setState({
        modal : {
          ...this.state.modal,
          key: trg,
          trigger:event.target.checked
        }
    })
  }

  modalCreate() {
    this.setState({
        modal: {
          id: '',
          id_currentNode: '',
          id_nextNode: '',
          name:'',
          type: '',
          key: ''
        }
    }, () => { $('#modal-create').modal('show')
    $('.node-parent').html('') })
  }

  nodeType(id){
    this.setState({
      isLoading: true
    }, () => {
        /* Request Get */
        console.log(id)
        NodeApi.getById(id).then((result) => {
          let types=[];
          if(result.status === 200) {
            types = result.data;
          }
          this.setState({
              isLoading: false,
              types
          })
        })
    })
  }

  retrieveAPINode(){
    this.setState({
      isLoading: true
    }, () => {
        /* Request Get */
        NodeApi.getAPINode(this.state.rule.id_device).then((result) => {
          let apiData = [];
          console.log(result.data)
          if(result.status === 200) {
            apiData = result.data;
          }

          console.log(apiData)
          this.setState({
              isLoading: false,
              apiData
          })
        })
    })
  }

  retrieveEformNode(){
    this.setState({
      isLoading: true
    }, () => {
        /* Request Get */
        NodeApi.getEformNode(this.state.rule.id_device).then((result) => {
          let FormIsi = [];
          if(result.status === 200) {
            FormIsi = result.data;
          }

          console.log(FormIsi)
          this.setState({
              isLoading: false,
              FormIsi
          })
        })
    })
  }

  appendData() {
    this.displayData.push(
    <div className='row'>
      <div className='col-9'>
      <input type='text' className='form-control textt' name='question[]' placeholder='Tulis Pertanyaan'/></div>
      <div className='col-3'>
      <button type='button' className='btn btn-danger' onClick={this.removeAppend(this)}> x </button></div>
    </div>);
    this.setState({
       showdata : this.displayData,
       postVal : ""
    });
  }

  removeAppend(e){
    console.log(e)
  }


   //=== RENDER VIEW ====================================================== //
  render(){
    
    const orgChart = {
      name: 'Start',
      id:214,
      id_currentNode:1,
      id_nextNode:96,
      key:'test',
      type:'default',
      children: [
        {
          name: 'API NODE',
          id:123,
          id_currentNode:1,
          id_nextNode:5,
          key:1,
          type:'API',
          children: [
            {
              name: 'Welcome wabot',
              id:222,
              id_currentNode:5,
              id_nextNode:11,
              key:1,
              type:'default',
              children: [
                {
                  name: 'test',
                  id:21,
                  id_currentNode:11,
                  id_nextNode:30,
                  key:1,
                  type:'form',
                },
              ],
            },
            {
              name: 'coba aja',
              id:16,
              id_currentNode:5,
              id_nextNode:12,
              key:2,
              type:'form',
              children: [
                {
                  name: 'coba',
                  id:35,
                  id_currentNode:12,
                  id_nextNode:33,
                  key:1,
                  type:'default',
                },
              ],
            },
          ],
        },
      ],
    };
    
    const renderForeignObjectNode = ({
      nodeDatum,
      editButton,
      addButton,
      foreignObjectProps
    }) => (
      <g>
        <circle r={15}></circle>
        <foreignObject {...foreignObjectProps}>
        <div title={nodeDatum.name}>
          <span title={nodeDatum.name} className="elemental-node" onClick={()=>editButton(nodeDatum)}>
            {nodeDatum.name}
          </span> &nbsp;
          <button style={{border:'0px',backgroundColor:'transparent'}} onClick={()=>addButton(nodeDatum)}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADaUlEQVRoge2ZW0tUURTHf4U6CjrgDYJ6CpnKylFTu0Ch9Bmq9/o2gjbd87l68dG0XpIgCetBSjFI+wDhpYQ0yEacHtY67vEwnplzzjoDgX847PG49n+tdfbaa++9NhziELFwxIgnBVwBBoEu4BRwDGgECsBv4DuwDCwAb4FZYNtIf2T0AmPABmJomGcDeAr0VN1qVfraZ9BnYAS4gYxCM1CrTzOQ1f+NAvNF/XaBKe2TOBqAHLCjyn+p0WcicHVq303lyuvf9SaWlkAG9+XyyJdsMeBtRT5KXrk/AR0GvPswAKypgq8kE7e9wJLqWAX6rYgHcMM8ATRZEZdAE/ASF56xncjgvvwzoCYuYQWoAZ7jRiJyODXgYn6C6hjvoQaYxM2JSBM7h4v5RjPTKkcaWfgKSHYKhR4kVeaJN2HfAzMx+l8osiPUOuEtUqMxlINbrOLgvnJMVtqhF5cF4uZ5CwfagC1kxe6upMMYEeOuBCwcALirPE/KCaZwG7Mo2wM/rBw4pzw/gLogwSHcxswCVg4ALCrXteKXR31Cg9pOGym1xBtth4pf+h3IavshcXPCY1bbbPFLvwMZbZcSNyc8PJsyQULrSJy1Gim1nANtyrUWJLStQoEzHVlhwx4hyz3lVuyUyv0pfukPoUqxG7FfEExG6r8LIf8IrGp73EipJU5ou1L80u+AN9NPJ25OeHg27cuQfgcWtL2UuDnhcVnb+SChQSTOAoVCwHIOfFGuq0FCKeCnCnYaKLVy4LzyrCOFsj34Q2gbGNffdwwUW+G2tuPI6SwQPUie3yR+OrUYgXbcgSZbRnYPU6o4F1O5hQMPcJWRitGFDFUeOWJGxQzwLkb/PuRQ/xc51ITCCOL5EslW4w5CGvimNgxHIahHikoFpNxXzcJWLS6M55DsGAkdyPaigJT7quFELfBCda4AJ+MS9iMlFq82k45LGIA08ApX1umzIu7HjcQyUjGzRh8u5lcwNN5DB25O7CAVszYD3nbgIe7WZw6DsDkI9Uh28m5TtpCiU+gUh2wPcspRQFLlMDEmbBh0IfNhF7dYLapBN5ESYAtyNK1DVvRu4BZwD7cx8y75JoCz1TDcj27gMVIxC3sGXgceEWJ7UApWF911wEXgOhIa3kW3twBusv+iexr4SAUbs0McImH8A5bcGFl1LWQ1AAAAAElFTkSuQmCC"/>
          </button>
        </div>
        </foreignObject>
      </g>
    );
    const id = this.props.match.params.id;

    const editButton = (param) => {
      NodeApi.getById(param.id_nextNode).then((result) => {
        if(result.status === 200) {
          const types = result.data[0];

          this.setState({
            method:'UPDATE',
            modal: {
              id: param.id,
              title:types.title,
              response:types.response,
              id_currentNode: param.id_currentNode,
              id_nextNode: param.id_nextNode,
              name:param.name,
              type: param.type,
              key: param.key==null?'':param.key,
              trigger:param.key==null?true:false
              }
          }, () => { $('#modal-create').modal('show')
          $('.node-parent').html(param.name) })
        }
      })
      this.retrieveAPINode();
      this.retrieveEformNode();
      
    }

    const addButton = (param) => {
      this.setState({
        method: "CREATE",
        modal: {
          id: '',
          title:'',
          response:'',
          id_currentNode: param.id_currentNode,
          id_nextNode: '',
          name:param.name,
          type: '',
          key: '',
          trigger:false
          }
      }, () => { $('#modal-create').modal('show')})
    }


    const deleteButton = (param) => {
      this.setState({
        isLoading: true
      }, () => {
          /* Request Delete */
          NodeApi.delete(param.id).then((result) => {
              if(result.status === 200) {
                  /* Handle Success */
                  this.fetchNow();

                  $('#modal-delete').modal('hide');

                  toast.success(`Chatbot Node Removed Succesfully`, {
                      position: toast.POSITION.TOP_CENTER
                  });
              }else{
                  /* Handle Error/Failed */
                  this.setState({
                      isLoading: false
                  }, () => {
                      $('#modal-delete').modal('hide');

                      toast.error(`Remove Node Failed (Status ${result.status})`, {
                          position: toast.POSITION.TOP_CENTER
                      });
                  })
              }
          })
      })
    }

  const nodeSize = { x: 300, y: 300 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  return (
    <React.Fragment>
      <Helmet title={"Chatbot - " + process.env.REACT_APP_WEB_NAME} />
      <Loading show={this.state.isLoading} />
      <Breadcrumbs title={"Chatbot Rule "+ this.state.rule.rule_name} />

      <Container>
          <div className="row">
              <div className="col-12">
                  <div className="card">
                      <div className="card-header py-4" style={{paddingBottom:'30px'}}>
                          <div className="mx-0 d-flex align-items-center justify-content-between">
                              <h5 className="m-0 pt-1">Tree Diagram</h5>
                              {/* {
                                (this.state.data.length === 0)
                                  ? <button onClick={this.modalCreate} className="btn btn-success d-flex align-items-center px-3">
                                      <Plus className="mr-2" size={18} style={{marginTop: '-2px'}}/>
                                      Create Path
                                    </button>
                                  :null
                              } */}
                          </div>
                      </div>
                      <div id="treeWrapper" style={{ height: '50em', transform:'translate(50px, 100px)' }}>
                      <Tree 
                          data={orgChart}
                          nodeSize={nodeSize}
                          // zoomable={false}
                          zoom={0.4}
                          // scaleExtent={1}
                          separation={{ siblings: 1, nonSiblings: 1.5 }}
                          pathFunc="step"
                          renderCustomNodeElement={(rd3tProps) =>
                            renderForeignObjectNode({ ...rd3tProps,editButton,addButton, foreignObjectProps })
                          }
                      />
                    </div>
                  </div>
              </div>
          </div>
      </Container>

      <div className="modal fade" id="modal-create" tabIndex="-1" aria-labelledby="modal-create" aria-hidden="true">
          <div className="modal-dialog modal-lg">
              <div className="modal-content">
                  <div className="modal-header">
                  {
                    this.state.method === "CREATE"
                      ? <h5 className="modal-title">Tambah Path Baru</h5>
                      : <h5 className="modal-title">Edit Path</h5>
                  }
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                      <div className="form-group" style={{display:'none'}}>
                          <label className="form-label">Node Current</label><br></br>
                          <label className='node-parent'></label>
                      </div>
                      <div className="form-group">
                          <div className="d-flex align-items-center mb-2">
                              <label className="form-label mb-0 mr-1">Judul Pesan</label>
                          </div>
                          <input type='text' className="form-control" name="title" onChange={this.handleChange} value={this.state.modal.title} maxLength={16}/>
                      </div>
                      <div className="form-group">
                          <div className="d-flex align-items-center mb-2">
                              <label className="form-label mb-0 mr-1">Jenis Pesan</label>
                          </div>
                          <select value={this.state.modal.type} onChange={this.handleChange} name="type" className="form-control">
                              <option value="" disabled>-- Pilih Jenis Pesan--</option>
                              <option value="default">Information Node</option>
                              <option value="api">API Node</option>
                              <option value="eform">E-form Node</option>
                          </select>
                      </div>
                      {
                        (this.state.modal.type==='default')?
                      <div className="form-group">
                          <div className="d-flex align-items-center mb-2">
                              <label className="form-label mb-0 mr-1">Isi Pesan</label>
                          </div>
                          <textarea className="form-control" name="response" rows={3} onChange={this.handleChange} value={this.state.modal.response}></textarea>
                      </div>:null
                      }
                      {
                        (this.state.modal.type==='api')?
                        <React.Fragment>
                          <div className='box'>
                          <div className="form-group">
                              {/* <label className="form-label">Url API</label><br></br>
                              <input type='text' name='url' className='form-control' onChange={this.handleChange}/> */}
                              <label className="form-label">API Node</label>
                              <select value={this.state.modal.id_api} onChange={this.handleChange} name="id_api" className="form-control">
                                  <option value="" disabled>-- Choose API Node--</option>
                                  {
                                    this.state.apiData.map((value, index) => {
                                      return(
                                        <option value={value.id} key={index}>{value.url}</option>
                                      )
                                    })
                                  }
                              </select>
                          </div>
                          {/* <div className="form-group">
                            <label className="form-label">Method</label><br></br>
                            <input type='text' name='method' className='form-control' onChange={this.handleChange}/>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Parameter</label><br></br>
                            <input type='text' name='param' className='form-control' onChange={this.handleChange}/>
                            <small>Tambahkan tanda koma (,) untuk pemisah. ex: test1,test2</small>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Variabel</label><br></br>
                            <input type='text' name='var' className='form-control' onChange={this.handleChange}/>
                            <small>Tambahkan tanda koma (,) untuk pemisah. ex: test1,test2</small>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Response Sukses</label><br></br>
                            <textarea className='form-control' onChange={this.handleChange}></textarea>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Response Gagal</label><br></br>
                            <input type='text' name='method' className='form-control' onChange={this.handleChange}/>
                          </div> */}
                          </div>
                        </React.Fragment>
                        :null
                      }
                      {
                        (this.state.modal.type==='eform')?
                        <React.Fragment>
                          <div className='box'>
                            {/* <div className="form-group">
                                <label className="form-label">Nama E-Form</label><br></br>
                                <input type='text' name='eform_name' className='form-control' onChange={this.handleChange}/>
                            </div>
                            <div className='form-group'>
                              <label className="form-label">Pertanyaan</label><br></br>
                              <input  type="submit" className="btn btn-primary" onClick={this.appendData}  value="Tambah Pertanyaan"/>
                            </div>
                            <div id="display-data-Container">
                              {this.displayData}
                            </div> */}
                            <div className='form-group'>
                            <label className="form-label">e-Form Node</label>
                              <select value={this.state.modal.id_eform} onChange={this.handleChange} name="id_eform" className="form-control">
                                  <option value="" disabled>-- Choose E-form Node--</option>
                                  {
                                    this.state.FormIsi.map((value, index) => {
                                      return(
                                        <option value={value.id} key={index}>{value.url}</option>
                                      )
                                    })
                                  }
                              </select>
                            </div>
                          </div>
                        </React.Fragment>
                        :null
                      }
                      <div className="form-group">
                          <div className="d-flex align-items-center mb-2">
                              <label className="form-label mb-0 mr-1">Trigger</label>
                          </div>
                        </div>
                      <div className='form-group'>
                        <input type="checkbox" onChange={this.checkChange} name="any" checked={this.state.modal.trigger}/>
                          <label> &nbsp;Any</label>                   
                          <input value={this.state.modal.key} disabled={this.state.modal.trigger} onChange={this.handleChange} type="text" name="key" placeholder="Masukkan trigger" className="form-control"/>
          
                      </div>
                  </div>
                  <div className="modal-footer">
                      {/* <button className="btn btn-danger" onClick={this.deletePath} style={{float:'right'}}>Delete</button> */}
                      {/* <button data-dismiss="modal" className="btn btn-outline-success">Cancel</button> */}

                      {
                        this.state.method === "CREATE"
                        ?   
                        <React.Fragment>
                            <button data-dismiss="modal" className="btn btn-outline-success">Cancel</button>
                            <button className="btn btn-success" onClick={this.create}>Create</button> 
                          </React.Fragment>
                          :   
                          <React.Fragment>
                            <button className="btn btn-danger float-right" onClick={this.deletePath} style={{position: 'absolute', left: '0', marginLeft: '10px'}}>Delete</button>
                            <button className="btn btn-primary" onClick={this.editPath}>Update</button>
                          </React.Fragment>
                      }
                  </div>
              </div>
          </div>
      </div>
  </React.Fragment>
  );
}
}
export default withRouter(Diagram);