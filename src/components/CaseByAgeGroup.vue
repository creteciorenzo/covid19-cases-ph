<template>
  <bar-chart :label="['Total']" :colors="['lightblue']" :dataset="chartData" :data="data"></bar-chart>
</template>

<script>
import API from "../API";
export default {
  async mounted() {
    this.summary = await API.getSummaryCase();
    this.fillData();
  },
  data() {
    return {
      summary: [],
      chartData: null,
      data: null
    };
  },
  methods: {
    fillData() {
      this.chartData = {
        backgroundColor: "#0092a4a1",
        borderWidth: 2
      };
      this.data = [
        ["1-17", this.ageGroup1to17.length],
        ["18-30", this.ageGroup18to30.length],
        ["31-45", this.ageGroup31to45.length],
        ["46-60", this.ageGroup46to60.length],
        ["60+", this.ageGroup60plus.length]
      ];
    }
  },
  computed: {
    ageGroup1to17() {
      return this.summary.filter(a => a.age >= 1 && a.age <= 17);
    },
    ageGroup18to30() {
      return this.summary.filter(a => a.age >= 18 && a.age <= 30);
    },
    ageGroup31to45() {
      return this.summary.filter(a => a.age >= 31 && a.age <= 45);
    },
    ageGroup46to60() {
      return this.summary.filter(a => a.age >= 46 && a.age < 60);
    },
    ageGroup60plus() {
      return this.summary.filter(a => a.age > 60);
    }
  }
};
</script>