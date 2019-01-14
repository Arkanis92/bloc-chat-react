import React, { Component } from 'react';
import App from './../App.js';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      signOn: false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result)=> {
      const user = result.user
      this.props.setUser(user);
    });
  }

  handleSignOut() {
    this.props.firebase.auth().signOut().then( () => {
      this.props.setUser(null);
    });
  }

  render() {
    return(
      <div className = "sign-buttons">
        <div className = "username">
          { this.props.userName ? this.props.userName.displayName : '' }
        </div>
        <button className = "sign-in-button" onClick = { () => this.handleSignIn() }>
          Sign In
        </button>
        <button className = "sign-out-button" onClick = { () => this.handleSignOut() }>
          Sign Out
        </button>
      </div>
    )
  }
}

export default User;
