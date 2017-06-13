import React from 'react'
import PropTypes from 'prop-types'

function ResultsList(props) {
  return(
    <ul>
      {props.results.map( (res) => {
        return <li key={res.callsign}>{res.callsign}</li>
      })}
    </ul>
  )
}

ResultsList.propTypes = {
  callsignSearched: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    callsign: PropTypes.string.isRequired,
    rollup_status_code: PropTypes.string
  })).isRequired
}

export default ResultsList
