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
  const callsigns = req.query.callsigns.split(',')
  console.log('Bulk callsign search received', callsigns)
  knex('licenses.amateur')
  .select('callsign','rollup_status_code')
  .whereIn('callsign',callsigns)
  .then( (rows) => {
    res.send(rows)
  })
})

module.exports = router
