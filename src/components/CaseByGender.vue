<template>
  <pie-chart
    :donut="true"
    :suffix="['%']"
    :colors="['#ff7aad','#0170bf']"
    :data="[
      ['Female', femaleCase],
      ['Male', maleCase]
    ]"
  ></pie-chart>
</template>

<script>
import API from "../API";
export default {
  async mounted() {
    this.phCases = await API.phCases();
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
      return Math.round((100 * filter.length) / this.phCases.cases);
    },
    maleCase() {
      var filter = this.summary.filter(c => c.gender === "M");
      return Math.round((100 * filter.length) / this.phCases.cases);
    }
  }
};
</script>