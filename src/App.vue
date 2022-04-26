<template>
  <v-app>
    <Navbar />
    <v-main class="mt-10">
      <v-container fluid>
        <v-row>
          <v-col>
            <CameraPreview @picture-taken="receivePicture($event)" />
          </v-col>
          <v-col> <SnapShots /> </v-col>
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
      this.imgSrc.push($event)
    },
  },
}
</script>
