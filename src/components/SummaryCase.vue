<template>
  <div>
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
          <q-btn dense round flat class="tbl-btn" @click="infoDialog(props)" icon="info" />
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
                <label style="padding-right: 10px" class="text-h6 text-weight-regular">Nationality:</label>
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
</template>

<style>
.case-table,
.chart-card {
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
import API from "../API";
export default {
  async mounted() {
    this.summary = await API.getSummaryCase();
  },
  methods: {
    infoDialog(p) {
      this.fullHeight = true;
      this.caseInfo = p.row;
    }
  },
  data() {
    return {
      summary: [],
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
      fullHeight: false,
      caseInfo: []
    };
  }
};
</script>