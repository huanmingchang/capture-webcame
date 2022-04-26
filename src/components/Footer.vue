<template>
  <v-footer dark padless>
    <v-card-text class="py-2 white--text text-center">
      {{ new Date().getFullYear() }} — <strong>&copy; Anson</strong>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
