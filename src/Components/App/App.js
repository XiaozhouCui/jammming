import React from 'react';
import './App.css';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Track 1',
          artist: 'John',
          album: 'uiop',
          id: 1
        },
        {
          name: 'Track 2',
          artist: 'Will',
          album: 'hjkl',
          id: 2
        },
        {
          name: 'Track 3',
          artist: 'Ben',
          album: 'vbnm',
          id: 3
        }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          name: 'Track 4',
          artist: 'Mary',
          album: 'dghc',
          id: 4
        },
        {
          name: 'Track 5',
          artist: 'Vicki',
          album: 'rtcviu',
          id: 5
        },
        {
          name: 'Track 6',
          artist: 'LeBron',
          album: 'fyer',
          id: 6
        }
      ]
    }

    this.addTrack = this.addTrack.bind(this);

    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let newPlaylist = this.state.playlistTracks;
    if (newPlaylist.map(savedTrack => savedTrack.id).includes(track.id)) {
      console.log('This track already exists in your playlist.');
    } else {
      try {
        newPlaylist.push(track);
      } catch (err) {
        console.log(err);
      }
      this.setState({playlistTracks: newPlaylist});
    }
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks;
    for (let i = 0; i < newPlaylist.length; i++) {
      if (newPlaylist[i].id === track.id) {
        try {
          newPlaylist.splice(i, 1);
        } catch (err) {
          console.log(err);
        }
      }
    }
    this.setState({playlistTracks: newPlaylist});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onAdd={this.addTrack} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
