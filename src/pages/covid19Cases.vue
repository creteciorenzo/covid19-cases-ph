<template>
  <div>
    <div class="q-pa-md">
      <div class="grid-1" style="padding-top:1em ">
        <div class="row-1 case-count">
          <div class="text-h6 text-center fnt-wdth">New Confirmed Cases</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">{{phCases.todayCases}}</div>
        </div>
        <div class="row-1 case-count">
          <div class="text-h6 text-center fnt-wdth">New Confirmed Deaths</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">{{phCases.todayDeaths}}</div>
        </div>
        <div class="row-1 case-count">
          <div class="text-h6 text-center fnt-wdth">Serious Cases</div>
          <div class="text-h6 text-center fnt-wdth text-weight-thin">{{phCases.critical}}</div>
        </div>
        <div class="row-2 case-count">
          <div class="text-h6 text-center fnt-wdth">Confirmed Cases</div>
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
            >({{recoveredStatus.length}})</span>
          </div>
        </div>
      </div>
    </div>

    <lineChart />

    <div class="q-pa-md">
      <div class="row justify-around">
        <q-card flat bordered class="col-md-5 chart-card" style="margin:1em 0; min-width: 300px">
          <q-card-section>
            <div class="text-h6">Cases by Age Group</div>
          </q-card-section>
          <q-card-section>
            <bar-chart
              :data="[
        ['1-17', ageGroup1to17.length],
        ['18-30', ageGroup18to30.length],
        ['31-45', ageGroup31to45.length],
        ['46-60', ageGroup46to60.length],
        ['60+', ageGroup60plus.length]
    ]"
            ></bar-chart>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="col-md-5 chart-card" style="margin:1em 0; min-width: 300px">
          <q-card-section>
            <div class="text-h6">Cases by Gender</div>
          </q-card-section>
          <q-card-section>
            <pie-chart
              :donut="true"
              :colors="['#ff7aad','#0170bf']"
              :data="[
      ['Female', femaleCase.length],
      ['Male', maleCase.length]
    ]"
            ></pie-chart>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Summary Cases"
        :data="summary"
        :columns="columns"
        color="primary"
        row-key="name"
        class="case-table"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat class="tbl-btn" @click="infoDialog(props)" icon="info"></q-btn>
          </q-td>
        </template>
      </q-table>

      <q-dialog v-model="fullHeight" full-height>
        <q-card class="column full-height dlg" style="width: 700px;">
          <q-card-section class="row align-center justify-between">
            <div class="text-h4 dlg-title">Patient Information</div>
            <q-btn align="right" dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-card-section>
          <q-card-section class="col q-pt-none">
            <q-list>
              <q-item>
                <q-form class="q-pa-sm">
                  <label style="padding-right: 10px" class="text-h6 text-weight-regular">Case no:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.case_no}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label style="padding-right: 10px" class="text-h6 text-weight-regular">Date:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.date}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label style="padding-right: 10px" class="text-h6 text-weight-regular">Age:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.age}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label style="padding-right: 10px" class="text-h6 text-weight-regular">Gender:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.gender}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label
                    style="padding-right: 10px"
                    class="text-h6 text-weight-regular"
                  >Nationality:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.nationality}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label
                    style="padding-right: 10px"
                    class="text-h6 text-weight-regular"
                  >Hospital admitted:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.hospital_admitted_to}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label
                    style="padding-right: 10px"
                    class="text-h6 text-weight-regular"
                  >Had recent travel history:</label>
                  <span
                    class="text-subtitle1 text-weight-light"
                  >{{caseInfo.had_recent_travel_history_abroad}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label style="padding-right: 10px" class="text-h6 text-weight-regular">Status:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.status}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form class="q-pa-sm">
                  <label
                    style="padding-right: 10px"
                    class="text-h6 text-weight-regular"
                  >Other Information:</label>
                  <span class="text-subtitle1 text-weight-light">{{caseInfo.other_information}}</span>
                </q-form>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div class="row justify-center ft" style="height: 100px;">
      <div class="col-md-10 text-center" style="padding-top: 2em;">
        <p>
          &copy; {{year}}
          <a
            class="ig-link"
            href="https://www.instagram.com/xromanticgarbage/"
            target="_blank"
          >RENZO R. CRETECIO</a>. All Rights Reserve
        </p>
      </div>
    </div>
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

.ig-link {
  list-style: none;
  text-decoration: none;
  color: #1c1d24;
}
.case-table {
  background-color: #072028;
  color: #e6e6e6;
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

.ig-link {
  color: #04c3db;
}
.ig-link:hover {
  text-decoration: underline;
}
.case-count {
  color: #04c3db;
  padding: 1em 0;
}

.ft {
  background-color: #072028;
  color: #e6e6e6;
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
import lineChart from "src/components/LineChart.vue";
import API from "../API";
export default {
  components: {
    lineChart
  },
  beforeDestroy() {},
  async mounted() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.dateToday = this.today.toDateString();
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
    },

    infoDialog(p) {
      this.fullHeight = true;
      this.caseInfo = p.row;
    }
  },
  data() {
    return {
      phCases: [],
      summary: [],
      testResult: [],
      caseInfo: [],
      fullHeight: false,
      today: null,
      year: null,
      dateToday: null,
      columns: [
        {
          name: "caseNo",
          label: "Case no.",
          field: "case_no",
          align: "left",
          sortable: true
        },
        {
          name: "date",
          label: "Date",
          field: "date"
        },
        {
          name: "age",
          label: "Age",
          field: "age"
        },
        {
          name: "gender",
          label: "Gender",
          field: "gender"
        },
        {
          name: "nationality",
          label: "nationality",
          field: "nationality"
        },
        {
          name: "status",
          label: "Status",
          field: "status"
        },
        { name: "actions", label: "More Info", field: "", align: "center" }
      ],
      dataCollection: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    femaleCase() {
      return this.summary.filter(c => c.gender === "F");
    },
    maleCase() {
      return this.summary.filter(c => c.gender === "M");
    },
    diedStatus() {
      return this.summary.filter(s => s.status === "Died");
    },
    recoveredStatus() {
      return this.summary.filter(s => s.status === "Recovered");
    },
    admittedStatus() {
      return this.summary.filter(s => s.status === "Admitted");
    },
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
      return this.summary.filter(a => a.age >= 46 && a.age <= 60);
    },
    ageGroup60plus() {
      return this.summary.filter(a => a.age > 60);
    },
    getFatalityRate() {
      var result = (this.phCases.deaths * 100) / this.phCases.cases;
      return result.toFixed(2);
    },
    getRecoveryRate() {
      var result = (this.phCases.recovered * 100) / this.phCases.cases;
      return result.toFixed(2);
    }
  }
};
</script>