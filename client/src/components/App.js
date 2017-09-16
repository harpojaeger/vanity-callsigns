import React, { Component } from 'react';
import SearchForm from './SearchForm'
import VisibilityFilterControls from './VisibilityFilterControls.js'
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
    this.updateFilterValues = this.updateFilterValues.bind(this)
    this.generateCallsigns = this.generateCallsigns.bind(this)
    this.fetchCallsignInfo = this.fetchCallsignInfo.bind(this)
  }

  updateFilterValues(values) {
    console.log('App received filter values', values)
    this.setState({
      callsignVisibilityFilter: values
    })
  }

  generateCallsigns(params) {
    this.setState( {callsignsAreGenerating: true })
    generate.generate(params)
    .then( (res) => {
      this.setState({
        results: res,
        callsignsAreGenerating: false,
        // Reset the callsign visibility filter
        callsignVisibilityFilter: {
          available: true,
          graceperiod: true,
          unavailable: true
        }
      })
      this.fetchCallsignInfo(res)
    })
  }
  fetchCallsignInfo(results) {
    // console.log('Starting API request for callsign statuses')
    this.setState( {statusesAreLoading: true })
    api.bulkSearch(Object.keys(results))
    .then( (res) => {
      // console.log('fetchCallsignInfo received', res)
      this.setState( (prevState) => {
        let newState = prevState
        res.forEach( (result) => {
          Object.keys(result).forEach( (key) => {
            if(result[key] !== '' && key !== 'callsign') {
              // console.log('setting', result.callsign,key,'to',result[key])
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
            <div>
              <div className='visibilityFilterControlWrapper'>
                <VisibilityFilterControls filterValues={this.state.callsignVisibilityFilter} updateFilterValues={this.updateFilterValues} />
              </div>
              <ResultsList results={this.state.results} callsignVisibilityFilter={this.state.callsignVisibilityFilter} updateFilterValues={this.updateFilterValues}/>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
