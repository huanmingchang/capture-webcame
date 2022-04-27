<template>
  <v-card>
    <v-card-title>SnapShots</v-card-title>
    <div>
      <v-btn color="cyan darken-3" text> Delete</v-btn>
      <v-btn color="cyan darken-3" text @click="clearPictures"> Clear</v-btn>
    </div>
    <v-card-text class="snapshot rounded">
      <div v-if="!images.length" class="mx-auto text-center">
        Try to take some pictures.
      </div>
      <div v-if="images.length" class="image-container mx-auto">
        <v-row class="image mx-auto overflow-y-auto">
          <v-col
            v-for="img in images"
            :key="img"
            class="img-container col-xs-12 col-sm-12 col-md-12 col-lg-6 my-4"
          >
            <img :src="img" class="img" />
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions class="actions d-flex flex-row justify-end">
      <v-btn color="blue-grey darken-2" text> Download</v-btn>
      <v-btn color="cyan darken-3" text> Upload </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SnapShots',
  props: {
    imgSrc: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      images: [],
    }
  },
  methods: {
    fetchImages() {
      this.images = this.imgSrc
    },
    clearPictures() {
      this.images = []
      this.$emit('clear-pictures')
    },
  },
  created() {
    this.fetchImages()
  },
  watch: {
    imgSrc: {
      handler: function (newValue) {
        this.images = newValue
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.snapshot {
  border: 1px solid #455a64;
  margin: 0 auto;
  height: 500px;
  width: 97%;
}

.actions {
  margin: 0 auto;
  height: 70px;
  width: 97%;
}

.image-container {
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
}

.img-container {
  width: 50%;
}

.img {
  max-width: 100%;
  max-height: 100%;
}
</style>
