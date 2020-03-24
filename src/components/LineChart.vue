<template>
  <div class="container">
    <line-chart :chartData="chartdata" :options="chartOptions" />
    <!-- <div>{{xAxis}}</div> -->
  </div>
</template>

<script>
import LineChart from "./chart.js";
import axios from "axios";
import moment from "moment";
export default {
  name: "LineChartContainer",
  components: { LineChart },
  data() {
    return {
      chartdata: null,
      loaded: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      covidCases: [],
      dateVal: [],
      dtStr: []
    };
  },
  async mounted() {
    await axios
      .get("https://coronavirus-ph-api.now.sh/cases")
      .then(res => {
        let result = res.data;
        this.covidCases = result;
      })
      .catch(e => {
        console.log(e);
      });
    this.chartData();
    this.dtFormat();
    this.fillData();
  },

  methods: {
    fillData() {
      this.chartdata = {
        labels: this.dtStr,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(75,192,192,0.4)",
            data: [65, 59, 80, 34]
          }
        ]
      };
    },
    chartData() {
      const dtCombine = this.covidCases.map(a => a.date).flat(1);
      const uniqueDt = [...new Set(dtCombine)];
      const categories = uniqueDt.slice(Math.max(uniqueDt.length - 10, 1));
      this.dateVal = categories;
      var count = 0;
      dtCombine.forEach(element => {
        const ctgryIndx = categories.indexOf(element);
      });
    },
    dtFormat() {
      for (let i = 0; i < this.dateVal.length; i++) {
        this.dtStr.push(moment(this.dateVal[i]).format("MMM DD YYYY"));
      }
    }
  },
  computed: {}
};
</script>