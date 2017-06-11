require('dotenv').config()
var pg = require('pg')
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public'
})
const async = require('async')
const combinatorics = require('js-combinatorics')

knex.schema.createTableIfNotExists('allcallsigns', (table) => {
  table.string('callsign')
})
.then( (res) => {
  console.log(res)
})
.catch( (err) => {
  console.error(err)
})

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
var first_letters = 'AKNW'.split('')
var regions = '0123456789'.split('')
var suffixes = []
var all_callsigns = []

console.log('Generating suffixes...')
for (i=1; i<=3; i++) {
  var baseN = combinatorics.baseN(alphabet,i)
  suffixes = suffixes.concat(baseN.toArray())
}
console.log('Generated',suffixes.length,'suffixes.')
// We have an array of arrays containing every possible callsign suffix.
// Now we'll generate prefixes.


async.each(first_letters,
  function(first_letter, cb_1) {
    // Callsign prefixes can be one or two letters, so add a blank item to the alphabet array.  When the array is concatenated, it'll be blank!
    var second_letters = [''].concat(alphabet)
    // Callsigns starting with A may not have a 1-letter prefix, and the second letter must be A-K.
    if(first_letter === 'A') second_letters = 'ABCDEFGHIJK'.split('')

    async.eachSeries(second_letters,
      function(second_letter, cb_2) {
        var these_callsigns = []
        async.each(regions,
          function(region, cb_region){
            async.each(suffixes,
              function(suffix, cb_suff){
                var this_callsign = [
                  first_letter,
                  second_letter,
                  region,
                  suffix.join('')].join('')
                these_callsigns.push( { callsign: this_callsign } )
                //console.log(this_callsign)
                cb_suff(null)
              },
              function(err_suff) {
                if(err_suff) console.err(err_suff)
              })
            cb_region(null)
          },
          function (err_region){
            if(err_region) console.error(err_region)
          }
        )
        var prefix = [first_letter,second_letter].join('')
        console.log('Generated',these_callsigns.length,'callsigns with prefix',prefix)
        // Run the batch insert now, and don't move on to the next prefix until it's done.  This should prevent us from clobbering the db.
        knex.batchInsert('allcallsigns', these_callsigns, 1000)
        .then( (res) => {
          var rows = res.reduce( (acc, indiv) => { return acc + indiv.rowCount }, 0)
          console.log('Inserted',rows,'rows for prefix',prefix)
          cb_2(null)
        })
        .catch( (err) => {
          cb_2(err)
        })
      },
      function (err2) {
        if(err2) console.error(err2)
      })
    cb_1(null)
  },
  function(err1) {
    if(err1) console.error(err1)
  }
)
