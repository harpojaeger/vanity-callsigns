import React, {Component} from 'react'
import {Button, FormControl}  from 'react-bootstrap'

class SearchForm extends Component {
  render() {
    return (
      <div class='searchForm'>
        <FormControl type='text' className='search' />
        <Button type='submit' value='search'>Search</Button>
      </div>
    )
  }
}

export default SearchForm
