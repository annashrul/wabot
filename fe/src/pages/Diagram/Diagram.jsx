import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Container } from "reactstrap";
import { withRouter } from "react-router";
import Breadcrumbs from "../../components/Breadcrumb";
import { Tree } from "react-organizational-chart";
import ComponentNode from "./ComponentNode";
import $, { type } from "jquery";

import styled from "styled-components";
import RuleAPI from "../../api/Chatbot/Rule";
import NodeAPI from "../../api/Chatbot/Node";
import { toast } from "react-toastify";
import Loading from "../../components/loading/Loading";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid black;
  font-weight: bold;
`;

class Diagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingTitle:"loading ..",
      isLoading: false,
      currentNode: null,
      parrentNode: null,
      isModal:false,
      isAdd:true,
      isFirst:false,
      isPrev:false,
      alur:"",
      dataTree: [
        {
          id: "1",
          id_currentNode: "1",
          id_nextNode: "2",
          key: "any",
          title: "start",
          node_title: "start",
          type: "default",
          response: "-",
          children: [],
        },
      ],
      FormIsi: [],
      apiData: [],
      title: "",
      response: "",
      tipe: "default",
      isTrigger: false,
      key: "",
      id_eform: "",
      id_api: "",
      no: 0,
      zoom: 80,
      isZoomIn: false,
      isZoomOut: true,
      timer: 0,
      rule: [],
      id_currentNode:"",
      id_nextNode:""
    };
    this.convertArrayFlatToTree = this.convertArrayFlatToTree.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveEformNode = this.retrieveEformNode.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  convertArrayFlatToTree(list) {
    var map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id_nextNode] = i;
      list[i].color = "";
      list[i].children = [];
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (parseInt(node.id_currentNode) !== 1) {
        console.log("list[map[node.id_currentNode]].children",list[map[node.id_currentNode]].children)
        list[map[node.id_currentNode]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  convertArrayTreeToFlat(nodes, arr) {
    if (!nodes) {
      return [];
    }
    if (!arr) {
      arr = [];
    }
    for (var i = 0; i < nodes.length; i++) {
      arr.push(nodes[i]);
      this.convertArrayTreeToFlat(nodes[i].children, arr);
    }
    return arr;
  }
  retrieveEformNode() {
    NodeAPI.getEformNode(this.state.rule.id_device).then((result) => {
        let FormIsi = [];
        if (result.status === 200) {
          FormIsi = result.data;
        }
        this.setState({
          isLoading: false,
          FormIsi,
        });
      });
  }
  retrieveAPINode() {
    this.setState({isLoading:true},()=>{
      NodeAPI.getAPINode(this.state.rule.id_device).then((result) => {
          let apiData = [];
          if (result.status === 200) {
            apiData = result.data;
          }
          this.setState({apiData},()=>{
            this.retrieveEformNode();
          });
        });
    })
  }
  handleChange(e) {
    const target = e.target;
    const type = target.type;
    const col = target.name;
    const val = target.value;
    let state = {};

    if (type === "checkbox") {
      state["isTrigger"] = target.checked;
    } else {
      state[col] = val;
    }
    this.setState(state,()=>{
      if(col==="alur"){
        if(val === "0"){
          this.setState({title:"Kembali ke menu sebelumnya",id_nextNode:this.state.parrentNode.id_nextNode,key:"0"})
        }
        else if(val === "99"){
          this.setState({title:"Kembali ke menu awal",id_nextNode:this.state.dataTree[0].id_nextNode ,key:"99"})
        }
        else {
          this.setState({title:"",id_nextNode:"",key:""})
        }
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let field = {};
    for (let [key, value] of data.entries()) {
      Object.assign(field, { [key]: value });
    }
    if(field.alur!==''){
      let fieldBack=new URLSearchParams({
        id_rule: parseInt(this.props.match.params.id),
        id_currentNode:field.id_currentNode,
        id_nextNode:this.state.id_nextNode,
        type:'default',
        key:field.alur,
        title:field.title,
      });
      this.setState({isLoading:true},()=>{
        NodeAPI.createPathDefaultFe(fieldBack).then((result) => {
          this.handleCloseModal(null,()=>{
            this.fetchNow();
            toast.success(`Chatbot Path Created Succesfully`, {
              position: toast.POSITION.TOP_CENTER,
            });
          })
        });
      })
    }
    else{
      if(this.state.title!==""||this.state.key!==""){
        if(this.state.isAdd){
          this.setState({ isLoading: true }, () => {
            let body = new URLSearchParams({
              title: field.title,
              response: field.response,
            });
            NodeAPI.createFe(body).then((result) => {
              let idNext=parseInt(result.data);
              let bodys = new URLSearchParams({
                id_rule: parseInt(this.props.match.params.id),
                id_currentNode: parseInt(this.state.currentNode.id_nextNode),
                id_nextNode: idNext,
                type: 'default',
                key: field.key,
                title: field.title,
              });

              NodeAPI.createPathDefaultFe(bodys).then((result) => {
                this.handleCloseModal(null,()=>{
                   this.fetchNow();
                    toast.success(`Chatbot Path Created Succesfully`, {
                      position: toast.POSITION.TOP_CENTER,
                    });
                })
              });
            });
          });
        }else{
          this.setState({isLoading:true},()=>{
            let bodyNode = new URLSearchParams({
              title: field.title,
              response: field.response,
              id:this.state.currentNode.id_nextNode,
              id_path:this.state.currentNode.id
            });
            NodeAPI.updateFe(bodyNode).then((result)=>{
              this.handleCloseModal(null,()=>{
                this.fetchNow();
                toast.success(`Chatbot Path Created Succesfully`, {
                  position: toast.POSITION.TOP_CENTER,
                });
              })
            })
          })

        }
      }
    }



  }

  handleCheck(e) {

    let flattenArray = this.convertArrayTreeToFlat(this.state.dataTree, []);
    const filterNode = flattenArray.filter(
      (row) => e.id_currentNode === row.id_nextNode
    );

    this.setState(
      {
        isModal:true,
        currentNode: e,
        parrentNode: filterNode.length > 0 ? filterNode[0] : e,
      },
      () => {
        $("#modal-create").modal("show");
      }
    );
  }

  fetchNow() {

    this.setState({ isLoading: true, loadingTitle:"checking data rule", currentNode:null, parrentNode:null}, () => {
      RuleAPI.get().then((res) => {
        let rule = [];
        let parId=this.props.match.params.id;
        if (res.status === 200) {
          rule = res.data;
          if (rule != null) {
            let id = parId;
            rule = rule.rule;
            rule = rule.find(function (item) {
              return item.id === parseInt(id);
            });
          }
          this.setState({ rule,loadingTitle:"checking data path", currentNode:null, parrentNode:null},()=>{
            // this.retrieveAPINode();
            NodeAPI.getPathByRule(parId).then((result) => {
              if(result.node.length>0){
                let data = [];
                if (result.status === 200) {
                  data = result.node;

                  data.map((row, key) => {
                    Object.assign(row, { children: [] });
                  });

                  // console.log(data);
                  if(data.length>1){
                    const check = this.convertArrayFlatToTree(data);
                    this.setState({
                      dataTree: check,
                      loadingTitle:"data siap dikonsumsi"}, () => {
                      this.setState({isLoading:false, loadingTitle:""},()=>{
                        $("#modal-create").modal("hide");
                      })
                    });
                  }else{
                    const stateTree=this.state.dataTree;
                    const mergedArray = [ ...stateTree, ...data ];
                    console.log(mergedArray)
                    const check = this.convertArrayFlatToTree(mergedArray);
                    this.setState({dataTree:check,isLoading:false, loadingTitle:""});
                  }

                }
              }else{
                this.setState({isLoading:false, loadingTitle:""})

              }
            });
          });
        }
      });
    });
  }

  componentDidMount() {
    this.fetchNow();

  }
  handleZoom(e) {
    this.setState({isLoading:true},()=>{
      let zooms = this.state.zoom;
      let isZoomIn = this.state.isZoomIn;
      let isZoomOut = this.state.isZoomOut;
      if (e === "+") {
        if (zooms < 100) {
          zooms = zooms + 5;
          isZoomIn = true;
          isZoomOut = false;
        }
      } else {
        if (zooms > 10) {
          zooms = zooms - 5;
          isZoomIn = false;
          isZoomOut = true;
        }
      }
      // clearTimeout(this.state.timer);
      setTimeout(() => {
        this.setState({ zoom: zooms, isZoomIn, isZoomOut,isLoading:false });
      }, 10);
      // this.setState({ timer: newTimer });
    })

  }

  handleCloseModal(e=null,callback=null){
    this.setState({isLoading:true,loadingTitle:"generate tree view chatbot"},()=>{
      $("#modal-create").modal("hide");
      setTimeout(()=>{
        this.setState({
          isAdd:true,
          alur:"",
          isModal:false,
          title: "",
          response: "",
          tipe: "default",
          isTrigger: false,
          key: "",
          id_nextNode:"",
          currentNode:null
        },()=> {
          if(callback!==null) callback();
        })
      },50)
    })

  }

  render() {
    const StyledNodeWrap = styled.div`
      zoom: ${this.state.zoom}% !important;
      overflow-x: scroll;
      padding-bottom: 20px;
    `;
    console.log(this.state.dataTree)
    console.log(this.state.currentNode)
    return (
      <React.Fragment>
        <Helmet title={"Chatbot - " + process.env.REACT_APP_WEB_NAME} />
        <Breadcrumbs title={"Chatbot Rule "} />
        <Loading show={this.state.isLoading}  msg={this.state.loadingTitle}/>

        {this.state.currentNode===null&&<div className="container">
           <div className="row">
            <div className="col-12">
              <div className="card">
                <div
                  className="card-header py-4"
                  style={{ paddingBottom: "30px" }}
                >
                  <div className="mx-0 d-flex justify-content-between">
                    <h5 className="m-0 pt-1">{this.state.title} Tree Diagram</h5>
                    <h5 className="m-0 pt-1">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          this.handleZoom("-")
                        }}
                      >
                        zoom out{" "}
                        {this.state.isZoomOut ? `${this.state.zoom}%` : ""}
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => this.handleZoom("+")}
                      >
                        zoom in{" "}
                        {this.state.isZoomIn ? `${this.state.zoom}%` : ""}
                      </button>
                    </h5>
                  </div>
                </div>
                <div
                  className="card-body treeBuilder "
                  style={{
                    padding: "0",
                  }}
                >
                  {
                    this.state.dataTree.length>0&&<StyledNodeWrap>
                    <Tree
                      lineWidth={"2px"}
                      lineColor={"rgba(0, 0, 0, 0.2)"}
                      lineBorderRadius={"10px"}
                      label={<StyledNode></StyledNode>}
                    >
                      <ComponentNode
                        obj={{
                          id: this.state.dataTree[0].id,
                          id_currentNode: this.state.dataTree[0].id_currentNode,
                          id_nextNode: this.state.dataTree[0].id_nextNode,
                          title: this.state.dataTree[0].title,
                          node_title: this.state.dataTree[0].node_title,
                          key: this.state.dataTree[0].key,
                          type: this.state.dataTree[0].type,
                          response: this.state.dataTree[0].response,
                          children: this.state.dataTree[0].children,
                        }}
                        callback={this.handleCheck.bind(this)}
                      />
                    </Tree>
                  </StyledNodeWrap>
                  }

                </div>
              </div>
            </div>
          </div>
       </div>}
       {
        this.state.currentNode!==null&&<div
            className="modal fade"
            id="modal-create"
            tabIndex="-1"
            aria-labelledby="modal-create"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div className="modal-dialog modal-md  modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Form Path</h5>
                  <button
                    onClick={(e)=>{
                      this.handleCloseModal(null,()=>{
                        this.setState({isLoading:false})
                      })
                    }}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>


                <form onSubmit={this.handleSubmit}>
                  <div className="modal-body">
                    <div className="row" style={{borderBottom:"1px solid #EEEEEE",marginBottom:"10px"}}>
                      <div className="col-md-2">
                        <button onClick={(e)=>{
                          e.preventDefault();
                          this.setState({
                            isAdd:true,
                            title:"",
                            response:"",
                            key:"",
                            isTrigger:false
                          });
                        }} className={`btn-custom-tab ${this.state.isAdd?'active':''}`}>
                          Tambah
                        </button>
                      </div>
                      <div className="col-md-2">
                        <button onClick={(e)=>{
                          e.preventDefault();
                          this.setState({
                            isAdd:false,
                            title:this.state.currentNode.title,
                            response:this.state.currentNode.response,
                            key:this.state.currentNode.key,
                            isTrigger:false
                          });
                        }} className={`btn-custom-tab ${!this.state.isAdd?'active':''}`}>
                          Ubah
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                         <div className="form-group">
                          <label className="form-label">Alur pesan</label>
                          <select name="alur" className="form-control" value={this.state.alur} onChange={this.handleChange}>
                            <option value="">Lanjut</option>
                            <option value="0">Kembali ke menu sebelumnya</option>
                            <option value="99">Kembali ke menu awal</option>
                          </select>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                             <div className="form-group">
                              <label className="form-label">Parrent Node</label>
                              <input
                                type="text"
                                className="form-control"
                                name="id_parrentNode"
                                readOnly
                                value={this.state.currentNode.id_currentNode}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">Current Node</label>
                              <input
                                type="text"
                                className="form-control"
                                name="id_currentNode"
                                readOnly
                                value={this.state.currentNode.id_nextNode}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">Next Node</label>
                              <input
                                type="text"
                                className="form-control"
                                name="id_nextNode"
                                readOnly
                                value={this.state.id_nextNode}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Judul Pesan</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            readOnly={this.state.alur==='0'||this.state.alur==='99'}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Isi Pesan</label>
                          <textarea
                            className="form-control"
                            name="response"
                            rows={10}
                            onChange={this.handleChange}
                            value={this.state.response}
                            readOnly={this.state.alur==='0'||this.state.alur==='99'}
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <div className="d-flex align-items-center mb-2">
                            <label className="form-label mb-0 mr-1">Trigger</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            onChange={this.handleChange}
                            name="any"
                          />
                          <label className="form-label"> &nbsp;Any</label>
                          <input
                            onChange={this.handleChange}
                            type="text"
                            name="key"
                            placeholder="Masukkan trigger"
                            className="form-control"
                            value={this.state.key}
                            disabled={this.state.isTrigger}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={(e)=>{
                        this.handleCloseModal(null,()=>{
                          this.setState({isLoading:false})
                        })
                      }}
                        data-dismiss="modal"
                        className="btn btn-outline-success"
                      >
                        Kembali
                      </button>
                      <button className="btn btn-success">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
       }
      </React.Fragment>
    );
  }
}
export default withRouter(Diagram);
