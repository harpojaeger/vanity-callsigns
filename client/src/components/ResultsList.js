import React from 'react'
import PropTypes from 'prop-types'
import Callsign from './Callsign'

function ResultsList(props) {
  return(
    <ul>
      {props.results.map( (res) => {
        var callsign = res.prefix.concat(res.region, res.suffix)
        return <Callsign key={callsign} callsign={callsign} prefix={res.prefix} region={res.region} suffix={res.suffix} />
      })}
    </ul>
  )
}

ResultsList.propTypes = {
  callsignSearched: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    region: PropTypes.number.isRequired,
    rollup_status_code: PropTypes.string
  })).isRequired
}

export default ResultsList
