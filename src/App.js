import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCcs_uCq5jZZG4dUFzP3-ZioKBsL-2uTSM",
  authDomain: "bloc-chat-react-3165f.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-3165f.firebaseio.com",
  projectId: "bloc-chat-react-3165f",
  storageBucket: "bloc-chat-react-3165f.appspot.com",
  messagingSenderId: "1039284434025"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      userName: ''
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState( { activeRoom: room } );
  }

  setUser(user) {
    this.setState({ userName: user });
  }

  render() {
    return (
      <div className="App">
        <div className = "column-left">
          <header>
            <h1>Bloc Chat</h1>
          </header>
          <RoomList
            firebase = { firebase }
            activeRoom = { this.state.activeRoom }
            setActiveRoom = { this.setActiveRoom }
          />
         <User
          firebase = { firebase }
          userName = { this.state.userName }
          setUser = { this.setUser }
         />
        </div>

        <div className = "column-right">
          <MessageList
            firebase = { firebase }
            activeRoom = { this.state.activeRoom }
            setActiveRoom = { this.setActiveRoom }
          />
        </div>
      </div>
    );
  }
}

export default App;
