<template>
  <div>
    <div
      class="row"
      v-for="(row, i) in canvasMatrix"
      :key="`row=${i}`"
    >
      <div
        class="box"
        v-for="(element, x) in row"
        :key="`row-${i}-element-${x}`"
        :style="`background-color: #${decimalToHexColor(element)};`"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    canvasMatrix: { type: Array, required: true}
  },

  methods: {
    decimalToHexColor(number) {
      return ('00000' + number.toString(16)).slice(-6);
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
</style>