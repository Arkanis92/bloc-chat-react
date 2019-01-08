import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
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
  }
  render() {
    return (
      <div className="App">
        <div className = "column-left">
          <RoomList firebase = {firebase} />
        </div>
      </div>
    );
  }
}

export default App;
