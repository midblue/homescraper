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
      setInterval(getNewListings, 1000 * 60 * 60) // every hour
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

        let removedListings = runningListOfSeenItems[name].map(
          listing => listing.title
        )

        listings.each((index, el) => {
          const payload = {}
          Object.keys(attributeSelectors).forEach(attr => {
            const value = attributeSelectors[attr]($, el)
            payload[attr] = value
          })
          payload.firstSeen = Date.now()
          payload.source = name
          payload.sourceURL = url

          removedListings = removedListings.filter(
            title => payload.title !== title
          )

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

        removedListings.forEach(title => {
          console.log(`\nListing removed from ${name}:\n`, title, '\n')
          runningListOfSeenItems[name] = runningListOfSeenItems[name].filter(
            listing => title !== listing.title
          )
          fs.writeFileSync(
            `${__dirname}/data/${name}.json`,
            JSON.stringify(runningListOfSeenItems[name])
          )
        })
      })
      .catch(err =>
        console.log('Failed to fetch', name, `@`, new Date(), err.code)
      )
  }

  return scraper
}
