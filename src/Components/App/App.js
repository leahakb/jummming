import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

/*const playlistTracks= {
  name: 'NameTracks',
  artist: 'ArtistTracks',
  album: 'AlbumTracks',
  id: 'IdTracks'
};*/

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [/*{
        name:'searchName',
        artist:'searchArtist',
        album:'searchAlbum',
        id:'searchID'
      }*/],
      playlistName: '',
      playlistTracks: []
  };

  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(playlistTracks => playlistTracks.id === track.id))
    {
      let tracks = this.state.playlistTrack;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track){
    let removeTrack = this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id);
    this.setState({playlistTracks: removeTrack});
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  savePlaylist (){
    let tracks = this.state.playlistTracks;
      if(tracks.length && this.state.playlistName) {
        let trackURIs = tracks.map(trackIndex => trackIndex.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
      }
      else {
        //.then(() => {
          this.setState({
            playlistName: 'New Playlist',
            playlistTracks: []
          });
        //});
      }
    }

  search(searchTerm){
    Spotify.search(searchTerm).then(spotifySearchResult =>{
      this.setState({
        searchResults: spotifySearchResult
      })
    })
  }

  render() {
    console.log(this.searchResults);
    console.log(this.state.playlistName);
    console.log(this.state.playlistTracks);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                          onAdd={this.addTrack}
            />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
