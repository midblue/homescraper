const newScraper = require('./scraperGenerator').newScraper
const scrapers = require('./scraperList')

module.exports = function() {
  scrapers.forEach(scraperData => newScraper(scraperData))
  setTimeout(() => setInterval(() => console.log('\n'), 1000 * 60 * 60), 10000)
}
