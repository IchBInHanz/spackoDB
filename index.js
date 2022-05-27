const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')({origin: true});


const rountes = require('./app/src/rountes')

app.use(express.static(__dirname+'/public'))
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.post('/db', async (req, res) => {
  cors(req, res, async () => {
    res.setHeader('Content-Type', 'application/json');
    var resp = await rountes.routes(req)
    res.status(resp.code).send(JSON.stringify(resp.response));
  })
})


app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);