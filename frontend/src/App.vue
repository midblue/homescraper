<template>
  <div id="app">
    <div class="content">
      <h1>Latest listings</h1>
      <Listing v-for="listing in sortedListings" :listing="listing" />
    </div>
  </div>
</template>

<script>
import Listing from './components/Listing'
export default {
  components: { Listing },
  data() {
    return {
      listings: [],
      isInitialLoad: true,
    }
  },
  computed: {
    sortedListings() {
      return this.listings.sort((a, b) => a.firstSeen - b.firstSeen)
    },
  },
  created() {
    this.updateListings()
    setInterval(this.updateListings, 1000 * 60 * 60) // 1hr
  },
  methods: {
    updateListings() {
      fetch('http://0.0.0.0:4000/api')
        .then(res => res.json())
        .then(data => {
          const newListings = []
          for (let newListing of data)
            if (!this.listings.find(l => l.title === newListing.title))
              newListings.push(newListing)
          this.listings.push(...newListings)
          if (newListings.length > 0 && !this.isInitialLoad)
            alert(`Found ${newListings.length} new listings!`)
          this.isInitialLoad = false
        })
    },
  },
}
</script>

<style lang="scss">
html,
body {
  font-family: 'Gotham', 'sans-serif';
  margin: 0;
  background: #f6f6f6;
  color: #333;
  font-weight: 500;
}

* {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4 {
  font-weight: 500;
}

.content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 50px;
}

h1 {
  margin-bottom: 100px;
}

.sub {
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>
