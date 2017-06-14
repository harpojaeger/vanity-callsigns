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
      validationErrors: []
    }
    this.checkboxChanged = this.checkboxChanged.bind(this)
    this.searchTextChanged = this.searchTextChanged.bind(this)
    this.searchFormSubmitted = this.searchFormSubmitted.bind(this)
    this.validateSearchText = this.validateSearchText.bind(this)
  }
  validateSearchText(text) {
    var validationErrors = []
    if(text.length > 6) {
      validationErrors.push('Please enter no more than six characters.')
    } else {
      // Check to make sure the text contains no more than one digit
      if (text.search(/^[^\d\n]*\d?[^\d\n]*$/))
      {
        validationErrors.push('Please enter no more than one digit.')
      } else {
        if(text.length === 6 && (!text.search(/[0-9]/) < 0) ) validationErrors.push('Please enter no more than five letters.')
      }
    }
    if(this.state.searchOnlyTheseChars && text.length <4 ) validationErrors.push('Please enter at least four characters.')
    this.setState( { validationErrors: validationErrors })
    return (validationErrors.length === 0)
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
    if (this.validateSearchText(this.state.s)) {
      this.props.doSearch({
        s: this.state.s,
        searchOnlyTheseChars: this.state.searchOnlyTheseChars,
        offset: 0,
      })
    }

  }
  render() {
    return (
      <div className='searchContentWrapper'>
        <span>
        <form className='searchForm'>
          <FormControl type='text' className='search' value={this.state.s} onChange={this.searchTextChanged} disabled={this.props.searchIsRunning}/>
          <Button disabled={this.props.searchIsRunning} type='submit' value='search' onClick={this.searchFormSubmitted}>{this.props.searchIsRunning ? 'Searching...' : 'Search' }</Button>
          <Checkbox disabled={this.props.searchIsRunning} onChange={this.checkboxChanged} checked={this.state.searchOnlyTheseChars}>Only these characters</Checkbox>
        </form>
        <div className='validationMessages'>
          <ul className='validationMessageList'>
            {this.state.validationErrors.length > 0 && this.state.validationErrors.map( (error, index) => {
              return <li key={index} className='validationMessageListItem'>{error}</li>
            })}
          </ul>
        </div>
      </span>
      </div>
    )
  }
}


SearchForm.propTypes = {
  doSearch: PropTypes.func.isRequired,
  searchIsRunning: PropTypes.bool.isRequired
}

export default SearchForm
