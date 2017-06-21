import React from 'react'
import PropTypes from 'prop-types'
import '../style/Callsign.css'

function Callsign(props) {
  return <li className={['result',props.license_status].join(' ')} key={props.callsign}>{props.callsign}</li>
}

Callsign.propTypes = {
  prefix: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  region: PropTypes.number.isRequired,
  callsign: PropTypes.string.isRequired,
  license_status: PropTypes.string,
}

export default Callsign
