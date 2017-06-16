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
      statusesAreLoading: false,
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
    this.setState( {statusesAreLoading: true })
    const callsigns = Object.keys(results)
    var i,j,temparray,chunk = 15
    for (i=0,j=callsigns.length; i<j; i+=chunk) {
      temparray = callsigns.slice(i,i+chunk);
      // console.log('chunk:', temparray)
      api.bulkSearch(temparray)
      .then( (res) => {
        // console.log('Completed API query with results', res)
        this.setState( (prevState) => {
          let newState = prevState
          res.forEach( (result) => {
            newState.results[result.callsign].rollup_status_code = result.rollup_status_code
          })
          return newState
        })
      })
    }
    this.setState({ statusesAreLoading: false })
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
