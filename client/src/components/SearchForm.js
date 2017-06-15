import React, {Component} from 'react'
import {Button, FormControl, FormGroup, Checkbox}  from 'react-bootstrap'
import '../style/SearchForm.css'
import PropTypes from 'prop-types'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // searchOnlyTheseChars: false,
      // validationErrors: [],
      search: {
        s: '',
        letters: {
          'A': true,
          'K': true,
          'N': true,
          'W': true,
        },
        regions: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
          7: true,
          8: true,
          9: true
        }
      }
    }
    // this.checkboxChanged = this.checkboxChanged.bind(this)
    this.searchTextChanged = this.searchTextChanged.bind(this)
    this.searchFormSubmitted = this.searchFormSubmitted.bind(this)
    // this.validateSearchText = this.validateSearchText.bind(this)
    this.searchFilterChanged = this.searchFilterChanged.bind(this)
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
    this.setState( (prevState) => {
      var newState = prevState
      newState.search.s = s
      return newState
    })
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
        newState.search[which][name] = !newState.search[which][name]
        return newState
      })
    }.bind(this)
    return updateState
  }
  searchFormSubmitted(e) {
    e.preventDefault()
    const search_letters = this.state.search.s.toUpperCase().split('')
    var search_regions = []
    var first_letters = []
    for (var letter in this.state.search.letters) {
      if(this.state.search.letters[letter]) first_letters.push(letter)
    }
    for (var region in this.state.search.regions) {
      if(this.state.search.regions[region]) search_regions.push(region)
    }
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
        <span>
        <form className='searchForm'>
          <FormGroup>
            {
              ['A','K','N','W'].map( (letter) => {
                return <Checkbox inline
                  key={'letter-'+letter}
                  checked={this.state.search.letters[letter]}
                  onChange={this.searchFilterChanged('letters')}
                  name={letter}>{letter}</Checkbox>
              })
            }
          </FormGroup>
          <FormGroup>
            {
              [...Array(10)].map( (el, region) => {
                return <Checkbox inline
                  key={'region-'+region}
                  checked={this.state.search.regions[region]}
                  onChange={this.searchFilterChanged('regions')}
                  name={region}>{region}</Checkbox>
              })
            }
          </FormGroup>
          <FormControl type='text' className='search' value={this.state.search.s} onChange={this.searchTextChanged} disabled={this.props.searchIsRunning}/>
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
