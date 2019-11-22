import React from 'react';
import './App.css';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);

    this.removeTrack = this.removeTrack.bind(this);

    this.updatePlaylistName = this.updatePlaylistName.bind(this);

    this.savePlaylist = this.savePlaylist.bind(this);

    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let newPlaylist = this.state.playlistTracks;
    if (newPlaylist.map(savedTrack => savedTrack.id).includes(track.id)) {
      console.log('This track already exists in your playlist.');
    } else {
      try {
        newPlaylist.push(track);
        this.setState({playlistTracks: newPlaylist});
      } catch (err) {
        console.log(err);
      }
    }
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks;
    for (let i = 0; i < newPlaylist.length; i++) {
      if (newPlaylist[i].id === track.id) {
        try {
          newPlaylist.splice(i, 1);
          this.setState({playlistTracks: newPlaylist});
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => `spotify:track:${track.id}`);
    let playlistNameToSave = this.state.playlistName;
    Spotify.savePlaylist(playlistNameToSave, trackURIs);
    this.setState({ playlistName: 'New Playlist', playlistTracks: [] })
  }

  search(term) {
    Spotify.getAccessToken();
    Spotify.search(term).then(newResults => {
      this.setState({searchResults: newResults})
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
