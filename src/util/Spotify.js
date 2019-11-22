const clientId = '762fe719c0a74def94a67dbe69b3cdfe';
const redirectUri = 'http://localhost:3000/';
const endPoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

let accessToken;

let Spotify = {
  getAccessToken() {
    if(accessToken) { //If access token is already set, return the access token.
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);//Use regex to grab the access token's value
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);//Use regex to grab the expiry time
    if (accessTokenMatch && expiresInMatch) { //Check if the access token is already acquired from api and displayed in the URL field.
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000); //Set the access token to expire at the value for expiration time
      window.history.pushState('Access Token', null, '/'); //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
      return accessToken;
    } else {
      window.location = endPoint; //If the access token is not in the URL, need to call the Spotify api and get access token.
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
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
    if (!playlistName || !uriList.length) {
      return;
    }

    let accessToken = Spotify.getAccessToken();
    let defaultHeader = { Authorization: `Bearer ${accessToken}` }
    let defaultUserId;

    try {
      return fetch('https://api.spotify.com/v1/me', {headers: defaultHeader})
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Get user ID request failed!');
      })
      .then(jsonResponse => {
        defaultUserId = jsonResponse.id;
        console.log('User ID: ' + defaultUserId);
        return fetch(`https://api.spotify.com/v1/users/${defaultUserId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: playlistName})
        })
      })
      .then(response => {
        if (response.ok) {
          console.log(`Playlist ${playlistName} is created!`)
          return response.json();
        }
        throw new Error('Create playlist POST request failed!');
      })
      .then(jsonResponse => {
        let playlistID = jsonResponse.id;
        console.log(`Your new playlist ID: ${playlistID}`);
        return fetch(`https://api.spotify.com/v1/users/${defaultUserId}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({uris: uriList})
        })
      })
      .then(response => {
        if (response.ok) {
          for (let i = 0; i < uriList.length; i++) {
            console.log(`${uriList[i]} is saved to your playlist '${playlistName}'!`);
          }
          return response.json();
        } else {
          console.log(JSON.stringify({uris: uriList}));
        }
      })
      .then(jsonResponse => {
        return jsonResponse;
      })
    } catch (err) {
      console.log(err);
    }
  }
}

export default Spotify;