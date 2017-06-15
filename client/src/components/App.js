import React, { Component } from 'react';
import SearchForm from './SearchForm'
import ResultsList from './ResultsList'
import '../style/App.css';
import generate from '../utils/generate'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      resultsPerPage: 50,
      moreResultsAreLoading: false,
      searchIsRunning: false,
      showLoadMoreButton: false,
      results: []
    }
    this.generateCallsigns = this.generateCallsigns.bind(this)
  }
  generateCallsigns(params) {
    generate.generate(params)
    .then( res => this.setState({results: res}))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div className='content-wrapper'>
          <SearchForm searchIsRunning={this.state.searchIsRunning} doSearch={this.generateCallsigns}/>
          {this.state.results.length > 0 &&
            <ResultsList textSearched={this.state.textSearched} results={this.state.results} />
          }
        </div>
      </div>
    );
  }
}

export default App;
