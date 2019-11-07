import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <TrackList tracks={this.props.searchResults}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default PlayList;
