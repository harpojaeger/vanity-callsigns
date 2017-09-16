import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../style/VisibilityFilterControls.css'
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap'

class VisibilityFilterControls extends Component {
  constructor(props) {
    super(props)
    this.checkboxChanged = this.checkboxChanged.bind(this)
  }

  checkboxChanged(e) {
    const name = e.target.name
    const checked = e.target.checked
    let newValues = this.props.filterValues
    newValues[name] = checked
    console.log('<VisibilityFilterControls> computed new filter values', newValues)
    this.props.updateFilterValues(newValues)
  }

  render() {
    const graceperiodTooltip = (<Tooltip id='graceperiodExplanation'>The FCC imposes a two-year grace period after a callsign is cancelled or expires before it can be registered again.</Tooltip>)
    return(
      <div className='visibilityFilterControlFormWrapper'>
        <div className='visibilityFilterControlFormDescription'>
          show callsigns that are:
        </div>
        <form className='visibilityFilterControlForm'>
          <label>
            <input type='checkbox' name='available' checked={this.props.filterValues.available} onChange={this.checkboxChanged}></input>
            available
          </label>
          <label>
            <input type='checkbox' name='unavailable' checked={this.props.filterValues.unavailable} onChange={this.checkboxChanged}></input>
            unavailable
          </label>
          <label>
            <input type='checkbox' name='graceperiod' checked={this.props.filterValues.graceperiod} onChange={this.checkboxChanged}></input>
            in grace period
            <OverlayTrigger
              overlay={graceperiodTooltip}
              placement='top'>
              <sup><Glyphicon glyph='question-sign' /></sup>
            </OverlayTrigger>
          </label>
        </form>
      </div>
    )
  }
}

VisibilityFilterControls.propTypes = {
  filterValues: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    graceperiod: PropTypes.bool.isRequired,
    unavailable: PropTypes.bool.isRequired
  }).isRequired,
  updateFilterValues: PropTypes.func.isRequired,
}

export default VisibilityFilterControls
