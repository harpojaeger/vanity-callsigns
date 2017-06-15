import React, {Component} from 'react'
import {Button, FormControl,FormGroup }  from 'react-bootstrap'
import '../style/SearchForm.css'
import PropTypes from 'prop-types'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // searchOnlyTheseChars: false,
      // validationErrors: [],
      s: '',
      letters: {
        A: false,
        K: false,
        N: false,
        W: false
      },
      regions: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
      }
    }
    // this.checkboxChanged = this.checkboxChanged.bind(this)
    this.searchTextChanged = this.searchTextChanged.bind(this)
    this.searchFormSubmitted = this.searchFormSubmitted.bind(this)
    // this.validateSearchText = this.validateSearchText.bind(this)
    this.searchFilterChanged = this.searchFilterChanged.bind(this)
    this.multiSelectChanged = this.multiSelectChanged.bind(this)
  }
  // validateSearchText(text) {
  //   var validationErrors = []
  //   if(text.length > 6) {
  //     validationErrors.push('Please enter no more than six characters.')
  //   } else {
  //     // Check to make sure the text contains no more than one digit
  //     if (text.search(/^[^\d\n]*\d?[^\d\n]*$/))
  //     {
  //       validationErrors.push('Please enter no more than one digit.')
  //     } else {
  //       if(text.length === 6 && (!text.search(/[0-9]/) < 0) ) validationErrors.push('Please enter no more than five letters.')
  //     }
  //   }
  //   if(this.state.searchOnlyTheseChars && text.length <4 ) validationErrors.push('Please enter at least four characters.')
  //   this.setState( { validationErrors: validationErrors })
  //   return (validationErrors.length === 0)
  // }
  searchTextChanged(e) {
    const s = e.target.value
    this.setState({ s: s} )
  }
  // checkboxChanged(e) {
  //   this.setState( (prevState) => {
  //     return {searchOnlyTheseChars: !prevState.searchOnlyTheseChars}
  //   })
  // }
  // searchFormSubmitted(e) {
  //   e.preventDefault()
  //   if (this.validateSearchText(this.state.s)) {
  //     this.props.doSearch({
  //       s: this.state.s,
  //       searchOnlyTheseChars: this.state.searchOnlyTheseChars,
  //       offset: 0,
  //     })
  //   }
  // }
  searchFilterChanged(which) {
    const updateState = function(e) {
      const name = e.target.name
      this.setState( (prevState) => {
        var newState = prevState
        newState[which][name] = !newState[which][name]
        return newState
      })
    }.bind(this)
    return updateState
  }
  multiSelectChanged(e) {
    const name = e.target.name
    const values = [...e.target.options].reduce((obj, cur, i) => { return { ...obj, [cur.value]: cur.selected }; }, {})
    this.setState( (prevState) => {
      let newState = prevState
      newState[name] = values
      return newState
    })
  }
  searchFormSubmitted(e) {
    e.preventDefault()
    const search_letters = this.state.s.toUpperCase().split('')
    const first_letters = Object.keys(this.state.letters).filter( l => { return this.state.letters[l] })
    const search_regions = Object.keys(this.state.regions).filter(r => { return this.state.regions[r] })

    console.log(search_regions)
    this.props.doSearch({
      search_letters: search_letters,
      search_regions: search_regions,
      first_letters: first_letters
    })
  }
  render() {
    return (
      <div className='searchContentWrapper'>
        <form className='searchForm'>
          <FormGroup className='letters'>
            <FormControl
              componentClass="select"
              multiple
              name='letters'
              onChange={this.multiSelectChanged}>
              {['A','K','N','W'].map( (l) => {
                return <option key={l} value={l}>{l}</option>
              })}
            </FormControl>
          </FormGroup>
          <FormGroup className='regions'>
            <FormControl
              componentClass="select"
              multiple
              name='regions'
              onChange={this.multiSelectChanged}>
                {[...Array(10).keys()].map( (l) => {
                  return <option key={l} value={l}>{l}</option>
                })}
              </FormControl>
            </FormGroup>
          <FormControl type='text' className='search' value={this.state.s} onChange={this.searchTextChanged} disabled={this.props.searchIsRunning}/>
          <Button disabled={this.props.searchIsRunning} type='submit' value='search' onClick={this.searchFormSubmitted}>{this.props.searchIsRunning ? 'Searching...' : 'Search' }</Button>
          {/* <Checkbox disabled={this.props.searchIsRunning} onChange={this.checkboxChanged} checked={this.state.searchOnlyTheseChars}>Only these characters</Checkbox> */}
        </form>
        {/* <div className='validationMessages'>
          <ul className='validationMessageList'>
            {this.state.validationErrors.length > 0 && this.state.validationErrors.map( (error, index) => {
              return <li key={index} className='validationMessageListItem'>{error}</li>
            })}
          </ul>
        </div> */}
      </div>
    )
  }
}


SearchForm.propTypes = {
  doSearch: PropTypes.func.isRequired,
  searchIsRunning: PropTypes.bool.isRequired
}

export default SearchForm
