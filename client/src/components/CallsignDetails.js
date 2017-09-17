import React, { Component } from 'react'
import {Button, FormControl, FormGroup }  from 'react-bootstrap'
import api from '../utils/api'
import '../style/CallsignDetails.css'

class CallsignDetails extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = { query: props.match.params.callsign }
    this.callsignLookup = this.callsignLookup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.runSearch = this.runSearch.bind(this)
  }
  runSearch(e) {
    e.preventDefault()
    const callsignRegex = /^(?=.{4,6}$)^((?:A[A-K])|(?:[WKN][A-Z]?))[0-9][A-Z]{1,3}$/i
    console.log('is',this.state.query,'a valid callsign:',callsignRegex.test(this.state.query))
    this.callsignLookup(this.state.query)
  }
  callsignLookup(callsign) {
    api.bulkSearch([callsign.toUpperCase()])
    .then( (res) => {
      console.log('callsignLookup received', res)
      this.setState( { res: res })
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
