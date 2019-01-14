import React, { Component } from 'react';
import App from './../App.js';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  handleAddMessage(newMessage) {
    this.messagesRef.push({
      content: newMessage,
      userName: this.props.userName ? this.props.userName.displayName : 'Guest',
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });
    this.setState({ newMessage: '' });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    return (
      <div className = "message-list">
        <ul className = "message">
          {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
            <li key = {index}>
              {message.content}
              {message.username}
              {message.sentAt}
              {message.roomId}
            </li>
          )}
        </ul>
        <form className = "add-message" onSubmit = { (e) => this.handleAddMessage(this.state.newMessage) }>
            <input type = "text" value = { this.state.newMessage } onChange = { (e) => this.handleChange(e) } />
            <input type = "submit" />
        </form>
      </div>
    )
  }
}

export default MessageList;
