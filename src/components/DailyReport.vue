<template>
  <div class="line-chart">
    <canvas id="lineChart"></canvas>
  </div>
</template>
<style>
.line-chart {
  position: relative;
  margin: auto;
  height: 50vh;
}
</style>
<script>
import axios from "axios";
import moment from "moment";
import API from "../API";
export default {
  data() {
    return {
      chartdata: null,
      covidCases: [],
      phTimeline: [],
      dateVal: [],
      dtStr: [],
      dailyCase: [],
      date: null,
      caseDate: null
    };
  },
  async mounted() {
    this.covidCases = await API.getSummaryCase();
    this.chartData();
    this.dtFormat();
    this.fillData();
    this.date = new Date();
    this.caseDate = moment(this.date).format("YYYY-MM-DD");
  },

  methods: {
    fillData() {
      var ctx = document.getElementById("lineChart").getContext("2d");
      this.chartdata = new Chart(ctx, {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: "bottom"
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: "#728d8b"
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: "#728d8b"
                }
              }
            ]
          }
        },
        type: "line",
        data: {
          labels: this.dtStr,
          datasets: [
            {
              label: "Total Case",
              backgroundColor: "#0092a4a1",
              borderColor: "lightblue",
              borderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
              showLine: true,
              lineTension: 0,
              data: this.dailyCase
            }
          ]
        }
      });
    },

    chartData() {
      const dtCombine = this.covidCases.map(a => a.date).flat(1);
      const uniqueDt = [...new Set(dtCombine)];
      const categories = uniqueDt.slice(Math.max(uniqueDt.length - 15, 1));
      this.dateVal = categories;
      var count = [];
      dtCombine.forEach(i => {
        const ctgryIndx = categories.indexOf(i);
        //count the duplicate data
        count[ctgryIndx] = (count[ctgryIndx] || 0) + 1;
      });
      this.dailyCase = count;
    },

    dtFormat() {
      for (let i = 0; i < this.dateVal.length; i++) {
        // if (this.dateVal[i] === "TBA") {
        //   this.dtStr.push(moment(this.date).format("MMM DD, YYYY"));
        // } else {
        //   this.dtStr.push(moment(this.dateVal[i]).format("MMM DD, YYYY"));
        // }
        this.dtStr.push(moment(this.dateVal[i]).format("MMM DD, YYYY"));
      }
    }
  },

  computed: {}
};
</script>