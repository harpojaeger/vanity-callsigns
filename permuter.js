const combinatorics = require('js-combinatorics')
const async = require('async')
// Expects three arrays: the first is up to 4 letters, the second is up to 10 digits 0-9, the third is up to 4 letters.
function permuter(prefixes, numbers, letters) {
  var available_callsigns = {
    a : [],
    k: [],
    n: [],
    w: [],
  }
  async.each(prefixes, function(prefix, err) {
    
  },
  function(err) {
    console.error(err)
  })
}
