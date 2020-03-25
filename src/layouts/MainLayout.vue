<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-primary tb">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="tb-btn"
        />

        <q-toolbar-title class="bt-title">
          <span>PH</span> Covid-19 Cases
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="aside">
      <q-list>
        <router-link class="link" to="/">
          <q-item clickable v-ripple>
            <q-item-section class="text-h6 text-weight-thin">Covid-19 Data</q-item-section>
          </q-item>
        </router-link>
        <router-link class="link" to="/checkpoints">
          <q-item clickable v-ripple>
            <q-item-section class="text-h6 text-weight-thin">Metro Manila Checkpoints</q-item-section>
          </q-item>
        </router-link>
        <q-item clickable v-ripple>
          <q-item-section class="text-h6 text-weight-thin">PH LGU Lockdown List</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
.aside {
  background-color: #072028;
  color: #e6e6e6;
}

.link {
  text-decoration: none;
  color: #e6e6e6;
}

.tb {
  background-color: #072028;
}

.bt-title {
  color: #e6e6e6;
}

.bt-title span {
  color: #04c3db;
}

.tb-btn {
  color: #e6e6e6;
}

.bg {
  background-image: linear-gradient(to bottom, #072028, #0092a4);
  margin: 0;
  padding: 0;
}
</style>
<script>
import moment from "moment";
export default {
  name: "MainLayout",

  components: {},
  mounted() {
    this.today = new Date();
  },

  data() {
    return {
      leftDrawerOpen: false,
      today: null
    };
  },
  methods: {},
  computed: {}
};
</script>
