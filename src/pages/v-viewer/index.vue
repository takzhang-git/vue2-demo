<template>
  <div>
    <!-- directive -->
    <div class="images" v-viewer>
      <img v-for="src in images" :key="src" :src="src">
    </div>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src">
    </viewer>
    <!-- api -->
    <button type="button" @click="show">Click to show</button>
  </div>
</template>
<script>
import { api as viewerApi } from 'v-viewer';
  export default {
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          // "https://picsum.photos/300/200",
          // "https://picsum.photos/250/200"
        ]
      };
    },
    methods: {
      show() {
        // this.$viewerApi({
        //   images: this.images,
        // })
        viewerApi({
          images: this.images,
        });
      },
    },
  }
</script>
