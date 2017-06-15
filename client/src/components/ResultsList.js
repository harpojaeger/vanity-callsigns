import React, {Component} from 'react'
// import {FormGroup, Checkbox} from 'react-bootstrap'
import PropTypes from 'prop-types'
import Callsign from './Callsign'
import '../style/ResultsList.css'

function ResultsGroup(props) {
  return(
    <div>
      {props.results.length > 0 && <h2 className='resultsGroupHeading'>{props.title}</h2>}
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
    this.byDimension = this.byDimension.bind(this)
    // this.filterResults = this.filterResults.bind(this)
    // this.handleRegionFilterControlUpdate = this.handleRegionFilterControlUpdate.bind(this)
    // this.handleLetterFilterControlUpdate = this.handleLetterFilterControlUpdate.bind(this)
    // const initialFilterState = {
    //   letters: {
    //     A: true,
    //     K: true,
    //     N: true,
    //     W: true
    //   },
    //   regions: {
    //     0: true,
    //     1: true,
    //     2: true,
    //     3: true,
    //     4: true,
    //     5: true,
    //     6: true,
    //     7: true,
    //     8: true,
    //     9: true
    //   }
    // }
    // this.state = {
    //   initialfilterState: initialFilterState,
    //   filterState: initialFilterState
    // }
  }
  byDimension(filterParams) {
    return (callsign) => {
      return callsign.prefix.length === filterParams.prefixLength && callsign.suffix.length === filterParams.suffixLength
    }
  }
  // handleRegionFilterControlUpdate(e) {
  //   console.log(e.target)
  //   const region = e.target.name
  //   this.setState( (prevState) => {
  //     var newState = prevState
  //     newState.filterState.regions[region] = !newState.filterState.regions[region]
  //     return newState
  //   })
  // }
  // handleLetterFilterControlUpdate(e) {
  //   console.log(e.target)
  //   const letter = e.target.name
  //   this.setState( (prevState) => {
  //     var newState = prevState
  //     newState.filterState.letters[letter] = !newState.filterState.letters[letter]
  //     return newState
  //   })
  // }
  // filterResults(result) {
  //   return this.state.filterState.regions[result.region] && this.state.filterState.letters[result.prefix.substring(0,1)]
  // }
  // componentWillReceiveProps() {
  //   //reset the filter here
  // }
  render(){
    // Placeholder for the filter function
    // var filteredResults = this.props.results.filter(this.filterResults)

    // Split the callsigns up into groups by dimension.
    const oneByTwos = this.props.results.filter(this.byDimension({prefixLength: 1, suffixLength: 2}))
    const oneByThrees = this.props.results.filter(this.byDimension({prefixLength: 1, suffixLength: 3}))
    const twoByOnes = this.props.results.filter(this.byDimension({prefixLength: 2, suffixLength: 1}))
    const twoByTwos = this.props.results.filter(this.byDimension({prefixLength: 2, suffixLength: 2}))
    const twoByThrees = this.props.results.filter(this.byDimension({prefixLength: 2, suffixLength: 3}))
    const sumOfSplitLengths = oneByTwos.length + oneByThrees.length + twoByOnes.length + twoByTwos.length + twoByThrees.length
    console.log('Split callsigns, length sum is',sumOfSplitLengths,'total length is',this.props.results.length)
    return(
      <div className='resultsWrapper'>
        <span className='resultsMeta'>
        {/* <div className='filterControls'>
          <FormGroup id='regions'>{
            [...Array(10)].map( (el, i) => {
              return <Checkbox inline
                key={'region-'+i}
                onChange={this.handleRegionFilterControlUpdate}
                name={i}
                checked={this.state.filterState.regions[i]}>
                  {i}
                </Checkbox> })
          }</FormGroup>
          <FormGroup id='letters'>{
          ['A','K','N','W'].map( (letter) => {
            return <Checkbox inline
              key={'letter-'+letter}
              onChange={this.handleLetterFilterControlUpdate}
              name={letter}
              checked={this.state.filterState.letters[letter]}>
                {letter}
              </Checkbox>})
          }</FormGroup>
        </div> */}
      </span>
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
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    region: PropTypes.number.isRequired,
    rollup_status_code: PropTypes.string
  }))
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    region: PropTypes.number.isRequired,
    rollup_status_code: PropTypes.string
  })).isRequired
}

export default ResultsList
