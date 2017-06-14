import axios from 'axios'

function doSearch(s, offset) {
  return axios.get('/callsigns', {
    params: {
      s: s,
      offset: offset
    }
  })
  .then( (res) => {
    console.log('API: got',res)
    return res.data
  })
  .catch( (e) => {
    console.error('Error fetching callsign data',e)
    return null
  })
}

export default {
  doSearch: doSearch
}
