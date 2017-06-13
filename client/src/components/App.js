import React, { Component } from 'react';
import SearchForm from './SearchForm'
import '../style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <SearchForm />
      </div>
    );
  }
}

export default App;
