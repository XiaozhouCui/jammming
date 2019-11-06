import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  constructor(props) {
    super(props)

    this.state = {
         
    }
  }

  render() {
    return (
      <div className="TrackList">
        <Track />
        <Track />
        <Track />
      </div>
    )
  }
}

export default TrackList;
