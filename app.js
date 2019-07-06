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

app.listen(port, () =>
  console.log(`Homescraper running at http://localhost:${port}!`)
)

// start scrapers after verifying data folder exists
fs.readdir(`${__dirname}/scraper/data`, err => {
  if (err)
    fs.mkdir(`${__dirname}/scraper/data`, err => {
      if (err) return console.log(err)
      console.log('Created data directory.')
    })
})
require('./scraper/scraperManager')()

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
