const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

let runningListOfSeenItems = {}

module.exports = {
  newScraper(settings) {
    fs.readFile(`${__dirname}/data/${settings.name}.json`, (err, data) => {
      let dataToUse = data
      if (err) dataToUse = '[]'
      runningListOfSeenItems[settings.name] = JSON.parse(dataToUse)
      const getNewListings = generateScraper(settings)
      getNewListings()
      setTimeout(getNewListings, 1000 * 60 * 60) // every hour
    })
  },
}

function generateScraper({ name, url, listingSelector, attributeSelectors }) {
  const scraper = function() {
    fetch(url)
      .then(res => res.text())
      .then(result => {
        const $ = cheerio.load(result)

        const listings = $(
          listingSelector.selector,
          $(listingSelector.context).get(0)
        )

        console.log(
          `Scraping ${name} @`,
          new Date(),
          `(${listings.length} listings found)`
        )
        listings.each((index, el) => {
          const payload = {}
          Object.keys(attributeSelectors).forEach(attr => {
            const value = attributeSelectors[attr]($, el)
            payload[attr] = value
          })
          payload.firstSeen = Date.now()

          if (
            !payload.title ||
            runningListOfSeenItems[name].find(el => el.title === payload.title)
          )
            return

          console.log(`New listing on ${name}:\n`, payload, '\n')
          runningListOfSeenItems[name].push(payload)

          fs.writeFile(
            `${__dirname}/data/${name}.json`,
            JSON.stringify(runningListOfSeenItems[name]),
            (err, result) => {
              if (err) console.log('failed to save', err)
            }
          )
        })
      })
  }

  return scraper
}
