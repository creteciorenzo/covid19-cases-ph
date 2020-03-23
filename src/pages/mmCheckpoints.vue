<template>
  <div>
    <div class="row">
      <div class="col">
        <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 400px; width: 600px"
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
      </div>
      <q-dialog v-model="isOpen">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Close icon</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

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