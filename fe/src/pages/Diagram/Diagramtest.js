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

class Diagramtest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentNode: null,
      parrentNode: null,
      dataTree: [
        {
          id: "",
          id_parent: "",
          id_node: "",
          key_event: "",
          title: "",
          tipe: "",
          children: [],
        },
      ],
      FormIsi: [],
      apiData: [],
      title: "",
      response: "",
      tipe: "",
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
      map[list[i].id_node] = i;
      list[i].color = "";
      list[i].children = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];

      if (parseInt(node.id_parent) !== 1) {
        list[map[node.id_parent]].children.push(node);
        // console.log("parenbt", list[map[node.id_parent]]);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
  convertArrayFlatToTreeNew(list, colParent, colChild) {
    var map = {},
      node,
      roots = [],
      i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id_node] = i;
      list[i].children = [];
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.id_parent !== 1) {
        if (list[map[node.id_parent]]) {
          list[map[node.id_parent]].children.push(node);
        }
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
    this.setState(
      {
        isLoading: true,
      },
      () => {
        /* Request Get */
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
    );
  }
  retrieveAPINode() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        NodeAPI.getAPINode(this.state.rule.id_device).then((result) => {
          let apiData = [];
          console.log(result.data);
          if (result.status === 200) {
            apiData = result.data;
          }
          console.log(apiData);
          this.setState({
            apiData,
          });
        });
      }
    );
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
    const data = new FormData(e.currentTarget);
    let field = {};
    for (let [key, value] of data.entries()) {
      Object.assign(field, { [key]: value });
    }
    this.setState({ isLoading: true }, () => {
      let body = new URLSearchParams({
        title: field.title,
        response: field.response,
      });
      NodeAPI.createFe(body).then((result) => {
        let body = new URLSearchParams({
          id_rule: parseInt(this.props.match.params.id),
          id_parent: parseInt(this.state.currentNode.id_node),
          id_node: parseInt(result.data),
          tipe: field.tipe,
          key_event: field.key,
          title: field.title,
        });
        NodeAPI.createPathDefaultFe(body).then((result) => {
          this.setState(
            {
              isLoading: false,
              title: "",
              tipe: "",
              isTrigger: false,
              key: "",
              response: "",
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

    // console.log(data);
  }

  handleCheck(e) {
    let flattenArray = this.convertArrayTreeToFlat(this.state.dataTree, []);
    const filterNode = flattenArray.filter(
      (row) => e.id_parent === row.id_node
    );

    this.setState(
      {
        currentNode: e,
        parrentNode: filterNode[0],
      },
      () => {
        $("#modal-create").modal("show");
      }
    );
  }
  fetchNow() {
    this.setState({ isLoading: true }, () => {
      RuleAPI.get().then((res) => {
        let rule = [];

        if (res.status === 200) {
          rule = res.data;
          if (rule != null) {
            let id = this.props.match.params.id;
            rule = rule.rule;
            rule = rule.find(function (item) {
              return item.id === parseInt(id);
            });
          }
          this.setState({ rule });
          NodeAPI.getPathByRule(this.props.match.params.id).then((result) => {
            let data = [];
            if (result.status === 200) {
              data = result.node;
              data.map((row, key) => {
                Object.assign(row, { children: [] });
              });

              const newNode = [];

              result.nodeNew.map((row, key) => {
                newNode.push({
                  id: row.id,
                  id_parent: row.id_currentNode,
                  id_node: row.id_nextNode,
                  title: row.title ? row.title : "",
                  key_event: row.key,
                  tipe: row.type,
                  children: [],
                });
              });
              const checkNew = this.convertArrayFlatToTreeNew(newNode);
              console.log("console", checkNew);

              const check = this.convertArrayFlatToTree(data);
              this.setState(
                {
                  // dataTree: check,
                  dataTree: checkNew,
                  isLoading: false,
                },
                () => {}
              );
              // console.log(nodeNew);
              // console.log("console", this.convertArrayFlatToTreeNew(nodeNew));
            }
          });
        }
      });
    });
  }

  componentDidMount() {
    this.fetchNow();
    this.retrieveEformNode();
    this.retrieveAPINode();
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
      <React.Fragment>
        <Helmet title={"Chatbot - " + process.env.REACT_APP_WEB_NAME} />
        <Breadcrumbs title={"Chatbot Rule "} />
        <Loading show={this.state.isLoading} />

        <Container>
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
                          id_parent: this.state.dataTree[0].id_parent,
                          id_node: this.state.dataTree[0].id_node,
                          title: this.state.dataTree[0].title,
                          key_event: this.state.dataTree[0].key_event,
                          tipe: this.state.dataTree[0].tipe,
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
        </Container>
        {this.state.currentNode !== null && (
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
                    <div className="form-group">
                      <label className="form-label">current node</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        disabled
                        value={this.state.currentNode.title}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">parent node</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        disabled
                        value={this.state.parrentNode.title}
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
                    )}
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
                  <div className="modal-footer">
                    <React.Fragment>
                      <button
                        data-dismiss="modal"
                        className="btn btn-outline-success"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-success">Create</button>
                    </React.Fragment>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default withRouter(Diagramtest);
