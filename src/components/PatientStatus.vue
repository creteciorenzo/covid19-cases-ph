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
        ["Asymptomatic", this.asymptomaticCount.length],
        ["Severe", this.severeCount.length]
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
      return this.summary.data.filter(d => d.health_status === "Died");
    },
    recoveryCount() {
      return this.summary.data.filter(d => d.health_status === "Recovered");
    },
    asymptomaticCount() {
      return this.summary.data.filter(d => d.health_status === "Asymptomatic");
    },
    severeCount() {
      return this.summary.data.filter(d => d.health_status === "Severe");
    }
  }
};
</script>