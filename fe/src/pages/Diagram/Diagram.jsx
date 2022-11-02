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
      isLoading: false,
      currentNode: null,
      parrentNode: null,
      isModal:false,
      isAdd:true,
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
    };
    this.convertArrayFlatToTree = this.convertArrayFlatToTree.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveEformNode = this.retrieveEformNode.bind(this);
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
      console.log("this.state.rule",this.state.rule)
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
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.state.title!==""){
      const data = new FormData(e.currentTarget);
      let field = {};
      for (let [key, value] of data.entries()) {
        Object.assign(field, { [key]: value });
      }
      if(this.state.isAdd){
        this.setState({ isLoading: true }, () => {
          let body = new URLSearchParams({
            title: field.title,
            response: field.response,
          });
          NodeAPI.createFe(body).then((result) => {
            let bodys = new URLSearchParams({
              id_rule: parseInt(this.props.match.params.id),
              id_currentNode: parseInt(this.state.currentNode.id_nextNode),
              id_nextNode: parseInt(result.data),
              type: field.tipe,
              key: field.key,
              title: field.title,
            });
            
            NodeAPI.createPathDefaultFe(bodys).then((result) => {
              this.setState(
                {
                  title: "",
                  tipe: "",
                  isTrigger: false,
                  key: "",
                  response: "",
                  isModal:false,
                  isLoading:false
                },
                () => {
                  this.fetchNow();
                  $("#modal-create").modal("hide");
                  toast.success(`Chatbot Path Created Succesfully`, {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }
              );
            });
          });
        });
      }else{
        this.setState({isLoading:false},()=>{
          let bodyNode = new URLSearchParams({
            title: field.title,
            response: field.response,
            id:this.state.currentNode.id_nextNode,
            id_path:this.state.currentNode.id
          });
          NodeAPI.updateFe(bodyNode).then((result)=>{
            this.setState(
                {
                  title: "",
                  tipe: "",
                  isTrigger: false,
                  key: "",
                  response: "",
                  isModal:false,
                  isLoading:false,
                  isAdd:true
                },
                () => {
                  this.fetchNow();
                  $("#modal-create").modal("hide");
                  toast.success(`Chatbot Path Created Succesfully`, {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }
              );
          })
        })
        
      }
      
    }
    

    // console.log(data);
  }

  handleCheck(e) {
    console.log(e);
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
    this.setState({ isLoading: true }, () => {
      RuleAPI.get().then((res) => {
        console.log(res);
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
          this.setState({ rule },()=>{
            this.retrieveAPINode();
           
            NodeAPI.getPathByRule(parId).then((result) => {
              console.log(result);
              if(result.node.length>0){
                let data = [];
                if (result.status === 200) {
                  data = result.node;
                  
                  data.map((row, key) => {
                    Object.assign(row, { children: [] });
                  });
                  const check = this.convertArrayFlatToTree(data);
                  this.setState({ dataTree: check}, () => {
                    this.setState({isLoading:false})
                  });
                }
              }
            });
          });
          
        }
      });
    });
  }

  componentDidMount() {
    this.fetchNow();
    // this.retrieveEformNode();
    
  }
  handleZoom(e) {
    clearTimeout(this.state.timer);
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
    const newTimer = setTimeout(() => {
      console.log(zooms)
      this.setState({ zoom: zooms, isZoomIn, isZoomOut });
    }, 300);
    this.setState({ timer: newTimer });
  }

  render() {
    const StyledNodeWrap = styled.div`
      zoom: ${this.state.zoom}% !important;
      overflow-x: scroll;
      padding-bottom: 20px;
    `;

    return (
      <>
        {/* <Helmet title={"Chatbot - " + process.env.REACT_APP_WEB_NAME} /> */}
        <Breadcrumbs title={"Chatbot Rule "} />
        <Loading show={this.state.isLoading} />

        <div className="container">
           <div className="row">
            <div className="col-12">
              <div className="card">
                <div
                  className="card-header py-4"
                  style={{ paddingBottom: "30px" }}
                >
                  <div className="mx-0 d-flex justify-content-between">
                    <h5 className="m-0 pt-1">Tree Diagram</h5>
                    <h5 className="m-0 pt-1">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => this.handleZoom("-")}
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
                  <StyledNodeWrap>
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
                </div>
              </div>
            </div>
          </div>
       </div>
        {this.state.currentNode!==null && (
          <div
            className="modal fade"
            id="modal-create"
            tabIndex="-1"
            aria-labelledby="modal-create"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Tambah Path</h5>
                  <button
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
                          console.log(this.state.currentNode)
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
                          <label className="form-label">current node</label>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            disabled
                            value={this.state.currentNode.id}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">parent node</label>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            disabled
                            value={this.state.parrentNode.id}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Judul Pesan</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Isi Pesan</label>
                          <textarea
                            className="form-control"
                            name="response"
                            rows={3}
                            onChange={this.handleChange}
                            value={this.state.response}
                          ></textarea>
                        </div>
                        {/* <div className="form-group">
                          <label className="form-label">Jenis Pesan</label>
                          <select
                            value={this.state.tipe}
                            onChange={this.handleChange}
                            name="tipe"
                            className="form-control"
                          >
                            <option value="" disabled>
                              -- Pilih Jenis Pesan--
                            </option>
                            <option value="default">Information Node</option>
                            <option value="api">API Node</option>
                            <option value="eform">E-form Node</option>
                          </select>
                        </div>
                        {this.state.tipe === "default" && (
                          <React.Fragment>
                            <div className="form-group">
                              <label>Isi Pesan</label>
                              <textarea
                                className="form-control"
                                name="response"
                                rows={3}
                                onChange={this.handleChange}
                                value={this.state.response}
                              ></textarea>
                            </div>
                          </React.Fragment>
                        )}
                        {this.state.tipe === "api" && (
                          <React.Fragment>
                            <div className="form-group">
                              <label className="form-label">API Node</label>
                              <select
                                value={this.state.id_api}
                                onChange={this.handleChange}
                                name="id_api"
                                className="form-control"
                              >
                                <option value="" disabled>
                                  -- Choose API Node--
                                </option>
                                {this.state.apiData.map((value, index) => {
                                  return (
                                    <option value={value.id} key={index}>
                                      {value.url}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </React.Fragment>
                        )}
                        {this.state.tipe === "eform" && (
                          <React.Fragment>
                            <div className="form-group">
                              <label className="form-label">e-Form Node</label>
                              <select
                                // value={this.state.id_eform}
                                onChange={this.handleChange}
                                name="id_eform"
                                className="form-control"
                              >
                                <option value="" disabled>
                                  -- Choose E-form Node--
                                </option>
                                {this.state.FormIsi.map((value, index) => {
                                  return (
                                    <option value={value.id} key={index}>
                                      {value.eform_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </React.Fragment>
                        )} */}
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
                          <label> &nbsp;Any</label>
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
                        data-dismiss="modal"
                        className="btn btn-outline-success"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-success">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default withRouter(Diagram);
