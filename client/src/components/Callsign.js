import React from 'react'
import PropTypes from 'prop-types'
import '../style/Callsign.css'

function Callsign(props) {
  return <li className={['result',props.rollup_status_code].join(' ')} key={props.callsign}>{props.callsign}</li>
}

Callsign.propTypes = {
  prefix: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  region: PropTypes.number.isRequired,
  callsign: PropTypes.string.isRequired,
  rollup_status_code: PropTypes.string,
}

export default Callsign
