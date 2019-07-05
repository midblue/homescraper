<template>
  <div class="listing">
    <a target="_blank" :href="listing.url">
      <div class="image" :style="{'background-image': `url(${listing.img})`}" />
    </a>
    <a target="_blank" :href="mapLink">
      <div class="image map" :style="{'background-image': `url(${mapImageURL})`}"></div>
    </a>
    <div class="details">
      <a target="_blank" :href="listing.url">
        <h2>{{listing.title}}</h2>
      </a>
      <p>
        <span class="price">{{listing.price}}</span>
        ・ {{listing.area}}{{/^([0-9.])*$/g.exec(listing.area) ?'㎡' : ''}}
      </p>
      <p>
        <a target="_blank" :href="mapLink">{{listing.location}}</a>
      </p>
      <p class="sub">
        Found on {{new Date(listing.firstSeen).toLocaleDateString()}} on
        <a
          target="_blank"
          :href="listing.sourceURL"
        >{{listing.source}}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: { listing: {} },
  data() {
    return {
      ak: require('../../../gmapsApiKey.json').key,
    }
  },
  computed: {
    sanitizedLocation() {
      return this.listing.location.replace(/\s*/g, '')
    },
    mapImageURL() {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${this.sanitizedLocation}&zoom=13&size=350x350&markers=${this.sanitizedLocation}&key=${this.ak}`
    },
    mapLink() {
      return `https://www.google.com/maps/search/${this.sanitizedLocation}`
    },
  },
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: inherit;
}

.listing {
  display: grid;
  grid-template-columns: 33% 33% 34%;
  padding: 0px;
  margin: 30px 0;
  background: white;
  position: relative;
  box-shadow: 0 5px 10px rgba(black, 0.2);
}

.image {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
}

.details {
  padding: 20px;
  min-height: 200px;
  word-wrap: break-word;

  .price {
    color: green;
  }
}
</style>
