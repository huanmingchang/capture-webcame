<template>
  <v-card>
    <v-card-title>Camera Preview</v-card-title>
    <v-card-text class="preview rounded"></v-card-text>
    <v-card-actions>
      <v-text-field
        label="Text"
        hide-details="auto"
        class="mr-16"
        color="blue-grey darken-2"
      ></v-text-field>
      <v-btn color="blue-grey darken-2" text> Add Text</v-btn>
      <v-btn color="cyan darken-3" text> Take photo </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ScreenPreview',
}
</script>

<style lang="scss" scoped>
.preview {
  border: 1px solid #455a64;
  height: 500px;
}
</style>
