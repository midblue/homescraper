const newScraper = require('./scraperGenerator').newScraper
const scrapers = require('./scraperList')

module.exports = function() {
  scrapers.forEach(scraperData => newScraper(scraperData))
}
