import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Callsign from './Callsign'
import '../style/ResultsList.css'

function ResultsGroup(props) {
  return(
    <div>
      {props.results.length > 0 && <h1 className='resultsGroupHeading'>{props.title}</h1>}
      <ul className='resultsGroup'>
        {props.results.map( (res) => {
          const callsign = res.prefix.concat(res.region, res.suffix)
          return <Callsign
            key={callsign}
            callsign={callsign}
            prefix={res.prefix}
            region={res.region}
            suffix={res.suffix}
            rollup_status_code={res.rollup_status_code}
          />
        })}
      </ul>
    </div>
  )
}

class ResultsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      // filterParams: defaultFilterState
    }
    this.byDimension = this.byDimension.bind(this)
  }
  byDimension(callsign) {
    return (callsign, filterParams) => {
      return callsign.prefix.length === filterParams.prefixLength && callsign.suffix.length === filterParams.suffixLength
    }
  }

  render(){
    // Split the callsigns up into grops by dimension.
    const oneByTwos = this.props.results.filter(this.byDimension({prefixLength: 1, suffixLength: 2}))
    const oneByThrees = this.props.results.filter(this.byDimension, {prefixLength: 1, suffixLength: 3})
    const twoByOnes = this.props.results.filter(this.byDimension, {prefixLength: 2, suffixLength: 1})
    const twoByTwos = this.props.results.filter(this.byDimension, {prefixLength: 2, suffixLength: 2})
    const twoByThrees = this.props.results.filter(this.byDimension, {prefixLength: 2, suffixLength: 3})

    // const sumOfSplitLengths = oneByTwos.length + oneByThrees.length + twoByOnes.length + twoByTwos.length + twoByThrees.length
    // console.log('Split callsigns, length sum is',sumOfSplitLengths,'total length is',this.props.results.length)
    return (
      <div>
        <ResultsGroup title='1x2s' results={oneByTwos} />
        <ResultsGroup title='2x1s' results={twoByOnes} />
        <ResultsGroup title='1x3s' results={oneByThrees} />
        <ResultsGroup title='2x2s' results={twoByTwos} />
        <ResultsGroup title='2x3s' results={twoByThrees} />
      </div>
    )
  }

}

ResultsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    region: PropTypes.number.isRequired,
    rollup_status_code: PropTypes.string
  }))
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
