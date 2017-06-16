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
      results: {},
      callsignsAreGenerating: false,
      statusesAreLoading: false,
    }
    this.generateCallsigns = this.generateCallsigns.bind(this)
    this.fetchCallsignInfo = this.fetchCallsignInfo.bind(this)
  }
  generateCallsigns(params) {
    this.setState( {callsignsAreGenerating: true })
    generate.generate(params)
    .then( (res) => {
      this.setState({
        results: res,
        callsignsAreGenerating: false
      })
      this.fetchCallsignInfo(res)
    })
  }
  fetchCallsignInfo(results) {
    console.log('Starting API request for callsign statuses')
    this.setState( {statusesAreLoading: true })
    api.bulkSearch(Object.keys(results))
    .then( (res) => {
      this.setState( (prevState) => {
        let newState = prevState
        res.forEach( (result) => {
          newState.results[result.callsign].rollup_status_code = result.rollup_status_code
        })
        newState.statusesAreLoading = false
        return newState
      })
    })
  }
  render() {
    var searchStatusText = ''
    if(this.state.callsignsAreGenerating) searchStatusText = 'Loading callsigns...'
    else if(this.state.statusesAreLoading) searchStatusText = 'Loading callsign data...'
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div className='content-wrapper'>
          <SearchForm
            doSearch={this.generateCallsigns}
            statusText={searchStatusText}
          />
          {Object.keys(this.state.results).length > 0 &&
            <ResultsList results={this.state.results} />
          }
        </div>
      </div>
    );
  }
}

export default App;
