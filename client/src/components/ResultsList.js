import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ResultsGroup from './ResultsGroup'
import VisibilityFilterControls from './VisibilityFilterControls.js'
import '../style/ResultsList.css'

class ResultsList extends Component {
  constructor(props){
    super(props)
    this.byDimension = this.byDimension.bind(this)
    this.byDimensionObj = this.byDimensionObj.bind(this)
    this.state = {
      // Object to control which kinds of callsigns are displayed. By default, all are visible. The filtering will need to be done at the level of <Callsign /> because it's complex, so this object will be passed down through props.
      callsignVisibilityFilter: {
        // Callsigns available for registration
        available: true,
        // Callsigns in the two-year grace period after cancellation/expiration
        graceperiod: true,
        // Callsigns currently registered and therefore unavailable
        unavailable: true
      }
    }
  }

  byDimension(filterParams) {
    return (callsign) => {
      return callsign.prefix.length === filterParams.prefixLength && callsign.suffix.length === filterParams.suffixLength
    }
  }

  byDimensionObj(obj, prefixLength, suffixLength) {
    // console.log('byDimensionObj called with',obj)
    const objKeys = Object.keys(obj)
    // console.log('calculated keys', objKeys)
    var filtered = objKeys.reduce( (acc, val) => {
      // console.log('params:', prefixLength, suffixLength)
      // console.log('val is',val)
      // console.log('obj val is',obj[val])
      // console.log('acc is', acc)
      if((obj[val].prefix.length === prefixLength) && (obj[val].suffix.length === suffixLength)) acc[val] = obj[val]
      // console.log('after assignment: acc is', acc)
      return acc
    }, {})
    return filtered
  }

  render(){
    const oneByTwos = this.byDimensionObj(this.props.results, 1, 2)
    const oneByThrees = this.byDimensionObj(this.props.results, 1, 3)
    const twoByOnes = this.byDimensionObj(this.props.results, 2, 1)
    const twoByTwos = this.byDimensionObj(this.props.results, 2, 2)
    const twoByThrees = this.byDimensionObj(this.props.results, 2, 3)
    return(
      <div className='resultsWrapper'>
        <div className='callsignVisibilityFilterControls'>
          <VisibilityFilterControls />
        </div>
        <div className='resultsGroups'>
          <ResultsGroup title='1x2s' results={oneByTwos} callsignVisibilityFilter={this.state.callsignVisibilityFilter} />
          <ResultsGroup title='2x1s' results={twoByOnes} callsignVisibilityFilter={this.state.callsignVisibilityFilter} />
          <ResultsGroup title='1x3s' results={oneByThrees} callsignVisibilityFilter={this.state.callsignVisibilityFilter} />
          <ResultsGroup title='2x2s' results={twoByTwos} callsignVisibilityFilter={this.state.callsignVisibilityFilter} />
          <ResultsGroup title='2x3s' results={twoByThrees} callsignVisibilityFilter={this.state.callsignVisibilityFilter} />
        </div>
      </div>
    )
  }

}

ResultsList.propTypes = {
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
  })).isRequired
}

export default ResultsList
