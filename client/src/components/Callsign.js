import React from 'react'
import PropTypes from 'prop-types'

function Callsign(props) {
  return <li key={props.callsign}>{props.callsign}</li>
}

Callsign.propTypes = {
  prefix: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  region: PropTypes.number.isRequired,
  callsign: PropTypes.string.isRequired,
}

export default Callsign
