import React, { Component } from "react";

import "./HomepageStyle.css";

export default class Channel extends Component {

  render() {
    return (
        <div className="sidebarLeft">
          <h2>Channel list</h2>
          <a href="#">{this.props.channel}</a>
          <button className="btn btn-info addBtn">✚</button>
        </div>
    );
  }
}
