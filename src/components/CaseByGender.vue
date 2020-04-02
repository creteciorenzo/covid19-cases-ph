<template>
  <pie-chart
    :donut="true"
    :suffix="['%']"
    :colors="['#ff7aad','#0170bf', 'grey']"
    :data="[
      ['Female', femaleCase],
      ['Male', maleCase],
      ['TBA', tba]
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
      phCases: [],
      summary: []
    };
  },
  computed: {
    femaleCase() {
      var filter = this.summary.filter(c => c.gender === "F");
      return Math.round((100 * filter.length) / this.summary.length);
    },
    maleCase() {
      var filter = this.summary.filter(c => c.gender === "M");
      return Math.round((100 * filter.length) / this.summary.length);
    },
    tba() {
      var filter = this.summary.filter(t => t.gender === "TBA");
      return Math.round((100 * filter.length) / this.summary.length);
    }
  }
};
</script>