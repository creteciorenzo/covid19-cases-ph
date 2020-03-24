<template>
  <div class="bg">
    <div class="q-pa-md row justify-center">
      <div class="col-md-8">
        <div
          style="color: #e6e6e6; margin-bottom: 1em"
          class="text-h5 text-center"
        >Metro Manila Community Quarantine Checkpoints</div>
      </div>
      <div class="col-md-12">
        <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 500px; min-width: 320px"
        >
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <l-marker
            v-for="(c, i) in checkPoints"
            :key="i"
            :lat-lng="setLatLng(c.lat, c.lng)"
            @click="openDialog(c)"
          >
            <l-icon :icon-size="[20, 20]" :icon-url="icon" />
          </l-marker>
        </l-map>
        <div class="text-subtitle text-grey-13">
          <span style="text-transform: italic;">Tip:</span>Click the marker to see the Checkpoint Info
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
  </div>
</template>
<style>
.bg {
  background-image: linear-gradient(to bottom, #072028, #0092a4);
  margin: 0;
  padding: 0;
  height: 100vh;
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
  LPolygon
} from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    LTooltip,
    LCircle,
    LPolygon
  },
  mounted() {
    this.fetchCheckpoints();
  },
  methods: {
    fetchCheckpoints() {
      axios
        .get("https://coronavirus-ph-api.now.sh/mm-checkpoints")
        .then(response => {
          this.checkPoints = response.data;
        });
    },
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
      isOpen: false,
      ccData: []
    };
  }
};
</script>