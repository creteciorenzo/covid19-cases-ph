<template>
  <div class="main-bg">
    <div class="row justify-center">
      <div class="col-md-8">
        <div
          style="color: #e6e6e6; padding: 1em 0"
          class="text-h5 text-center"
        >Metro Manila Community Quarantine Checkpoints</div>
      </div>
      <div class="col-md-12">
        <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 75vh; min-width: 320px"
        >
          <l-tile-layer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <l-marker
            v-for="(c, i) in checkPoints"
            :key="i"
            @click="openDialog(c)"
            :lat-lng="setLatLng(c.lat, c.lng)"
          >
            <l-icon :icon-size="iconSize" :icon-url="icon" />
          </l-marker>
        </l-map>
        <div class="text-subtitle text-grey-13">
          <span style="text-transform: italic;">Tip:</span>Click the blue marker to see the Checkpoint Info
        </div>
      </div>
      <q-dialog v-model="isOpen">
        <q-card class="dlg">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ccData.city}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-list>
              <q-item>
                <q-form>
                  <label
                    style="text-tranform: uppercase;padding-right: 10px"
                    class="text-h6 text-weight-regular"
                  >District:</label>
                  <span class="text-weight-light text-subtitle1">{{ccData.district}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form>
                  <label
                    style="text-tranform: uppercase;padding-right: 10px"
                    class="text-h6 text-weight-regular"
                  >Location:</label>
                  <span class="text-weight-light text-subtitle1">{{ccData.location}}</span>
                </q-form>
              </q-item>
              <q-item>
                <q-form>
                  <label
                    style="text-tranform: uppercase;padding-right: 10px"
                    class="text-h6 text-weight-regular"
                  >Type:</label>
                  <span class="text-weight-light text-subtitle1">{{ccData.type}}</span>
                </q-form>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <ft />
  </div>
</template>
<style>
.bg {
  background-image: linear-gradient(to bottom, #072028, #0092a4);
  margin: 0;
  padding: 0;
  /* height: 100vh; */
}

.dlg {
  background-color: #0092a4;
  color: #e6e6e6;
}
</style>
<script>
import axios from "axios";
import "leaflet/dist/leaflet.css";
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
import API from "../API";
import ft from "src/components/Footer";
export default {
  components: {
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
  async mounted() {
    this.checkPoints = await API.getCheckpoints();
  },
  methods: {
    setLatLng(lat, lng) {
      return L.latLng(lat, lng);
    },

    openDialog(c) {
      this.isOpen = true;
      this.ccData = c;
    }
  },
  data() {
    return {
      checkPoints: [],
      zoom: 11,
      center: [14.6091, 121.0223],
      mapOptions: {
        zoomSnap: 0.5
      },
      icon: require("src/assets/marker.png"),
      iconSize: [16, 16],
      isOpen: false,
      ccData: [],
      circle: {
        radius: 4,
        color: "#0092a4"
      }
    };
  }
};
</script>