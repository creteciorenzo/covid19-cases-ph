<template>
  <div>
    <q-table title="Cases By Health Facility" :columns="columns" row-key="name" class="case-table">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat class="tbl-btn" @click="infoDialog(props)" icon="info" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import API from "../API";
export default {
  async mounted() {
    this.summary = await API.getSummaryCase();
    this.getFacility();
  },
  data() {
    return {
      summary: [],
      columns: [
        {
          name: "facility",
          label: "Facility",
          field: "hospital_admitted_to",
          align: "left",
          sortable: true
        },
        {
          name: "patientCount",
          label: "Count",
          field: "patientCount"
        }
      ],
      facilityCount: []
    };
  },
  methods: {
    getFacility() {
      var obj = {
        facility: null,
        count: null
      };
      var count = [];
      const hospital = this.summary.map(f => f.hospital_admitted_to).flat(1);
      const unqHospital = [...new Set(hospital)];
      hospital.forEach(element => {
        const index = unqHospital.indexOf(element);
        count[index] = (count[index] || 0) + 1;
      });

      console.log(unqHospital);
      console.log(count);
    }
  },
  computed: {}
};
</script>