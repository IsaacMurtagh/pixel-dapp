<template>
  <div>
    <div
      class="row"
      v-for="(row, y) in canvasMatrix"
      :key="`row=${y}`"
    >
      <div
        class="box clickable"
        v-for="(pixel, x) in row"
        :key="`row-${y}-col-${x}`"
        :style="`background-color: #${pixel.hexColor};`"
        @click="buyTile(x, y)"
      />
    </div>
  </div>
</template>
<script>
import Canvas from '../contracts/Canvas.js';

export default {
  props: {
    canvasMatrix: { type: Array, required: true}
  },

  data() {
    return {
      canvasClient: null,
    }
  },

  async created() {
    this.canvasClient = await Canvas.getClient();
  },

  methods: {
    async buyTile(x, y) {
      const result = await this.canvasClient.buyPixel({ x, y, color: 2781728});
      console.log(result);
    }
  }
}
</script>
<style scoped>
.row {
  display: flex;
  height: 2rem;
}
.box {
  width: 2rem;
  height: 2rem;
  border: 1px;
  border-color: lightgray;
  border-style: solid;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  cursor: pointer;
  opacity: 70%;
}
</style>