import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Callsign from './Callsign'
import '../style/ResultsList.css'

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
            license_status={attrs.license_status}/>
          })
        }
      </ul>
    </div>
  )
}

class ResultsList extends Component {
  constructor(props){
    super(props)
    this.byDimension = this.byDimension.bind(this)
    this.byDimensionObj = this.byDimensionObj.bind(this)
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
        <div className='resultsGroups'>
          <ResultsGroup title='1x2s' results={oneByTwos} />
          <ResultsGroup title='2x1s' results={twoByOnes} />
          <ResultsGroup title='1x3s' results={oneByThrees} />
          <ResultsGroup title='2x2s' results={twoByTwos} />
          <ResultsGroup title='2x3s' results={twoByThrees} />
        </div>
      </div>
    )
  }

}

ResultsGroup.propTypes = {
  results: PropTypes.objectOf(PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    region: PropTypes.number.isRequired,
    license_status: PropTypes.string
  })).isRequired
}

ResultsList.propTypes = {
  results: PropTypes.objectOf(PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    region: PropTypes.number.isRequired,
    license_status: PropTypes.string
  })).isRequired
}

export default ResultsList
