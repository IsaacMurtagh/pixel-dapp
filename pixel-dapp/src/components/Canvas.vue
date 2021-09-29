<template>
  <div>
    <div
      class="row"
      v-for="(row, y) in canvasMatrix"
      :key="`row=${y}`"
    >
      <div
        class="box"
        v-for="(pixel, x) in row"
        :key="`row-${y}-col-${x}`"
        :class="!pixel.hasOwner ? 'clickable': ''"
        :style="`background-color: #${pixel.hexColor};`"
        @click="buyTile(pixel)"
      />
    </div>
  </div>
</template>
<script>

export default {
  props: {
    canvasMatrix: { type: Array, required: true },
    canvasClient: { type: Object, required: true },
    selectedColor: { type: String, required: true },
  },

  computed: {
    colorAsDecimal() {
      return parseInt(this.selectedColor.slice(1), 16)
    }
  },

  methods: {
    async buyTile(pixel) {
      const { x, y } = pixel;
      if (pixel.hasOwner) {
        console.log(`Owner of pixel ${x},${y}: ${pixel.owner}`);
        return;
      }
      const result = await this.canvasClient.buyPixel({ x, y, color: this.colorAsDecimal});
      console.log(result);
    },

    changeColor(element, el2) {
      console.log(element, el2);
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
  opacity: 70%;
}
</style>