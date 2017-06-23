import React from 'react'
import PropTypes from 'prop-types'
import '../style/Callsign.css'
import moment from 'moment'

function Callsign(props) {
  var classes = ['result']
  // Assume expired & cancelled callsigns are *not* available unless one of the below tests passes
  switch (props.license_status) {
    // Going to handle expired and cancelled licenses separately because I'm not positive they're logged the same way in the FCC data (i.e. the last action date might be different, and I don't want to comb the DB to find out, nor trust the FCC to do it the same way every time in the future)
    case 'E':
      console.log(props.callsign, 'expired', props.expired_date)
      const expDate = moment(props.expired_date, 'MM/DD/YYYY')
      // If the license expired less than two years & one day ago, mark it as unavailable.
      if(moment().subtract(2, 'years').subtract(1, 'days') <= expDate) {
        console.log("that's less than two years ago")
        classes.push(props.license_status)
      }
      break
    case 'C':
      console.log(props.callsign, 'cancelled', props.cancellation_date)
      const cancelDate = moment(props.cancellation_date, 'MM/DD/YYYY')
      if(moment().subtract(2, 'years').subtract(1, 'days') <= cancelDate) {
        console.log("that's less than two years ago")
        classes.push(props.license_status)
      }
      break
    default:
      classes.push(props.license_status)
  }
  return <li className={classes.join(' ')} key={props.callsign}>{props.callsign}</li>
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
}

export default Callsign
