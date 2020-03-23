<template>
  <div class="main-bg">
    <div class="q-pa-md row justify-center" style="padding-top:1em ">
      <div class="col-md-4">
        <q-card flat bordered style="margin: 0.5em; max-width: 300px" class="case-count-today">
          <q-card-section>
            <div class="text-h6 text-center">New Confirmed Cases</div>
            <div class="text-h6 text-center text-weight-bold">{{casesToday.todayCases}}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card flat bordered style="margin: 0.5em; max-width: 300px" class="case-count-today">
          <q-card-section>
            <div class="text-h6 text-center">New Confirmed Deaths</div>
            <div class="text-h6 text-center text-weight-bold">{{casesToday.todayDeaths}}</div>
          </q-card-section>
        </q-card>
      </div>
      <!-- <div class="col-md-10">
        <line-chart :chart-data="datacollection" style="height: 250px"></line-chart>
      </div>-->
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
    <div class="q-pa-md row justify-center" style="padding-top:1em ">
      <q-card
        flat
        bordered
        style="margin: 0.5em; min-width: 200px"
        class="col-md-3 col-lg-2 case-count"
      >
        <q-card-section>
          <div class="text-h6 text-center">Confirmed Cases</div>
          <div class="text-h6 text-center text-weight-thin">{{casesToday.cases}}</div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        style="margin: 0.5em; min-width: 200px"
        class="col-md-3 col-lg-2 case-count"
      >
        <q-card-section>
          <div class="text-h6 text-center">Death Rate</div>
          <div class="text-h6 text-center text-weight-thin">
            {{getFatalityRate}}%
            <span
              class="text-h6 text-center text-weight-thin"
            >({{diedStatus.length}})</span>
          </div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        style="margin: 0.5em; min-width: 200px"
        class="col-md-3 col-lg-2 case-count"
      >
        <q-card-section>
          <div class="text-h6 text-center">Recovery Rate</div>
          <div class="text-h6 text-center text-weight-thin">
            {{getRecoveryRate}}%
            <span
              class="text-h6 text-center text-weight-thin"
            >({{recoveredStatus.length}})</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
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

.case-count-today {
  background-color: #eb4034;
  color: #e6e6e6;
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
  background-color: #0092a4;
  color: #e6e6e6;
  box-shadow: 0 20px 30px 0 #ffffff;
  min-width: 300px;
}

.ft {
  background-color: #072028;
  color: #e6e6e6;
}

@media screen and (max-width: 30rem) {
  .dlg-title {
    font-size: 6vw;
  }
}
</style>

<script>
import axios from "axios";
import LineChart from "./chart.js";
export default {
  components: {
    LineChart
  },
  beforeDestroy() {
    // this.fetchCases.destroy();
    // this.fetchTestResult.destroy();
  },
  mounted() {
    this.fetchCases();
    this.fetchTestResult();
    this.fetchTodayCases();
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.fillData();
  },

  methods: {
    fetchCases() {
      axios
        .get("https://coronavirus-ph-api.now.sh/cases")
        .then(response => {
          this.summary = response.data;
          let result = response.data;
          let date = [];
          for (let i = 0; i < result.length; i++) {
            let dt = result[i].date;
            date.push(dt);
          }
          this.dates = date;
          this.data = this.dates;
        })
        .catch(e => {
          console.log(e);
        });
    },
    fetchTestResult() {
      axios
        .get("https://coronavirus-ph-api.now.sh/test-results")
        .then(response => {
          this.testResult = response.data;
        });
    },

    fetchTodayCases() {
      axios
        .get("https://coronavirus-19-api.herokuapp.com/countries/Philippines")
        .then(response => {
          this.casesToday = response.data;
        });
    },
    infoDialog(p) {
      this.fullHeight = true;
      this.caseInfo = p.row;
    },
    fillData() {
      this.datacollection = {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [65, 59, 80, 34]
          }
        ]
      };
    }
  },
  data() {
    return {
      summary: [],
      testResult: [],
      caseInfo: [],
      casesToday: [],
      fullHeight: false,
      overall: null,
      today: null,
      year: null,
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
      dataCollection: null
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
      var result = (this.diedStatus.length * 100) / this.summary.length;
      return result.toFixed(2);
    },
    getRecoveryRate() {
      var result = (this.recoveredStatus.length * 100) / this.summary.length;
      return result.toFixed(2);
    }
  }
};
</script>