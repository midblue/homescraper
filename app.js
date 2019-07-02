require('./scraper/scraperManager')()

const fs = require('fs')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

app.use(cors())
app.use(express.static('frontend/dist'))

app.get('/api', async (req, res) =>
  res.json([].concat.apply([], await getAllData()))
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getAllData() {
  return new Promise(resolve => {
    fs.readdir(`${__dirname}/scraper/data`, async (err, files) => {
      if (err) resolve(err)
      const promises = files
        .filter(fileName => fileName.endsWith('.json'))
        .map(fileName => {
          return new Promise(resolve => {
            fs.readFile(`${__dirname}/scraper/data/${fileName}`, (err, data) =>
              resolve(JSON.parse(data))
            )
          })
        })
      resolve(await Promise.all(promises))
    })
  })
}
