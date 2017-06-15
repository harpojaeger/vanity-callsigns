import React, {Component} from 'react'
import {FormControl, FormGroup }  from 'react-bootstrap'
import '../style/SearchForm.css'
import PropTypes from 'prop-types'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.searchTextChanged = this.searchTextChanged.bind(this)
    this.searchFormChanged = this.searchFormChanged.bind(this)
    this.searchFilterChanged = this.searchFilterChanged.bind(this)
    this.multiSelectChanged = this.multiSelectChanged.bind(this)
  }
  searchTextChanged(e) {
    const s = e.target.value
    this.setState({ s: s} )
  }
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
  searchFormChanged(e) {
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
        <form className='searchForm' onChange={this.searchFormChanged}>
          <FormGroup className='letters'>
            <h4>Prefix</h4>
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
            <h4>Region</h4>
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
          <FormGroup>
            <h4>Search text</h4>
            <FormControl type='text' className='search' value={this.state.s} onChange={this.searchTextChanged} disabled={this.props.searchIsRunning}/>
          </FormGroup>
        </form>
      </div>
    )
  }
}

SearchForm.propTypes = {
  doSearch: PropTypes.func.isRequired,
}

export default SearchForm
