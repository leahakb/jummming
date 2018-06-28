import React from 'react';

import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

//component that doesn't refer to this.state and only has a render() function.
//however if eventually considered component then need to have a
//class SearchResults extends React.Component{render(){
//and instead of propts.name used this.props.name}}
function SearchResults (props){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={props.searchResults}
          onAdd={props.onAdd} />
      </div>
    );
}

export default SearchResults;
