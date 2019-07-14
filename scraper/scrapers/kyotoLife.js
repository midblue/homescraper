module.exports = {
  name: 'kyotoLife',
  url: `https://www.kyoto-life.co.jp/search/result/mode/20/are/26102_26104_26106/cat/30/prh/15/arl/60/con/-200_10301_10902`, //`https://www.kyoto-life.co.jp/search/result/mode/20/dmode/0/con/-200_10301_10902/count/30/sort1/30/are/26104_26106/cat/30/prh/15/arl/60`,
  listingSelector: {
    selector: '.bukken',
    context: '.section',
  },
  attributeSelectors: {
    title($, el) {
      return $(el)
        .find('a')
        .text()
    },
    url($, el) {
      return `https://www.kyoto-life.co.jp${$(el)
        .find('a')
        .attr('href')}`
    },
    price($, el) {
      return $('.price', el).text() + '万'
    },
    area($, el) {
      return /([^\n\t\s]*)㎡/gi.exec($('.bukken-data-detail', el).text())[1]
    },
    img($, el) {
      return `https://www.kyoto-life.co.jp${$('.image-list img', el).attr(
        'src'
      )}`.replace(/(155|129)/g, '491')
    },
    location($, el) {
      return /\t*([^\n]*)/gi.exec(
        $('.bukken-body tbody tr', el)
          .text()
          .substring(1)
      )[1]
    },
  },
}
