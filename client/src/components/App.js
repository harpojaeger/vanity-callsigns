import React, { Component } from 'react';
import SearchForm from './SearchForm'
import ResultsList from './ResultsList'
// import LoadMoreButton from './LoadMoreButton'
import '../style/App.css';
// import api from '../utils/api'
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
    // this.doSearch = this.doSearch.bind(this)
    // this.loadMore = this.loadMore.bind(this)
    // this.doInitialSearch = this.doInitialSearch.bind(this)
    // this.addReturnedResultsToState = this.addReturnedResultsToState.bind(this)
    this.generateCallsigns = this.generateCallsigns.bind(this)
  }
  // doInitialSearch(params) {
  //   this.setState({
  //     searchIsRunning: true,
  //     results: [],
  //     showLoadMoreButton: false,
  //     textSearched: params.s,
  //   })
  //   this.doSearch(params)
  // }
  // doSearch(params) {
  //   console.log('search function invoked with params',params)
  //   api.doSearch(params)
  //   .then( (res) => {
  //     // console.log('search returned', res)
  //     this.addReturnedResultsToState(res)
  //     this.setState({
  //       offset: params.offset,
  //       searchIsRunning: false,
  //     })
  //   })
  // }
  generateCallsigns(params) {
    generate.generate(params)
    .then( res => this.setState({results: res}))
  }
  // addReturnedResultsToState(res) {
  //   this.setState( (prevState) => {
  //     let newResults = prevState.results.concat(res)
  //     return {
  //       results: newResults,
  //       moreResultsAreLoading: false,
  //       showLoadMoreButton: (res.length === prevState.resultsPerPage)
  //     }
  //   })
  // }
  // loadMore() {
  //   this.setState( (prevState, props) => {
  //     return {
  //       offset: prevState.offset + this.state.resultsPerPage,
  //       moreResultsAreLoading: true
  //     }
  //   },
  //   function() {
  //     console.log('searching', this.state.textSearched, 'with offset', this.state.offset)
  //     api.doSearch({
  //       s: this.state.textSearched,
  //       offset: this.state.offset
  //     })
  //     .then( (res) => {
  //       this.addReturnedResultsToState(res)
  //     })
  //   }.bind(this)
  // )}
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
          {/* {this.state.showLoadMoreButton &&
            <LoadMoreButton moreResultsAreLoading={this.state.moreResultsAreLoading} amount={this.state.resultsPerPage} loadMoreFunction={this.loadMore} />
          } */}
        </div>
      </div>
    );
  }
}

export default App;
