import axios from 'axios'

function doSearch(params) {
  return axios.get('/callsigns', { params: params })
  .then( (res) => {
    console.log('API: got',res)
    return res.data
  })
  .catch( (e) => {
    console.error('Error fetching callsign data',e)
    return null
  })
}

function bulkSearch(callsigns) {
  return axios.get('/search-bulk', {params: {
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
  doSearch: doSearch
  bulkSearch: bulkSearch
}
