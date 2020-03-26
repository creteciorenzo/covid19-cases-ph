<template>
  <div class="main-bg">
    <div class="q-pa-md" style="height: calc(50vh-50px)">
      <div class="grid-1" style="padding-top:1em ">
        <div class="row-1 case-count">
          <div class="text-h6 text-center fnt-wdth">New Cases</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">{{phCases.todayCases}}</div>
        </div>
        <div class="row-1 case-count">
          <div class="text-h6 text-center fnt-wdth">New Deaths</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">{{phCases.todayDeaths}}</div>
        </div>
        <div class="row-1 case-count">
          <div class="text-h6 text-center fnt-wdth">Serious Cases</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">{{phCases.critical}}</div>
        </div>
        <div class="row-2 case-count">
          <div class="text-h6 text-center fnt-wdth">Total Cases</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">{{phCases.cases}}</div>
        </div>
        <div class="row-2 case-count">
          <div class="text-h6 text-center fnt-wdth">Death Rate</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">
            {{getFatalityRate}}%
            <span
              class="text-h6 text-center fnt-wdth text-weight-thin"
            >({{phCases.deaths}})</span>
          </div>
        </div>
        <div class="row-2 case-count">
          <div class="text-h6 text-center fnt-wdth">Recovery Rate</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">
            {{getRecoveryRate}}%
            <span
              class="text-h6 text-center fnt-wdth text-weight-thin"
            >({{phCases.recovered}})</span>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row justify-around">
        <q-card class="chart-card col-md-5" style="margin:1em 0; min-width: 300px">
          <q-card-section>
            <div class="text-h6">Confirmed Cases Daily</div>
          </q-card-section>
          <q-card-section>
            <lineChart />
          </q-card-section>
        </q-card>
        <q-card class="chart-card col-md-5" style="margin:1em 0; min-width: 300px">
          <q-card-section>
            <div class="text-h6">Patient Status Count</div>
          </q-card-section>
          <q-card-section>
            <columnChart />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="row justify-around">
        <q-card flat bordered class="col-md-5 chart-card" style="margin:1em 0; min-width: 300px">
          <q-card-section>
            <div class="text-h6">Cases by Age Group</div>
          </q-card-section>
          <q-card-section>
            <barChart />
          </q-card-section>
        </q-card>

        <q-card flat bordered class="col-md-5 chart-card" style="margin:1em 0; min-width: 300px">
          <q-card-section>
            <div class="text-h6">Cases by Gender</div>
          </q-card-section>
          <q-card-section>
            <pieChart />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row justify-center">
        <q-card flat bordered class="col-md-11 chart-card" style="margin:1em 0; min-width: 300px">
          <q-card-section>
            <summaryCases />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <ft />
  </div>
</template>

<style>
.main-bg {
  background-image: linear-gradient(to bottom, #072028, #0092a4);
}

.grid-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.canvas {
  max-height: 200px;
}

.dlg {
  background-color: #0092a4;
  color: #e6e6e6;
}

.chart-card {
  background-color: #072028;
  color: #e6e6e6;
}

.tbl-btn {
  color: #04c3db;
}

.case-count {
  color: #04c3db;
  padding: 1em 0;
}

@media screen and (max-width: 30rem) {
  .dlg-title {
    font-size: 6vw;
  }

  .fnt-wdth {
    font-size: 4vw;
  }
}
@media only screen and (max-width: 48rem) {
  .grid-1 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<script>
import axios from "axios";
import lineChart from "src/components/DailyReport.vue";
import columnChart from "src/components/PatientStatus";
import barChart from "src/components/CaseByAgeGroup";
import pieChart from "src/components/CaseByGender";
import ft from "src/components/Footer";
import summaryCases from "src/components/SummaryCase";
import API from "../API";
export default {
  components: {
    lineChart,
    columnChart,
    barChart,
    pieChart,
    ft,
    summaryCases
  },
  beforeDestroy() {},
  async mounted() {
    this.phCases = await API.phCases();
    this.summary = await API.getSummaryCase();
    this.getCases();
    this.testResult = await API.getTestResults();
  },

  methods: {
    getCases() {
      let date = [];
      for (let i = 0; i < this.summary.length; i++) {
        let dt = this.summary[i].date;
        date.push(dt);
      }
      this.dates = date;
      this.data = this.dates;
    }
  },
  data() {
    return {
      age1to17: null,
      age18to30: null,
      age31to45: null,
      age45to60: null,
      age60: null,
      phCases: [],
      summary: [],
      testResult: [],

      genderF: "",
      genderM: "",

      dataCollection: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    diedStatus() {
      return this.summary.filter(s => s.status === "Died");
    },
    recoveredStatus() {
      return this.summary.filter(s => s.status === "Recovered");
    },
    admittedStatus() {
      return this.summary.filter(s => s.status === "Admitted");
    },
    getFatalityRate() {
      return Math.round((this.phCases.deaths * 100) / this.phCases.cases);
    },
    getRecoveryRate() {
      return Math.round((this.phCases.recovered * 100) / this.phCases.cases);
    }
  }
};
</script>