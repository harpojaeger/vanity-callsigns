import React from 'react'
import PropTypes from 'prop-types'

function ResultsList(props) {

  return(
    <ul>
      {props.results.map( (res) => {
        var callsign = res.prefix.concat(res.region, res.suffix)
        return <li key={callsign}>{callsign}</li>
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
