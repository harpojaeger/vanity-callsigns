import React from 'react'
import PropTypes from 'prop-types'
import '../style/Callsign.css'
import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function Callsign(props) {
  var classes = ['result']
  var statusText = null
  var tooltip = null
  var tooltipText = ''
  // inactiveDate will store the date the license either expired or was cancelled, depending on the license status.
  var inactiveDate = null
  if(props.license_status ==='E') {
    statusText = 'Expired'
    inactiveDate = props.expired_date
  } else if(props.license_status === 'C') {
    statusText = 'Cancelled'
    inactiveDate = props.cancellation_date
  }
  classes.push(props.license_status)
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
      classes.push('graceperiod')
    }
  }
  const li = <li className={classes.join(' ')} key={props.callsign}>{props.callsign}</li>
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
    gracePeriod: PropTypes.bool.isRequired,
    unavailable: PropTypes.bool.isRequired
  }).isRequired,
}

export default Callsign
