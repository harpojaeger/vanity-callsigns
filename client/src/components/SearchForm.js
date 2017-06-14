import React, {Component} from 'react'
import {Button, FormControl}  from 'react-bootstrap'
import '../style/SearchForm.css'
import PropTypes from 'prop-types'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      s: ''
    }
    this.searchTextChanged = this.searchTextChanged.bind(this)
    this.searchFormSubmitted = this.searchFormSubmitted.bind(this)
  }
  searchTextChanged(e) {
    this.setState({ s: e.target.value })
  }
  searchFormSubmitted(e) {
    e.preventDefault()
    this.props.doSearch(this.state.s, 0)
  }
  render() {
    return (
      <form className='searchForm'>
        <FormControl type='text' className='search' value={this.state.s} onChange={this.searchTextChanged}/>
        <Button disabled={this.props.searchIsRunning} type='submit' value='search' onClick={this.searchFormSubmitted}>{this.props.searchIsRunning ? 'Searching...' : 'Search' }</Button>
      </form>
    )
  }
}


SearchForm.propTypes = {
  doSearch: PropTypes.func.isRequired,
  searchIsRunning: PropTypes.bool.isRequired
}

export default SearchForm
