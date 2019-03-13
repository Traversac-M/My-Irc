import React, { Component } from "react";
import Channel from "./Channel.js";
import UserList from "./UserList.js";
import io from "socket.io-client";

import "./HomepageStyle.css";

export default class Homepage extends Component {
  state = {
    user: prompt("Veuillez choisir un pseudo"),
    users: [],
    message: "",
    messages: [],
    channel: "Global"
  };

  componentDidMount() {
    this.socket = io("http://localhost:3001");

    if (this.state.user === null || this.state.user === "") {
      while (this.state.user === null || this.state.user === "") {
        alert("Veuillez indiquer un pseudo !");
        this.state.user = prompt("Veuillez choisir un pseudo");
        this.setState({ user: this.state.user });
      }
    } else {
      this.setState({ user: this.state.user });
    }

    this.socket.on("getMessage", function(msg) {
      addMessage(msg);
    });

    const addMessage = msg => {
      this.setState({ messages: [...this.state.messages, msg] });
    };

    this.sendMessage = event => {
      event.preventDefault();

      this.socket.emit("sendMessage", {
        date: new Date().getHours() + ":" + new Date().getMinutes(),
        user: this.state.user,
        message: this.state.message
      });

      this.setState({ message: "" });
    };
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  scrollToBottom() {
    var scrollHeight = this.ChatMessages.scrollHeight;
    var height = this.ChatMessages.clientHeight;
    var maxScrollTop = scrollHeight - height;
    this.ChatMessages.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const ChatMessages = this.state.messages.map(message => {
      return (
        <li id="messageList" key={message.uniqueId}>
          <span className="userStyle">{message.user}</span> à {message.date} : {message.message}
        </li>
      );
    });

    return (
      <div className="container-fluid">
        Parent Component
        <Channel channel={this.state.channel} />
        <div className="currentChannel">Connected on channel : {this.state.channel}</div>
        <div
          className="main"
          ref={ScrollDown => {
            this.ChatMessages = ScrollDown;
          }}
        >
          <ul id="messages"> {ChatMessages} </ul>
        </div>
        <form className="formMessage" method="post">
          <input
            type="text"
            placeholder="Insert your message here..."
            className="form-control"
            value={this.state.message}
            onChange={event => this.setState({ message: event.target.value })}
          />
          <button onClick={this.sendMessage} className="btn">
            Send the message
          </button>
        </form>
        Parent Component
        <UserList user={this.state.user} />
      </div>
    );
  }
}
