import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <i
        className={this.getclassName()}
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  }
  getclassName() {
    let classes = "fa fa-heart";
    classes += this.props.Liked !== true ? "-o" : "";
    return classes;
  }
}
export default Like;
