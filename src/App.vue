<template>
  <v-app>
    <Navbar />
    <v-main class="my-10">
      <v-container fluid>
        <v-row>
          <v-col>
            <CameraPreview @picture-taken="receivePicture($event)" />
          </v-col>
          <v-col>
            <SnapShots :imgSrc="imgSrc" @clear-pictures="clearPictures()" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import CameraPreview from './components/CameraPreview.vue'
import SnapShots from './components/SnapShots.vue'
import Footer from './components/Footer.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'App',
  components: {
    Navbar,
    CameraPreview,
    SnapShots,
    Footer,
  },
  data() {
    return {
      imgSrc: [],
    }
  },
  methods: {
    receivePicture($event) {
      this.imgSrc.push({
        id: uuidv4(),
        url: $event,
      })
    },
    clearPictures() {
      this.imgSrc = []
    },
  },
}
</script>
