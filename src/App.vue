<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col> <ScreenPreview /> </v-col>
          <v-col> <v-card>right side</v-card> </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import ScreenPreview from './components/ScreenPreview.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    ScreenPreview,
    Footer,
  },
}
</script>
