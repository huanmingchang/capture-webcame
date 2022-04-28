<template>
  <v-card>
    <v-card-title>Camera Preview</v-card-title>
    <div>
      <v-btn
        color="cyan darken-3"
        text
        v-if="cameraIsOpen"
        @click="stopCapture"
      >
        Close Camera</v-btn
      >
      <v-btn
        color="cyan darken-3"
        text
        v-if="!cameraIsOpen"
        @click="startCapture"
      >
        Open Camera</v-btn
      >
    </div>
    <v-card-text class="preview rounded">
      <div v-if="!cameraIsOpen" class="mx-auto text-center">
        Camera unavailable now
      </div>
      <video
        ref="video"
        v-show="cameraIsOpen"
        @canplay="initCanvas()"
        class="video mx-auto"
      >
        Camera unavailable now
      </video>
      <canvas v-show="showCanvas" ref="canvas" class="canvas mx-auto" />
    </v-card-text>
    <v-card-actions class="actions d-flex flex-row">
      <v-text-field
        label="Text"
        hide-details="auto"
        class="mr-16"
        color="blue-grey darken-2"
        v-model="text"
        @input="updatedText"
        :disabled="!cameraIsOpen"
      ></v-text-field>
      <v-btn
        color="blue-grey darken-2"
        text
        :disabled="!cameraIsOpen"
        @click="showCanvas = !showCanvas"
      >
        {{ !showCanvas ? 'Add Text' : 'Hide Text' }}</v-btn
      >
      <v-btn
        color="cyan darken-3"
        text
        @click="takePicture"
        :disabled="!cameraIsOpen"
      >
        Take picture
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CameraPreview',
  data() {
    return {
      video: null,
      canvas: null,
      text: '',
      cameraIsOpen: false,
      showCanvas: false,
    }
  },
  mounted() {
    this.video = this.$refs.video
    this.canvas = this.$refs.canvas
  },
  watch: {
    text: {
      handler: function () {
        this.updatedText()
      },
    },
  },
  methods: {
    // 開啟視訊鏡頭
    startCapture() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.video.srcObject = stream
          this.video.play()
          this.cameraIsOpen = true
        })
        .catch((error) => {
          console.log(error)
          alert(
            'There is something wrong with camera. Please try again later. '
          )
        })
    },

    // 關閉視訊鏡頭
    stopCapture() {
      let tracks = this.$refs.video.srcObject.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
      this.cameraIsOpen = false
    },

    // 設定 canvas 尺寸
    initCanvas() {
      this.canvas.setAttribute('width', this.video.videoWidth)
      this.canvas.setAttribute('height', this.video.videoHeight)
    },

    // 截圖
    takePicture() {
      let context = this.canvas.getContext('2d')
      context.drawImage(
        this.video,
        0,
        0,
        this.video.videoWidth,
        this.video.videoHeight
      )

      if (this.showCanvas) {
        context.textAlign = 'center'
        context.font = '60px Roboto'
        context.fillStyle = '#4CAF'
        context.fillText(this.text, 250, 420)
        this.$emit('picture-taken', this.canvas.toDataURL('image/png'))
      } else {
        this.$emit('picture-taken', this.canvas.toDataURL('image/png'))
      }

      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.text = ''
    },

    // 根據輸入的文字內容更新在畫面上
    updatedText() {
      let context = this.canvas.getContext('2d')
      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      context.textAlign = 'center'
      context.font = '60px Roboto'
      context.fillStyle = '#4CAF'
      context.fillText(this.text, 250, 420)
    },
  },
}
</script>

<style lang="scss" scoped>
.preview {
  position: relative;
  border: 1px solid #455a64;
  margin: 0 auto;
  height: 500px;
  width: 97%;
}

.video {
  position: relative;
  width: 100%;
  height: 100%;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.actions {
  margin: 0 auto;
  height: 70px;
  width: 97%;
}
</style>
