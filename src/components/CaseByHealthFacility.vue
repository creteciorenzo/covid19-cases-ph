<template>
  <div>
    <q-table
      :data="summary"
      title="Cases By Health Facility"
      :columns="columns"
      row-key="name"
      class="case-table"
    ></q-table>
  </div>
</template>

<script>
import API from "../API";
export default {
  async mounted() {
    this.summary = await API.getFacilities();
  },

  data() {
    return {
      summary: [],
      columns: [
        {
          name: "facility",
          label: "FACILITY",
          field: "facility",
          align: "left",
          sortable: true
        },
        {
          name: "casesCount",
          label: "CONFIRMED",
          align: "left",
          field: "confirmed_cases"
        },
        {
          name: "puiCount",
          label: "PUIs",
          align: "left",
          field: "puis"
        },
        {
          name: "region",
          label: "REGION",
          align: "left",
          field: "region"
        }
      ],
      facilityCount: []
    };
  },
  methods: {},
  computed: {}
};
</script>

<style>
.case-table {
  background-color: #072028;
  color: #e6e6e6;
}
</style>