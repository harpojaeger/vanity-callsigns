require('dotenv').config()
var pg = require('pg')
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public'
})
const async = require('async')
const combinatorics = require('js-combinatorics')

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
var first_letters = 'AKNW'.split('')
var possible_callsigns = []
var suffixes = []

console.log('Generating suffixes...')
for (i=1; i<=3; i++) {
  var baseN = combinatorics.baseN(alphabet,i)
  suffixes = suffixes.concat(baseN.toArray())
}
console.log('Generated',suffixes.length,'suffixes.')
// We have an array of arrays containing every possible callsign suffix.
// Now we'll generate prefixes.

first_letters.forEach( (first_letter) => {
  // Callsign prefixes can be one or two letters, so add a blank item to the alphabet array.  When the array is concatenated, it'll be blank!
  var second_letters = [''].concat(alphabet)
  // Callsigns starting with A may not have a 1-letter prefix, and the second letter must be A-K.
  if(first_letter === 'A') second_letters = 'ABCDEFGHIJK'.split('')

  second_letters.forEach( (second_letter) => {
    for(region = 0; region <=9; region++) {
      suffixes.forEach( (suffix) => {
        var this_callsign = [first_letter]
        this_callsign.push(second_letter,region)
        this_callsign = this_callsign.concat(suffix)
        this_callsign = this_callsign.join('')
        possible_callsigns.push( { callsign: this_callsign } )
        console.log(this_callsign)
      })
    }
  })
})

console.log('Done. Generated',possible_callsigns.length,'callsigns.')

knex.schema.createTableIfNotExists('allcallsigns', (table) => {
  table.increments()
  table.string('callsign')
  table.timestamps()
})
.then( (res) => {
  console.log(res)
})
.catch( (err) => {
  console.error(err)
})

knex
.batchInsert('allcallsigns', possible_callsigns, 1000)
.then( (res) => {
  console.log(res)
})
.catch( (err) => {
  console.error(err)
})
