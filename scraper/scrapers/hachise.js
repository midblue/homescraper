module.exports = {
  name: 'hachise',
  url: `https://www.hachise.jp/rent/list/index.html`,
  listingSelector: {
    selector:
      'li.property.diy.pet.live.shimo, li.property.diy.pet.live.naka, li.property.diy.pet.live.kami',
    context: '.propertyList ul',
  },
  attributeSelectors: {
    title($, el) {
      return $(el)
        .find('dl h3')
        .text()
        .replace(/^[\n\s]*/g, '')
        .replace(/[\n\s]*$/g, '')
    },
    url($, el) {
      return `https://www.hachise.jp/rent/${
        /.*\/([0-9]*)\/.*/g.exec(
          $(el)
            .find('.outlineLink a')
            .attr('href')
        )[1]
      }/`
    },
    price($, el) {
      return (
        parseInt(
          $('dd.price', el)
            .text()
            .replace(',', '')
            .replace(' ', '')
            .replace('円', '')
        ) /
          10000 +
        '万'
      )
    },
    area($, el) {
      return $('dd.buildArea', el).text()
    },
    img($, el) {
      return `https://www.hachise.jp/rent/${
        /.*\/([0-9]*)\/.*/g.exec($('.mainImage img', el).attr('src'))[1]
      }/img/200.jpg`
    },
    location($, el) {
      return $('dd.address', el).text()
    },
  },
}
