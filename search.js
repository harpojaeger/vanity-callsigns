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
  console.log(req.query)
  if(!req.query.s) {
    res.sendStatus(400)
  } else {
    var searchChars = req.query.s.toUpperCase().split('')
    var searchStrings = Object.values(searchChars.reduce( (result, item) => {
      result[item] = (result[item] || '') +`%${item}%`
      return result
    }, {}))
    while(searchStrings.length < 6) searchStrings.push('%')
    console.log('Final search parameters:',searchStrings)

    knex('licenses.amateur')
    .select('lic_name','rollup_status_code','expired_date','cancellation_date',knex.raw("((regexp_split_to_array(callsign, '[0-9]'))[1]) as prefix, (regexp_split_to_array(callsign, '[0-9]'))[2] as suffix, (regexp_matches(callsign,'[0-9]'))[1]::integer AS region"))
    .whereRaw(`callsign like ?
    AND callsign LIKE ?
    AND callsign LIKE ?
    AND callsign LIKE ?
    AND callsign LIKE ?
    AND callsign LIKE ?`,searchStrings
    )
    .orderByRaw('length(callsign), callsign')
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
