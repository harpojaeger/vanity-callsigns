import React, {Component} from 'react'
import {Button, FormControl, Checkbox}  from 'react-bootstrap'
import '../style/SearchForm.css'
import PropTypes from 'prop-types'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      s: '',
      searchOnlyTheseChars: false,
    }
    this.checkboxChanged = this.checkboxChanged.bind(this)
    this.searchTextChanged = this.searchTextChanged.bind(this)
    this.searchFormSubmitted = this.searchFormSubmitted.bind(this)
  }
  searchTextChanged(e) {
    this.setState({ s: e.target.value })
  }
  checkboxChanged(e) {
    this.setState( (prevState) => {
      return {searchOnlyTheseChars: !prevState.searchOnlyTheseChars}
    })
  }
  searchFormSubmitted(e) {
    e.preventDefault()
    this.props.doSearch({
      s: this.state.s,
      searchOnlyTheseChars: this.state.searchOnlyTheseChars,
      offset: 0,
    })
  }
  render() {
    return (
      <form className='searchForm'>
        <FormControl type='text' className='search' value={this.state.s} onChange={this.searchTextChanged} disabled={this.props.searchIsRunning}/>
        <Button disabled={this.props.searchIsRunning} type='submit' value='search' onClick={this.searchFormSubmitted}>{this.props.searchIsRunning ? 'Searching...' : 'Search' }</Button>
        <Checkbox disabled={this.props.searchIsRunning} onChange={this.checkboxChanged} checked={this.state.searchOnlyTheseChars}>Only these characters</Checkbox>
      </form>
    )
  }
}


SearchForm.propTypes = {
  doSearch: PropTypes.func.isRequired,
  searchIsRunning: PropTypes.bool.isRequired
}

export default SearchForm
