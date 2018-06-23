import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.stata = {
      searchTerm:''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.props.searchTerm);
  }

  handleTermChange(event){
    this.State({
      searchTerm: event.target.value
    });
  }

  render(){
    return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={this.handleTermChange} />
      <a>SEARCH</a>
    </div>
  );
  }
}

export default SearchBar;
