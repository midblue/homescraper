const fs = require('fs')
const simpleGit = require('simple-git')('../personalsite2018/')

module.exports = function() {
  // copy data files to personalsite2018/static/homescraper/data/
  fs.readdir(`${__dirname}/scraper/data`, (err, files) => {
    if (err) return console.log(err)
    files
      .filter(file => file.endsWith('json'))
      .forEach(fileName => {
        fs.copyFileSync(
          `${__dirname}/scraper/data/${fileName}`,
          `../personalsite2018/static/homescraper/data/${fileName}`
        )
      })

    simpleGit.add(`./static/homescraper/data`, result =>
      console.log('add', result)
    )
    simpleGit.commit(`Updated homescraper data`, result =>
      console.log('commit', result)
    )
    simpleGit.push('origin', 'master', result => console.log('push', result))
  })
}
