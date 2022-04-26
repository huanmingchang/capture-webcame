<template>
  <v-card>
    <v-card-title>SnapShots</v-card-title>
    <v-card-text class="snapshot rounded"></v-card-text>
    <v-card-actions class="actions d-flex flex-row justify-end">
      <v-btn color="blue-grey darken-2" text> Download</v-btn>
      <v-btn color="cyan darken-3" text> Upload </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SnapShots',
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
</style>
