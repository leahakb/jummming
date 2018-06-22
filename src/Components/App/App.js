import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'
/*
const searchResults = {
  name: 'NameSearch',
  artist: 'ArtistSearch',
  album: 'AlbumSearch',
  id: 'IdSearch'
};
*/
const playlistTracks= {
  name: 'NameTracks',
  artist: 'ArtistTracks',
  album: 'AlbumTracks',
  id: 'IdTracks'
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
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
      playlistTracks.push(track);
      this.setState({playlistTracks: playlistTracks});
    }
  }

  removeTrack(track){
    const removeTrack = this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id);
    this.State({playlistTracks: removeTrack});
  }

  updatePlaylistName(name){
    this.State({
      playlistName: name
    });
  }

  savePlaylist (){
    Spotify.savePlaylist();
    this.State({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(spotifySearchResult =>{
      this.State({
        searchResults: spotifySearchResult
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                          onAdd={this.addTrack}
                          onRemove={this.removeTrack}
            />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onNameChange={this.state.updatePlaylistName}
                      onSave={this.state.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
