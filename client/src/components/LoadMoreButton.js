import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import '../style/LoadMoreButton.css'

function LoadMoreButton(props) {
  const buttonText = ['Load',props.amount,'more...'].join(' ')
  return <Button className='loadMoreButton' onClick={props.loadMoreFunction} disabled={props.moreResultsAreLoading}>{props.moreResultsAreLoading ? 'Loading...' : buttonText }
  </Button>
}

LoadMoreButton.propTypes = {
  loadMoreFunction: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  moreResultsAreLoading: PropTypes.bool.isRequired
}

export default LoadMoreButton
