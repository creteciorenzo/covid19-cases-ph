<template>
  <div>
    <div class="q-pa-md">
      <div class="row justify-center">
        <q-card
          class="col-md-5 spacing"
          flat
          bordered
          style="min-width: 300px; background-color: #072028"
        >
          <q-card-section>
            <byHealthFacility />
          </q-card-section>
        </q-card>
        <q-card class="col-md-5 spacing">
          <l-map :zoom="zoom" :center="center" :options="mapOptions" style="height: 75vh;">
            <l-tile-layer :url="urlMap" />
            <l-marker
              v-for="(f, i) in summary"
              :key="i"
              @click="openDialog(f)"
              :lat-lng="setLatLng(f.latitude, f.longitude)"
            >
              <l-icon :icon-size="iconSize" :icon-url="icon" />
            </l-marker>
          </l-map>
          <q-dialog v-model="isOpen">
            <q-card class="dlg">
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup style="float: right" />
              <q-card-section class="row items-center q-pb-none">
                <q-list>
                  <q-item>
                    <q-form>
                      <label
                        style="text-tranform: uppercase;padding-right: 10px"
                        class="text-h6 text-weight-regular"
                      >Facility:</label>
                      <span class="text-weight-light text-subtitle1">{{dialogData.facility}}</span>
                    </q-form>
                  </q-item>
                  <q-item>
                    <q-form>
                      <label
                        style="text-tranform: uppercase;padding-right: 10px"
                        class="text-h6 text-weight-regular"
                      >PUIs:</label>
                      <span class="text-weight-light text-subtitle1">{{dialogData.puis}}</span>
                    </q-form>
                  </q-item>
                  <q-item>
                    <q-form>
                      <label
                        style="text-tranform: uppercase;padding-right: 10px"
                        class="text-h6 text-weight-regular"
                      >Confirmed Cases:</label>
                      <span class="text-weight-light text-subtitle1">{{dialogData.confirmed_cases}}</span>
                    </q-form>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-card>
      </div>
    </div>
    <ft />
  </div>
</template>

<script>
import axios from "axios";
import byHealthFacility from "../components/CaseByHealthFacility.vue";
import ft from "../components/Footer";
import "leaflet/dist/leaflet.css";
import API from "../API";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LTooltip,
  LCircle,
  LPolygon,
  LCircleMarker
} from "vue2-leaflet";
export default {
  components: {
    byHealthFacility,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    LTooltip,
    LCircle,
    LPolygon,
    LCircleMarker,
    ft
  },
  data() {
    return {
      summary: [],
      isOpen: false,
      zoom: 5,
      center: [12.8797, 121.774],
      mapOptions: {
        zoomSnap: 0.5
      },
      urlMap: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      icon: require("src/assets/marker.png"),
      iconSize: [16, 16],
      circle: {
        radius: 4,
        color: "#0092a4"
      },
      dialogData: []
    };
  },
  methods: {
    setLatLng(lat, lng) {
      return L.latLng(lat, lng);
    },
    openDialog(f) {
      this.isOpen = true;
      this.dialogData = f;
    }
  },
  async mounted() {
    this.summary = await API.getFacilities();
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }
};
</script>

<style>
.dlg {
  background-color: #0092a4;
  color: #e6e6e6;
}

.spacing {
  margin: 1em;
  width: 100%;
}
</style>