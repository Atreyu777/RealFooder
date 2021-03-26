import { Component } from 'react';
import React from 'react'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  captureSearchTerm(inputText) {
    console.log(inputText);
    this.setState({ searchTerm: inputText }, () => {
      this.props.filterFood(this.state);
    });
  }

  render() {
    return (
        
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Busca un producto"
          onChange={(e) => this.captureSearchTerm(e.target.value)}
        ></input>
      </div>     
    )}
}
export default Search;