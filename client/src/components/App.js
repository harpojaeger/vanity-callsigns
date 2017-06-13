import React, { Component } from 'react';
import SearchForm from './SearchForm'
import '../style/App.css';
import api from '../utils/api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.doSearch = this.doSearch.bind(this)
  }
  doSearch(s) {
    console.log('searching', s)
    api.doSearch(s)
    .then( (res) => {
      console.log('search returned', res)
      this.setState( { results: res })
    })
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
