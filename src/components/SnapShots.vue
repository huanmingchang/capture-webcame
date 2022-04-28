<template>
  <v-card>
    <v-card-title>SnapShots</v-card-title>
    <div>
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
            :key="img.id"
            class="img-container col-xs-12 col-sm-12 col-md-12 col-lg-6 my-4"
          >
            <v-checkbox
              color="primary"
              hide-details
              @click="selectImages(img)"
            ></v-checkbox>
            <img :src="img.url" class="img" />
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions class="actions d-flex flex-row justify-end">
      <a
        ref="download"
        @click="downloadImage()"
        :class="{
          disabled: images.length === 0 || selectedImages.length === 0,
        }"
      >
        DOWNLOAD</a
      >
      <v-btn
        color="cyan darken-3"
        text
        :disabled="
          images.length === 0 || selectedImages.length === 0 || isProcessing
        "
        @click="uploadImages"
      >
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable */
import { db } from '../db.js'
import { collection, addDoc } from 'firebase/firestore'

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
      selectedImages: [],
      isProcessing: false,
    }
  },
  methods: {
    fetchImages() {
      this.images = this.imgSrc
    },

    // 清除目前所有的截圖
    clearPictures() {
      this.images = []
      this.selectedImages = []
      this.$emit('clear-pictures')
    },

    // 選取需要的截圖
    selectImages(img) {
      if (this.selectedImages.includes(img)) return

      this.selectedImages.push(img)
    },

    // 下載截圖
    downloadImage() {
      if (this.selectedImages.length === 0) return

      let link = document.createElement('a')
      link.setAttribute('download', 'picture')
      document.body.appendChild(link)
      for (var i = 0; i < this.selectedImages.length; i++) {
        link.setAttribute('href', this.selectedImages[i].url)
        link.click()
      }
      document.body.removeChild(link)
    },

    //上傳截圖到 firebase database
    async uploadImages() {
      try {
        const uploadImages = collection(db, 'uploadImages')

        this.isProcessing = true

        for (let i = 0; i < this.selectedImages.length; i++) {
          const newDoc = await addDoc(uploadImages, this.selectedImages[i])
        }

        alert('Upload successfully')
        this.isProcessing = false
      } catch (error) {
        console.log(error)
        this.isProcessing = false
        alert('There is something wrong. Please try again later')
      }
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

a {
  margin-right: 1rem;
  text-decoration: none;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #00838f !important;
  letter-spacing: 2px !important;
}

.disabled {
  color: rgba(0, 0, 0, 0.26) !important;
  pointer-events: none;
  cursor: default;
}
</style>
