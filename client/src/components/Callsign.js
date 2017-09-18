import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../style/Callsign.css'
import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function Callsign(props) {
  // By default, mark callsigns as 'available'. This will be replaced by 'unavailable' or 'graceperiod' if necessary.
  var availability = 'available'
  var statusText = null
  var tooltip = null
  var tooltipText = ''
  // inactiveDate will store the date the license either expired or was cancelled, depending on the license status.
  // NOTE: consider revising this to use effective_date, which is FCC-supplied and may be more accurate.
  var inactiveDate = null
  if(props.license_status ==='E') {
    statusText = 'Expired'
    inactiveDate = props.expired_date
  } else if(props.license_status === 'C') {
    statusText = 'Cancelled'
    inactiveDate = props.cancellation_date
  }
  if(props.license_status === 'A') availability = 'unavailable'
  if(inactiveDate) {
    console.log(props.callsign, statusText, inactiveDate)
    //Parse the date into moment so we can do math with it and reformat it
    inactiveDate = moment(inactiveDate, 'MM/DD/YYYY', true)
    // If the license expired/was cancelled less than two years & one day ago, it's not available for registration.
    if(moment().subtract(2, 'years').subtract(1, 'days') <= inactiveDate) {
      console.log("that's less than two years ago")
      const availableDate = moment(inactiveDate).add(2, 'years').add(1, 'days').format('MM MMM YYYY')
      tooltipText = [statusText, moment(inactiveDate).format('MM MMM YYYY'),'\r\nAvailable',availableDate].join(' ')
      console.log('tooltip for', props.callsign, 'will be', tooltipText)
      tooltip = <Tooltip style={{'whiteSpace': 'pre-wrap'}} id={props.callsign}>{tooltipText}</Tooltip>
      availability = 'graceperiod'
    }
  }

  // If this callsign's status is excluded from callsignVisibilityFilter, add a class to hide it
  if(props.callsignVisibilityFilter[availability] === false) availability += ' hidden'
  const li = <Link to={'/callsign/'+props.callsign}><li className={'callsign ' + availability} key={props.callsign}>{props.callsign}</li></Link>
  if(tooltip) return <OverlayTrigger overlay={tooltip} placement='top'>{li}</OverlayTrigger>
  return li
}

Callsign.propTypes = {
  prefix: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  region: PropTypes.number.isRequired,
  callsign: PropTypes.string.isRequired,
  license_status: PropTypes.string,
  cancellation_date: PropTypes.string,
  effective_date: PropTypes.string,
  expired_date: PropTypes.string,
  certifier_first_name: PropTypes.string,
  certifier_mi: PropTypes.string,
  certifier_last_name: PropTypes.string,
  certifier_suffix: PropTypes.string,
  grant_date: PropTypes.string,
  callsignVisibilityFilter: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    graceperiod: PropTypes.bool.isRequired,
    unavailable: PropTypes.bool.isRequired
  }).isRequired,
}

export default Callsign
