require('dotenv').config()
var pg = require('pg')
pg.defaults.ssl = true
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public',
  debug: true
})
var searchString = 'KG7YWU'
var searchChars = searchString.toUpperCase().split('')
var searchStrings = Object.values(searchChars.reduce( (result, item) => {
  result[item] = (result[item] || '') +`%${item}%`
  return result
}, {}))
while(searchStrings.length < 6) searchStrings.push('%')
console.log('Final search parameters:',searchStrings)

knex('licenses.amateur')
.select('callsign','lic_name','rollup_status_code','expired_date','cancellation_date')
.whereRaw(`callsign like ?
AND callsign LIKE ?
AND callsign LIKE ?
AND callsign LIKE ?
AND callsign LIKE ?
AND callsign LIKE ?`,searchStrings
)
.orderByRaw('length(callsign), callsign')
.then( (res) => {
  console.log('found',res.length,'callsigns matching', searchString)
  knex.destroy()
})
.catch( (err) => {
  console.error(err)
})
