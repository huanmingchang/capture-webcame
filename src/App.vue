<template>
  <v-app>
    <Navbar />
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
}
</script>
