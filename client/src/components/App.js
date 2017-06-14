import React, { Component } from 'react';
import SearchForm from './SearchForm'
import ResultsList from './ResultsList'
import LoadMoreButton from './LoadMoreButton'
import '../style/App.css';
import api from '../utils/api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      amount: 50,
      resultsAreLoading: false
    }
    this.doSearch = this.doSearch.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }
  doSearch(s, offset) {
    console.log('searching', s, 'with offset', offset)
    api.doSearch(s, offset)
    .then( (res) => {
      // console.log('search returned', res)
      this.setState({
        results: res,
        callsignSearched: s,
        offset: offset,
      })
    })
  }
  loadMore() {
    this.setState( (prevState, props) => {
      return {
        offset: prevState.offset + this.state.amount,
        resultsAreLoading: true
      }
    },
    function() {
      console.log('searching', this.state.callsignSearched, 'with offset', this.state.offset)
      api.doSearch(this.state.callsignSearched, this.state.offset)
      .then( (res) => {
        this.setState( (prevState) => {
          let newResults = prevState.results.concat(res)
          return {
            results: newResults,
            resultsAreLoading: false
          }
        })
      })
    }.bind(this)
  )}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div className='content-wrapper'>
          <SearchForm doSearch={this.doSearch}/>
          {this.state.results &&
            <ResultsList callsignSearched={this.state.callsignSearched} results={this.state.results} />
          }
          {this.state.results &&
            <LoadMoreButton resultsAreLoading={this.state.resultsAreLoading} amount={this.state.amount} loadMoreFunction={this.loadMore} />
          }
        </div>
      </div>
    );
  }
}

export default App;
