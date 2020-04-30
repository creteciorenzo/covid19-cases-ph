<template>
  <pie-chart
    :donut="true"
    :suffix="['%']"
    :colors="['#ff7aad','#0170bf']"
    :data="[
      ['Female', femaleCase],
      ['Male', maleCase],
    ]"
  ></pie-chart>
</template>

<script>
import API from "../API";
export default {
  async mounted() {
    this.summary = await API.getSummaryCase();
  },
  data() {
    return {
      summary: []
    };
  },
  computed: {
    femaleCase() {
      var filter = this.summary.data.filter(c => c.sex === "F");
      return Math.round((100 * filter.length) / this.summary.data.length);
    },
    maleCase() {
      var filter = this.summary.data.filter(c => c.sex === "M");
      return Math.round((100 * filter.length) / this.summary.data.length);
    },
    tba() {
      var filter = this.summary.data.filter(t => t.sex === "TBA");
      return Math.round((100 * filter.length) / this.summary.data.length);
    }
  }
};
</script>