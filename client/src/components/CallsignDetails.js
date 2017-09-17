import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button, FormControl, FormGroup }  from 'react-bootstrap'
import api from '../utils/api'
import '../style/CallsignDetails.css'

const callsignAttributeDictionary = {
  callsign: 'Callsign',
  license_status: 'License status',
  effective_date: 'Effective date',
  cancellation_date: 'Cancellation date',
  expired_date: 'Expiration date',
  certifier_first_name: 'Licenseholder first name',
  certifier_mi: 'Licenseholder middle initial',
  certifier_last_name: 'Licenseholder last name',
  certifier_suffix: 'Licenseholder suffix',
  grant_date: 'Grant date',
}

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
    const isValidCallsign = callsignRegex.test(this.state.query)
    console.log('is',this.state.query,'a valid callsign:', isValidCallsign)
    if(isValidCallsign) this.callsignLookup(this.state.query)
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
        {this.state.hasOwnProperty('res') &&
          <ul>
            {
              Object.entries(this.state.res[0]).map( ([key, value]) => {
                return <CallsignAttribute key={key} shortname={key} fullname={callsignAttributeDictionary[key]} value={value} />
              })
            }
          </ul>
        }
      </div>
    )
  }
}

function CallsignAttribute(props) {
  return <li key={props.shortname}>{props.fullname}: {props.value}</li>
}

CallsignAttribute.propTypes = {
  shortname: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default CallsignDetails
