module.exports = {
  name: 'R不動産',
  url: `https://www.realkyotoestate.jp/estate_search.php?mode=key&display=inline&type%5B%5D=1&usage%5B%5D=1&k=&x=114&y=456&type2%5B%5D=1&rent_from=0&rent_to=15&building_area_from=50&building_area_to=0&area_id%5B%5D=3&area_id%5B%5D=4&area_id%5B%5D=5&area_id%5B%5D=6&other%5B%5D=3`,
  listingSelector: {
    selector: '.estate_link',
    context: '#search_resul',
  },
  attributeSelectors: {
    title($, el) {
      const title = $(el)
        .find('tbody tr td a b')
        .text()
      // console.log(title)
      return title
    },
    url($, el) {
      const url = `https://www.realkyotoestate.jp/${$(el)
        .find('tbody tr td a')
        .attr('href')}`
      // console.log(url)
      return url
    },
    price($, el) {
      const price = $(
        'tbody tr span[style="font-size:12px; color:#5f221c;"] b',
        el
      )
        .text()
        .substring(
          0,
          $('tbody tr span[style="font-size:12px; color:#5f221c;"] b', el)
            .text()
            .indexOf('万') + 1
          // skips any thousands
        )
      // console.log(price)
      return price
    },
    area($, el) {
      const area = $(
        'tbody tr span[style="font-size:12px; color:#5f221c;"] b',
        el
      )
        .text()
        .substring(
          $('tbody tr span[style="font-size:12px; color:#5f221c;"] b', el)
            .text()
            .indexOf('/') + 2
        )
        .replace('㎡', '')
      // console.log(area)
      return area
    },
    img($, el) {
      const img = $(
        'tbody tr img[src^="https://s3-ap-northeast-1.amazonaws.com/rincglobal/kyoto/estate/"]',
        el
      )
        .attr('src')
        .replace('top', 'ORIG')
      // console.log(img)
      return img
    },
    location($, el) {
      const loc = $(
        'tbody tr td[width=265px] span[style="font-size:13px; color:#4d4d4d;"]',
        el
      ).text()
      // console.log(loc)
      return loc
    },
  },
}
