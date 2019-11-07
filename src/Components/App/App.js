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
          name: 'asdf',
          artist: 'John',
          album: 'uiop',
          id: 1
        },
        {
          name: 'qwer',
          artist: 'Will',
          album: 'hjkl',
          id: 2
        },
        {
          name: 'zxcv',
          artist: 'Ben',
          album: 'vbnm',
          id: 3
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <PlayList searchResults={this.state.searchResults}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
