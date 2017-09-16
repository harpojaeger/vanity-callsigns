import React from 'react'
import PropTypes from 'prop-types'
import Callsign from './Callsign'
import '../style/ResultsGroup.css'

function ResultsGroup(props) {
  return(
    <div>
      {Object.keys(props.results).length > 0 && <h2 className='resultsGroupHeading'>{props.title}</h2>}
      <ul className='resultsGroup'>
        {
          Object.keys(props.results).map( (callsign) => {
            const attrs = props.results[callsign]
            // console.log('for callsign',callsign,'got props',props.results[callsign])
            return <Callsign
            key={callsign}
            callsign={callsign}
            prefix={attrs.prefix}
            region={attrs.region}
            suffix={attrs.suffix}
            license_status={attrs.license_status}
            expired_date={attrs.expired_date}
            cancellation_date={attrs.cancellation_date}
            effective_date={attrs.cancellation_date}
            certifier_first_name={attrs.certifier_first_name}
            certifier_mi={attrs.certifier_mi}
            certifier_last_name={attrs.certifier_last_name}
            certifier_suffix={attrs.certifier_suffix}
            grant_date={attrs.grant_date}
            callsignVisibilityFilter={props.callsignVisibilityFilter}
          />
          })
        }
      </ul>
    </div>
  )
}

ResultsGroup.propTypes = {
  results: PropTypes.objectOf(PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    region: PropTypes.number.isRequired,
    license_status: PropTypes.string,
    cancellation_date: PropTypes.string,
    effective_date: PropTypes.string,
    expired_date: PropTypes.string,
    certifier_first_name: PropTypes.string,
    certifier_mi: PropTypes.string,
    certifier_last_name: PropTypes.string,
    certifier_suffix: PropTypes.string,
    grant_date: PropTypes.string,
  })).isRequired,
  callsignVisibilityFilter: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    gracePeriod: PropTypes.bool.isRequired,
    unavailable: PropTypes.bool.isRequired
  }).isRequired,
}

export default ResultsGroup
