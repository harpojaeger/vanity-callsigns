import axios from 'axios'

function bulkSearch(callsigns) {
  return axios.get('/search', {params: {
    callsigns: callsigns.join(',')
  }})
  .then( (res) => {
    console.log('API: got', res)
    return res.data
  })
  .catch( (e) => {
    console.error('Error fetching callsign data', e)
    return null
  })
}

export default {
  bulkSearch: bulkSearch
}
