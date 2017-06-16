// const async = require('async')
const combinatorics = require('js-combinatorics')

const generate = function generate(params) {
  return new Promise( (resolve, reject) => {
    console.log('generator function received params', params)
    const search_letters = params.search_letters
    const search_regions = params.search_regions
    const first_letters = params.first_letters
    // Ensure we only return unique callsigns, so use a Set
    var callsigns = new Set()

    const disallowedAPrefixes = /^A[L-Z]?\d/i
    const isValidCallsign = /^[AKNW][a-z]?\d[a-z]{1,3}$/i

    search_regions.forEach( (region) => {
      let cmb = combinatorics.permutation(search_letters.concat([region]))
      let a
      //eslint-disable-next-line
      while(a = cmb.next()) {
        //eslint-disable-next-line
        first_letters.forEach( (first_letter) => {
          const callsign = first_letter + a.join('')
          // console.log('testing', callsign)
          if (callsign.search(isValidCallsign) === -1) {
            // console.log(callsign, 'is not a valid callsign')
          } else if(callsign.search(disallowedAPrefixes) !== -1) {
            // console.log('Callsign',callsign,'flunked A prefix test')
          } else {
            callsigns.add(callsign)
          }
        })
      }
    })
    console.log('Generated', callsigns.size, 'valid callsigns.',callsigns)
    let unique = {}
    callsigns.forEach( (callsign) => {
      const digitIndex = callsign.search(/\d/)
      unique[callsign]={
        prefix: callsign.substr(0, digitIndex),
        region: parseInt(callsign.substr(digitIndex, 1), 10),
        suffix: callsign.substr(digitIndex+1),
      }
    })
    resolve(unique)
  })
}

module.exports = {
  generate: generate
}
