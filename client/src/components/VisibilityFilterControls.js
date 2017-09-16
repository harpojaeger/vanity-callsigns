import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../style/VisibilityFilterControls.css'

class VisibilityFilterControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      available: true,
      graceperiod: true,
      unavailable: true,
    }
    this.checkboxChanged = this.checkboxChanged.bind(this)
  }

  checkboxChanged(e) {
    const name = e.target.name
    const checked = e.target.checked
    this.setState( function(prevState){
      let newState = prevState
      newState[name] = checked
      return newState
    }, function() {
      this.props.updateFilterValues(this.state)
    })
  }

  render() {
    return(
      <div className='visibilityFilterControlFormWrapper'>
        <div className='visibilityFilterControlFormDescription'>
          show callsigns that are:
        </div>
        <form className='visibilityFilterControlForm'>
          <label>
            <input type='checkbox' name='available' checked={this.state.available} onChange={this.checkboxChanged}></input>
            available
          </label>
          <label>
            <input type='checkbox' name='unavailable' checked={this.state.unavailable} onChange={this.checkboxChanged}></input>
            unavailable
          </label>
          <label>
            <input type='checkbox' name='graceperiod' checked={this.state.graceperiod} onChange={this.checkboxChanged}></input>
            in grace period
          </label>
        </form>
      </div>
    )
  }
}

VisibilityFilterControls.propTypes = {
  updateFilterValues: PropTypes.func.isRequired,
}

export default VisibilityFilterControls
