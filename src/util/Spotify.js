import 'whatwg-fetch';
const clientId = "e35f357dac434ff2839e25135d3d5808";
const urlRedirect = "http://localhost:3000/";
let accessToken = "";
const spotifyUrl = "https://accounts.spotify.com/authorize";
const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }

      const isAccessToken = window.location.href.match(/access_token=([^&]*)/);
      const isExpiresIn =  window.location.href.match(/expires_in=([^&]*)/);

    if(isAccessToken && isExpiresIn){
      accessToken = isAccessToken;
      const expiresIn = isExpiresIn;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    else{
      window.location =
      `${spotifyUrl}?client_id=${clientId}&redirect_url=${urlRedirect}`;
    }
  },
  search(searchTerm){
    return fetch('https://api.spotify.com/v1/search?type=track&q={searchTerm}',{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response=>{
      return response.json();
    }).then(jsonResponse=>{
      return jsonResponse.tracks.map(track=>({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        url: track.url
      }));
    })
  },

  savePlaylist(playlistName, urlTrack){
    if (playlistName && urlTrack.length){
      let accessToken=this.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      }
      return fetch('https://api.spotify.com/v1/me',{
        headers: headers
      }).then(response=>{
        return response.json();
      }).then(jsonResponse=>{
          const userId = jsonResponse.id;
          console.log(userId);
          return fetch(`https://api.spotify.com/v1/users/{user_id}/playlists`,{
            method: 'POST',
            hearders: headers,
            body: JSON.stringify({name: playlistName})
          }).then(response=>{
              return response.json();
          }).then(jsonResponse=>{
            let playlistId= jsonResponse.id;
            console.log(playlistId)
            return fetch('https://api.spotify.com/v1/users//v1/users/{user_id}/playlists/{playlist_id}/tracks',{
              method: 'POST',
              hearders: headers,
              body:JSON.stringify({urlTrack: urlTrack})
            });
          });
      });
    }
    else{
      return;
    }
  }
};

export default Spotify;
