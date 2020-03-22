<template>
  <div>
    <q-list bordered>
      <q-item v-for="(c, i) in summary" :key="i">
        <q-item-section>{{c.case_no}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="stylus"></style>

<script>
import axios from "axios";
export default {
  beforeDestroy() {
    this.fetchCases.destroy();
    this.covidSrvc.destroy();
  },
  mounted() {
    // this.covidSrvc = this.$dbCon.wingsService("cases");
    // this.covidSrvc
    //   .on("dataChange", sumCases => {
    //     this.summary = sumCases;
    //     console.log(sumCases);
    //   })
    //   .init();
    this.fetchCases();
  },

  methods: {
    fetchCases() {
      axios
        .get("https://coronavirus-ph-api.now.sh/cases")
        .then(response => {
          this.summary = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  data() {
    return {
      covidSrvc: null,
      summary: []
    };
  }
};
</script>