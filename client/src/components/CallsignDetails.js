import React, { Component } from 'react'
import {Button, FormControl, FormGroup }  from 'react-bootstrap'
import api from '../utils/api'
import '../style/CallsignDetails.css'

class CallsignDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { query: '' }
    this.callsignLookup = this.callsignLookup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.runSearch = this.runSearch.bind(this)
  }
  runSearch(e) {
    e.preventDefault()
    this.callsignLookup(this.state.query)
  }
  callsignLookup(callsign) {
    api.bulkSearch([callsign.toUpperCase()])
    .then( (res) => {
      console.log('callsignLookup received', res)
    })
  }
  handleChange(e){
    this.setState({ query: e.target.value })
  }
  render(){
    return(
      <div className='detailedCallsignInfoWrapper'>
        <form className='callsignLookupForm'>
          <FormGroup className='detailSearchForm'>
            <h4>Callsign:</h4>
            <FormControl type='text' className='detailedCallsignInfoInput'
              value={this.state.query} onChange={this.handleChange}
            />
            <Button type='submit' value='search' onClick={this.runSearch}>Lookup</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

function CallsignAttribute(props) {

}

export default CallsignDetails
