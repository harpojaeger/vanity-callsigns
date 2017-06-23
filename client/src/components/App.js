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
      console.log('fetchCallsignInfo received', res)
      this.setState( (prevState) => {
        let newState = prevState
        res.forEach( (result) => {
          Object.keys(result).forEach( (key) => {
            if(result[key] !== '' && key !== 'callsign') {
              console.log('setting', result.callsign,key,'to',result[key])
              newState.results[result.callsign][key] = result[key]
            }
          })
        })
        newState.statusesAreLoading = false
        return newState
      })
    })
  }
  render() {
    var searchButtonText = ''
    if(this.state.callsignsAreGenerating) searchButtonText = 'Loading callsigns...'
    else if(this.state.statusesAreLoading) searchButtonText = 'Loading callsign data...'
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div className='content-wrapper'>
          <SearchForm
            doSearch={this.generateCallsigns}
            statusText={searchButtonText}
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
