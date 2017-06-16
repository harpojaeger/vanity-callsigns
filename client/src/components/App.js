import React, { Component } from 'react';
import SearchForm from './SearchForm'
import ResultsList from './ResultsList'
import '../style/App.css';
import generate from '../utils/generate'
import api from '../utils/api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: {}
    }
    this.generateCallsigns = this.generateCallsigns.bind(this)
    this.fetchCallsignInfo = this.fetchCallsignInfo.bind(this)
  }
  generateCallsigns(params) {
    generate.generate(params)
    .then( (res) => {
      this.setState({results: res})
      this.fetchCallsignInfo(res)
    })
  }
  fetchCallsignInfo(results) {
    console.log('Starting API request for callsign statuses')
    api.bulkSearch(Object.keys(results))
    .then( (res) => {
      console.log('Completed API query with results', res)
      this.setState( (prevState) => {
        let newState = prevState
        res.forEach( (result) => {
          newState.results[result.callsign].rollup_status_code = result.rollup_status_code
        })
        return newState
      })
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div className='content-wrapper'>
          <SearchForm doSearch={this.generateCallsigns}/>
          {Object.keys(this.state.results).length > 0 &&
            <ResultsList results={this.state.results} />
          }
        </div>
      </div>
    );
  }
}

export default App;
