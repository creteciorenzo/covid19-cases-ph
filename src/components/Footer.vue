<template>
  <div class="row justify-center ft" style="height: 100px;">
    <div class="col-md-10 text-center" style="padding-top: 2em;">
      <p>
        &copy; {{year}}
        <a
          class="ig-link"
          href="https://www.instagram.com/xromanticgarbage/"
          target="_blank"
        >RENZO R. CRETECIO</a>.
      </p>
    </div>
  </div>
</template>

<style>
.ft {
  background-color: #072028;
  color: #e6e6e6;
}
.ig-link {
  list-style: none;
  text-decoration: none;
  color: #1c1d24;
}
.ig-link {
  color: #04c3db;
}
.ig-link:hover {
  text-decoration: underline;
}
</style>
<script>
export default {
  mounted() {
    this.today = new Date();
    this.year = this.today.getFullYear();
  },
  data() {
    return {
      today: null,
      year: null
    };
  }
};
</script>