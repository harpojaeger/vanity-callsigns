import React, { Component } from 'react';
import SearchForm from './SearchForm'
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }
  doSearch(s) {
    console.log('searching', s)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <SearchForm doSearch={this.doSearch}/>
      </div>
    );
  }
}

export default App;
