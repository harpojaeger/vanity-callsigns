const parse = require('csv-parse')
const fs = require('fs')
require('dotenv').config()
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public',
  useNullAsDefault: true
})

fs.readFile('tmp/sample_licenses.csv', 'utf8', function(err, data) {
  if (err) throw err

  parse(data, {
    delimiter: ',',
    columns: true
  }, function(err, output) {
    console.log('Parsed CSV data,',output.length,'rows')
    knex('licenses')
    .insert(output)
    .then( (res) => {
      console.log(res)
    })
  })
})
