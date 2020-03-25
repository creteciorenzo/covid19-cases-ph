<template>
  <chartist ratio="ct-major-second" type="Line" :data="chartData" :options="chartOptions"></chartist>
</template>

<script>
import Chartist from "vue-chartist";
export default {
  components: { chartist: Chartist },

  data() {
    return {
      chartData: {
        labels: ["A", "B", "C"],
        series: [
          [1, 3, 2],
          [4, 6, 5]
        ]
      },
      chartOptions: {
        lineSmooth: false
      }
    };
  }
};
</script>