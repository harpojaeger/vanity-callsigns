const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))

if (process.env.NODE_ENV === 'production') {
  console.log('production mode')
  app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
  res.send('Hello world.')
})

const search = require('./search')
app.use('/callsigns', search)

const searchBulk = require('./search-bulk')
app.use('/search-bulk', searchBulk)

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log('Server running on port', port)
})

module.exports = app
