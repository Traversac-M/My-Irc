import React, { Component } from "react";

import "./HomepageStyle.css";

export default class UserList extends Component {
  render() {
    return (
      <div className="sidebarRight">
        <h2>Users list</h2>
        <a href="#">{this.props.user}</a>
      </div>
    );
  }
}
