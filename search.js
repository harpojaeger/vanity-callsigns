require('dotenv').config()
const pg = require('pg')
if (process.env.NODE_ENV === 'production') pg.defaults.ssl = true
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public',
  debug: true
})
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log('server received search params',req.query)
  if(!req.query.s  || ! req.query.offset) {
    res.sendStatus(400)
  } else {
    // Set a length limit if we were told to search only these chars
    var callsignLengthBounds = [1,6]
    if(req.query.searchOnlyTheseChars === 'true') {
      callsignLengthBounds[0] = req.query.s.length
      callsignLengthBounds[1] = req.query.s.length
    }
    console.log('callsign length bounds',callsignLengthBounds)
    var searchChars = req.query.s.toUpperCase().split('')
    var searchStrings = Object.values(searchChars.reduce( (result, item) => {
      result[item] = (result[item] || '') +`%${item}%`
      return result
    }, {}))
    while(searchStrings.length < 6) searchStrings.push('%')
    console.log('Callsign search patterns:',searchStrings)

    knex('licenses.amateur')
    .select('lic_name','rollup_status_code','expired_date','cancellation_date',knex.raw("((regexp_split_to_array(callsign, '[0-9]'))[1]) as prefix, (regexp_split_to_array(callsign, '[0-9]'))[2] as suffix, (regexp_matches(callsign,'[0-9]'))[1]::integer AS region"))
    .whereRaw(`length(callsign) >= ?
    AND length(callsign) <= ?`, callsignLengthBounds)
    .whereRaw(`callsign like ?
    AND callsign LIKE ?
    AND callsign LIKE ?
    AND callsign LIKE ?
    AND callsign LIKE ?
    AND callsign LIKE ?`,searchStrings
    )
    .orderByRaw('length(callsign), callsign')
    .limit(50)
    .offset(req.query.offset)
    .then( (rows) => {
      console.log('found',rows.length,'callsigns matching', req.query.s)
      res.send(rows)
    })
    .catch( (err) => {
      console.error(err)
      res.sendStatus(500)
    })
  }

})



module.exports = router
