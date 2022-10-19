import React, { Component } from "react";
import { withRouter } from "react-router";
import { TreeNode } from "react-organizational-chart";
import styled from "styled-components";

class ComponentNode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let desc = this.props.obj.title;
    let isWrap = "nowrap";
    if (desc.length > 40) {
      desc = desc.substring(0, 40);
      isWrap = "break-spaces";
    }

    const StyledNode = styled.span`
      &:hover {
        color: #2c323f;
        background-color: white;
      }
      // width: 300px;
      padding: 10px;
      display: inline-block;
      font-weight: bold;
      color: #2c323f;
      background-color: #eeeeee;
      border-radius: 7px;
      cursor: pointer;
      box-shadow: 2px 10px 10px 2px rgba(0, 0, 0, 0.2);
      white-space: ${isWrap};
    `;
    return (
      <TreeNode
        label={
          <StyledNode
            onClick={(e) => {
              e.preventDefault();
              e.persist();
              this.props.callback(this.props.obj);
            }}
          >
            {this.props.obj.key_event} - {desc}
            <button
              style={{
                border: "0px",
                backgroundColor: "transparent",
              }}
            >
              <img
                style={{ height: "20px" }}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADaUlEQVRoge2ZW0tUURTHf4U6CjrgDYJ6CpnKylFTu0Ch9Bmq9/o2gjbd87l68dG0XpIgCetBSjFI+wDhpYQ0yEacHtY67vEwnplzzjoDgX847PG49n+tdfbaa++9NhziELFwxIgnBVwBBoEu4BRwDGgECsBv4DuwDCwAb4FZYNtIf2T0AmPABmJomGcDeAr0VN1qVfraZ9BnYAS4gYxCM1CrTzOQ1f+NAvNF/XaBKe2TOBqAHLCjyn+p0WcicHVq303lyuvf9SaWlkAG9+XyyJdsMeBtRT5KXrk/AR0GvPswAKypgq8kE7e9wJLqWAX6rYgHcMM8ATRZEZdAE/ASF56xncjgvvwzoCYuYQWoAZ7jRiJyODXgYn6C6hjvoQaYxM2JSBM7h4v5RjPTKkcaWfgKSHYKhR4kVeaJN2HfAzMx+l8osiPUOuEtUqMxlINbrOLgvnJMVtqhF5cF4uZ5CwfagC1kxe6upMMYEeOuBCwcALirPE/KCaZwG7Mo2wM/rBw4pzw/gLogwSHcxswCVg4ALCrXteKXR31Cg9pOGym1xBtth4pf+h3IavshcXPCY1bbbPFLvwMZbZcSNyc8PJsyQULrSJy1Gim1nANtyrUWJLStQoEzHVlhwx4hyz3lVuyUyv0pfukPoUqxG7FfEExG6r8LIf8IrGp73EipJU5ou1L80u+AN9NPJ25OeHg27cuQfgcWtL2UuDnhcVnb+SChQSTOAoVCwHIOfFGuq0FCKeCnCnYaKLVy4LzyrCOFsj34Q2gbGNffdwwUW+G2tuPI6SwQPUie3yR+OrUYgXbcgSZbRnYPU6o4F1O5hQMPcJWRitGFDFUeOWJGxQzwLkb/PuRQ/xc51ITCCOL5EslW4w5CGvimNgxHIahHikoFpNxXzcJWLS6M55DsGAkdyPaigJT7quFELfBCda4AJ+MS9iMlFq82k45LGIA08ApX1umzIu7HjcQyUjGzRh8u5lcwNN5DB25O7CAVszYD3nbgIe7WZw6DsDkI9Uh28m5TtpCiU+gUh2wPcspRQFLlMDEmbBh0IfNhF7dYLapBN5ESYAtyNK1DVvRu4BZwD7cx8y75JoCz1TDcj27gMVIxC3sGXgceEWJ7UApWF911wEXgOhIa3kW3twBusv+iexr4SAUbs0McImH8A5bcGFl1LWQ1AAAAAElFTkSuQmCC"
              />
            </button>
          </StyledNode>
        }
      >
        {this.props.obj.children.map((res, i) => {
          return (
            <ComponentNode
              key={i}
              obj={{
                // name: res.name,
                // id_parent: res.id_parent,
                // id: res.id,
                // id_currentNode: res.id_currentNode,
                // id_nextNode: res.id_nextNode,
                // key: res.key,
                // type: res.type,
                // children: res.children,
                id: res.id,
                id_parent: res.id_parent,
                id_node: res.id_node,
                title: res.title,
                key_event: res.key_event,
                tipe: res.tipe,
                children: res.children,
              }}
              callback={(id) => {
                this.props.callback(id);
              }}
            />
          );
        })}
      </TreeNode>
    );
  }
}
export default withRouter(ComponentNode);
