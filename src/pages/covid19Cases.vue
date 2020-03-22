<template>
  <div>
    <q-toolbar class="text-primary bg-grey-3">
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>PH Covid-19 Cases</q-toolbar-title>
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
    <div class="row justify-center">
      <q-card
        flat
        bordered
        style="margin: 1em; min-width: 200px"
        class="col-md-3 bg-blue-14 text-white"
      >
        <q-card-section>
          <div class="text-h6 text-center">Total Cases</div>
          <div class="text-h6 text-center text-weight-bold">{{summary.length}}</div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        style="margin: 1em; min-width: 200px"
        class="col-md-3 bg-red-14 text-white"
      >
        <q-card-section>
          <div class="text-h6 text-center">Confirmed Cases</div>
          <div class="text-h6 text-center text-weight-bold">{{testResult.confirmed_cases}}</div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        style="margin: 1em; min-width: 200px"
        class="bg-teal-14 text-white col-md-3"
      >
        <q-card-section>
          <div class="text-h6 text-center">Negative Cases</div>
          <div class="text-h6 text-center text-weight-bold">{{testResult.cases_tested_negative}}</div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        style="margin: 1em; min-width: 200px"
        class="bg-amber-14 text-white col-md-3"
      >
        <q-card-section>
          <div class="text-h6 text-center">Pending Cases</div>
          <div
            class="text-h6 text-center text-weight-bold"
          >{{testResult.cases_pending_test_results}}</div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md">
      <q-table
        title="Summary Cases"
        :data="summary"
        :columns="columns"
        color="primary"
        row-key="name"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="primary" @click="infoDialog(props)" icon="info"></q-btn>
          </q-td>
        </template>
      </q-table>

      <q-dialog v-model="fullHeight" full-height>
        <q-card class="column full-height scroll" style="width: 700px">
          <q-card-section class="row justify-between">
            <div class="text-h4">Patient Information</div>
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

    <div class="row justify-around">
      <q-card flat bordered class="col-md-5" style="margin:1em 0; min-width: 300px">
        <q-card-section>
          <column-chart
            :data="[
      ['Confirmed cases', testResult.confirmed_cases],
      ['Negative cases', testResult.cases_tested_negative],
      ['Pending cases', testResult.cases_pending_test_results]
    ]"
          ></column-chart>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="col-md-5" style="margin:1em 0; min-width: 300px">
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
</template>

<style lang="stylus"></style>

<script>
import axios from "axios";
export default {
  beforeDestroy() {
    // this.fetchCases.destroy();
    // this.fetchTestResult.destroy();
  },
  mounted() {
    this.fetchCases();
    this.fetchTestResult();
  },

  methods: {
    fetchCases() {
      axios
        .get("https://coronavirus-ph-api.now.sh/cases")
        .then(response => {
          this.summary = response.data;
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
    infoDialog(p) {
      this.fullHeight = true;
      this.caseInfo = p.row;
    }
  },
  data() {
    return {
      covidSrvc: null,
      summary: [],
      testResult: [],
      caseInfo: [],
      fullHeight: false,
      overall: null,
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
      ]
    };
  },
  computed: {
    femaleCase() {
      return this.summary.filter(c => c.gender === "F");
    },
    maleCase() {
      return this.summary.filter(c => c.gender === "M");
    }
  }
};
</script>