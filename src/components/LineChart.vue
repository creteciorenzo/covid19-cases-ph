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
      deathsRecovered: [],
      dateVal: [],
      dtStr: [],
      dailyCase: []
    };
  },
  async mounted() {
    this.covidCases = await API.getSummaryCase();
    this.deathsRecovered = await API.getDthRcvr();
    this.chartData();
    this.dtFormat();
    this.fillData();
    this.getDeathCount();
  },

  methods: {
    fillData() {
      var ctx = document.getElementById("lineChart");
      this.chartdata = new Chart(ctx, {
        options: {
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
              label: "Daily Confirmed Case",
              backgroundColor: "#0092a4a1",
              borderColor: "lightblue",
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
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
      const categories = uniqueDt.slice(Math.max(uniqueDt.length - 10, 1));
      this.dateVal = categories;
      var count = [];
      dtCombine.forEach(i => {
        const ctgryIndx = categories.indexOf(i);

        //count the duplicate data
        count[ctgryIndx] = (count[ctgryIndx] || 0) + 1;
      });
      this.dailyCase = count;
    },
    getDeathCount() {
      var obj = [];
      var dod = [];
      const dateCase = this.covidCases.map(d => d.date);
      const status = this.covidCases.map(s => s.status);

      // let x = status.filter((element, index) => {
      //   return index % 2 === 0;
      // });
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