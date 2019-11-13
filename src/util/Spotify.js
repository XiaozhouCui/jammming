const clientId = '762fe719c0a74def94a67dbe69b3cdfe';
const redirectUri = 'http://localhost:3000/';
const endPoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

let accessToken = '';

let Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    } else if (window.location.href.indexOf('access_token') >= 0 ) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[0].split('=')[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split('=')[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000); //Set the access token to expire at the value for expiration time
      window.history.pushState('Access Token', null, '/'); //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
    } else {
      window.location = endPoint;
    }
  },
}

export default Spotify;