import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <TrackList tracks={this.props.playlistTracks} onAdd={this.props.onAdd} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default PlayList;
