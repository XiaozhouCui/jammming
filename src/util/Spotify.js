const clientId = '762fe719c0a74def94a67dbe69b3cdfe';
const redirectUri = 'http://localhost:3000/';
const endPoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

let accessToken = '';

let Spotify = {
  getAccessToken() {
    if(accessToken) { //If access token is already set, return the access token.
      return accessToken;
    } else if (window.location.href.indexOf('access_token') >= 0 ) { //Check if the access token is already acquired from api and displayed in the URL field.
      accessToken = window.location.href.match(/access_token=([^&]*)/)[0].split('=')[1]; //Use regex to grab the access token's value
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split('=')[1]; //Use regex to grab the expiry time
      window.setTimeout(() => accessToken = '', expiresIn * 1000); //Set the access token to expire at the value for expiration time
      window.history.pushState('Access Token', null, '/'); //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
    } else {
      window.location = endPoint; //If the access token is not in the URL, need to call the Spotify api and get access token.
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
      } else {
        return [];
      }
    });
  },

  savePlaylist(playlistName, uriList) {
    if (playlistName && uriList) {
      return
    } else {
      let defaultAccessToken = accessToken;
      let defaultHeader = {
        Authorization: `Bearer ${defaultAccessToken}`
      }
      let defaultUserId = '';
      return fetch('https://api.spotify.com/v1/me', {headers: defaultHeader})
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Get user ID request failed!');
      }, networkError => {
        console.log(networkError.message);
      })
      .then(jsonResponse => {
        defaultUserId = jsonResponse.id;
        console.log(defaultUserId);
        return fetch(`/v1/users/${defaultUserId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${defaultAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: playlistName})
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('create playlist POST request failed!');
      }, networkError => {
        console.log(networkError.message);
      })
      .then(jsonResponse => {
        let playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${defaultAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({uris: uriList})
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Save tracks POST request failed!');
      }, networkError => {
        console.log(networkError.message);
      })
      .then(jsonResponse => {
        return jsonResponse;
      })
    }
  }
}

export default Spotify;