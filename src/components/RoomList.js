import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom:''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(e) {
    this.roomsRef.push({
      name: this.state.newRoom
    });
    this.setState({newRoom:''});
  }

  handleChange(e) {
    this.setState({ newRoom: e.target.value })
  }

  render() {
    return (
      <div className = "room-list">
        <table>
          <tbody>
            {this.state.rooms.map( (room) =>
              <tr key = {room.key}>{room.name}</tr>
            )}
          </tbody>
        </table>
        <form onSubmit = { (e) => this.createRoom(e) }>
          <input type = "text" value = {this.newRoom} onChange = {(e) => this.handleChange(e)}/>
          <input type = "submit" />
        </form>
      </div>
    )
  }
}

export default RoomList;
