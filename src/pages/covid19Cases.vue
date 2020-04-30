<template>
  <div class="main-bg">
    <div class="q-pa-md" style="height: calc(50vh-50px)">
      <div class="row justify-center">
        <div class="col-md-11">
          <q-card style="background-color: #072028; text-align: center">
            <q-card-section class="text-h4 case-title show" style="color: #e6e6e6">As of {{today}}</q-card-section>
            <q-card-section>
              <div class="row justify-center">
                <div class="col-md-11">
                  <div class="row justify-center">
                    <div class="case-count">
                      <q-card class="case-card" style="border-left: 1em #ff5a1f solid">
                        <q-card-section>
                          <div class="text-h6 text-center fnt-wdth">New Cases</div>
                          <div
                            class="text-h4 text-center fnt-wdth text-weight-thin"
                          >{{phCases.todayCases}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="case-count">
                      <q-card class="case-card" style="border-left: 1em #f05252 solid">
                        <q-card-section>
                          <div class="text-h6 text-center fnt-wdth">New Deaths</div>
                          <div
                            class="text-h4 text-center fnt-wdth text-weight-thin"
                          >{{phCases.todayDeaths}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="case-count">
                      <q-card class="case-card" style="border-left: 1em #607d8b solid">
                        <q-card-section>
                          <div class="text-h6 text-center fnt-wdth">Serious Cases</div>
                          <div
                            class="text-h4 text-center fnt-wdth text-weight-thin"
                          >{{phCases.critical}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="case-count">
                      <q-card class="case-card" style="border-left: 1em #3949ab solid">
                        <q-card-section>
                          <div class="text-h6 text-center fnt-wdth">Total Cases</div>
                          <div
                            class="text-h4 text-center fnt-wdth text-weight-thin"
                          >{{phCases.cases}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="case-count">
                      <q-card class="case-card" style="border-left: 1em #d50000 solid">
                        <q-card-section>
                          <div class="text-h6 text-center fnt-wdth">Deaths</div>
                          <div
                            class="text-h4 text-center fnt-wdth text-weight-thin"
                          >{{phCases.deaths}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="case-count">
                      <q-card class="case-card" style="border-left: 1em #00c853 solid">
                        <q-card-section>
                          <div class="text-h6 text-center fnt-wdth">Recoveries</div>
                          <div
                            class="text-h4 text-center fnt-wdth text-weight-thin"
                          >{{phCases.recovered}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
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
            <div class="text-h6">Patient Health Status Count</div>
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
        <q-card class="col-md-11" flat bordered style="min-width: 300px; background-color: #072028">
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
  padding-top: 1.5em;
  background-color: #072028;
  width: 90%;
  margin: auto;
  border-radius: 8px;
}

.row-1 {
  width: 300px;
  margin: 0 auto;
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
  color: #072028;
  padding: 1em 0;
  margin: 0 auto;
}
.case-card {
  background-color: #e6e6e6;
  width: 300px;
}
.show {
  display: none;
}
@media screen and (max-width: 30rem) {
  .fnt-wdth {
    font-size: 6vw;
  }
  .show {
    display: block;
    font-size: 6vw;
  }
}
@media only screen and (max-width: 48rem) {
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
import byHealthFacility from "src/components/CaseByHealthFacility";
import API from "../API";
import moment from "moment";
import Axios from "axios";
export default {
  components: {
    lineChart,
    columnChart,
    barChart,
    pieChart,
    ft,
    summaryCases,
    byHealthFacility
  },
  beforeDestroy() {},
  async mounted() {
    this.phCases = await API.phCases();
    this.summary = await API.getSummaryCase();
    // this.testResult = await API.getTestResults();
    this.date = new Date();
    this.today = moment(this.date).format("MMM DD, YYYY");
  },

  methods: {},
  data() {
    return {
      age1to17: null,
      age18to30: null,
      age31to45: null,
      age45to60: null,
      age60: null,

      date: null,
      today: null,

      phCases: [],
      summary: [],
      testResult: [],

      genderF: "",
      genderM: "",

      deathCount: null,
      recoveredCount: null,

      dataCollection: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {}
};
</script>