<template>
  <div class="echarts" ref="echarts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.drow()
  },
  methods: {
    drow() {
      const echart = echarts.init(this.$refs.echarts)
      echart.setOption(this.options, true)
    }
  }
}
</script>

<style></style>
