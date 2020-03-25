<template>
  <div>
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col-md-10">
          <div class="chart-card">
            <line-chart :chartData="chartdata" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./chart.js";
import axios from "axios";
import moment from "moment";
import API from "../API";
export default {
  name: "LineChartContainer",
  components: { LineChart },
  data() {
    return {
      chartdata: null,
      loaded: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          yAxes: [
            {
              id: "dailyCaseAxis",
              gridLines: {
                display: true,
                color: "#728d8b"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "#728d8b"
              }
            }
          ]
        }
      },
      covidCases: [],
      dateVal: [],
      dtStr: [],
      dailyCase: []
    };
  },
  async mounted() {
    this.covidCases = await API.getSummaryCase();

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
            yAxisID: "dailyCaseAxis",
            label: "Daily Confirmed Case",
            backgroundColor: "#0092a4a1",
            borderColor: "lightblue",
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            showLine: true,
            lineTension: 0,
            data: this.dailyCase
          }
        ]
      };
    },

    chartData() {
      const dtCombine = this.covidCases.map(a => a.date).flat(1);
      const uniqueDt = [...new Set(dtCombine)];
      const categories = uniqueDt.slice(Math.max(uniqueDt.length - 10, 1));
      this.dateVal = categories;
      var count = [];
      dtCombine.forEach(i => {
        const ctgryIndx = categories.indexOf(i);
        count[ctgryIndx] = (count[ctgryIndx] || 0) + 1;
      });
      this.dailyCase = count;

      this.dailyCase = count;
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