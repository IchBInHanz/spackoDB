const express = require('express')
const app = express()
require('dotenv').config()

const rountes = require('./app/src/rountes')

app.use(express.static(__dirname+'/public'))
rountes

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);