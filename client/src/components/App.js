import React, { Component } from 'react';
import SearchForm from './SearchForm'
import ResultsList from './ResultsList'
import '../style/App.css';
import generate from '../utils/generate'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
    this.generateCallsigns = this.generateCallsigns.bind(this)
  }
  generateCallsigns(params) {
    generate.generate(params)
    .then( res => this.setState({results: res}))
  }
  fetchCallsignInfo(results) {

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div className='content-wrapper'>
          <SearchForm doSearch={this.generateCallsigns}/>
          {this.state.results.length > 0 &&
            <ResultsList results={this.state.results} />
          }
        </div>
      </div>
    );
  }
}

export default App;
