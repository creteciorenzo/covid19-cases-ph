<template>
  <bar-chart
    :label="['Total']"
    :colors="['#0092a4']"
    :data="[
        ['1-17', ageGroup1to17.length],
        ['18-30', ageGroup18to30.length],
        ['31-45', ageGroup31to45.length],
        ['46-60', ageGroup46to60.length],
        ['60+', ageGroup60plus.length]
    ]"
  ></bar-chart>
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
    ageGroup1to17() {
      return this.summary.filter(a => a.age < 18);
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