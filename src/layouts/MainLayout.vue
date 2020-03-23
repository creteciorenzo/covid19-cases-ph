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

        <q-btn class="tb-btn" flat round dense icon="more_vert" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="aside">
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section class="text-h6 text-weight-thin">Metro Manila Checkpoints</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section class="text-h6 text-weight-thin">PH LGU Lockdown</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
.aside {
  background-color: #072028;
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
</style>
<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Github",
          caption: "github.com/quasarframework",
          icon: "code",
          link: "https://github.com/quasarframework"
        },
        {
          title: "Discord Chat Channel",
          caption: "chat.quasar.dev",
          icon: "chat",
          link: "https://chat.quasar.dev"
        },
        {
          title: "Forum",
          caption: "forum.quasar.dev",
          icon: "record_voice_over",
          link: "https://forum.quasar.dev"
        },
        {
          title: "Twitter",
          caption: "@quasarframework",
          icon: "rss_feed",
          link: "https://twitter.quasar.dev"
        },
        {
          title: "Facebook",
          caption: "@QuasarFramework",
          icon: "public",
          link: "https://facebook.quasar.dev"
        }
      ]
    };
  }
};
</script>
