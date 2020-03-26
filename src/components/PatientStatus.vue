<template>
  <column-chart :dataset="chartData" :data="data" :colors="['lightblue']"></column-chart>
</template>

<script>
import API from "../API";
export default {
  async mounted() {
    this.summary = await API.getSummaryCase();
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        backgroundColor: "#0092a4a1",
        borderWidth: 2
      };
      this.data = [
        ["Recovered", this.recoveryCount.length],
        ["Died", this.deathCount.length],
        ["Admitted", this.admittedCount.length]
      ];
    }
  },
  data() {
    return {
      summary: [],
      chartData: null,
      data: null
    };
  },
  computed: {
    deathCount() {
      return this.summary.filter(d => d.status === "Died");
    },
    recoveryCount() {
      return this.summary.filter(d => d.status === "Recovered");
    },
    admittedCount() {
      return this.summary.filter(d => d.status === "Admitted");
    }
  }
};
</script>