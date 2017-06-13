import axios from 'axios'

function doSearch(s) {
  return axios.get('/callsigns', {
    params: {
      s: s
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
