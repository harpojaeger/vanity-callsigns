import React, {Component} from 'react'
import PropTypes from 'prop-types'

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

    })
  }

  render() {
    return(
      <div id='visibilityFilterControlFormWrapper'>
        <form id='visibilityFilterControlForm'>
          <input type='checkbox' name='available' checked={this.state.available} onChange={this.checkboxChanged}></input>
          <input type='checkbox' name='unavailable' checked={this.state.unavailable} onChange={this.checkboxChanged}></input>
          <input type='checkbox' name='graceperiod' checked={this.state.graceperiod} onChange={this.checkboxChanged}></input>
        </form>
      </div>
    )
  }
}

VisibilityFilterControls.PropTypes = {
  
}

export default VisibilityFilterControls
