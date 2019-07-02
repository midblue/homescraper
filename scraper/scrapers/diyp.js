module.exports = {
  name: 'DIYP',
  url: `https://www.diyp.jp/?sort=&pref=26&youto%5B%5D=0&chinryou_min=0&chinryou_max=150000&menseki_min=50&menseki_max=100000&search_word=`,
  listingSelector: {
    selector: 'dl.rooms',
    context: '.contents',
  },
  attributeSelectors: {
    title($, el) {
      return $(el)
        .find('.room_title a')
        .text()
        .replace(/^[\n\s]*/g, '')
        .replace(/[\n\s]*$/g, '')
    },
    url($, el) {
      return `https://www.diyp.jp${$(el)
        .find('.room_title a')
        .attr('href')}`
    },
    price($, el) {
      return (
        parseInt(
          $('.room_detail span', el)
            .text()
            .substring(1)
            .replace(',', '')
        ) /
          10000 +
        '万'
      )
    },
    area($, el) {
      return /.*／(.*)㎡/gi.exec($('.room_detail', el).text())[1]
    },
    img($, el) {
      return $('.room_image img', el).attr('src')
    },
    location($, el) {
      return $('.room_address', el)
        .text()
        .replace(/\n/g, ' ')
        .replace(/^[\n\s]*/g, '')
        .replace(/[\n\s]*$/g, '')
        .replace(/\s+/g, ' ')
    },
  },
}
