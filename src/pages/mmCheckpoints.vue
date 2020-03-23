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
        </l-map>
      </div>
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
  LTooltip
} from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    LTooltip
  },
  mounted() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.fetchCheckpoints();
  },
  methods: {
    fetchCheckpoints() {
      axios
        .get("https://coronavirus-ph-api.now.sh/mm-checkpoints")
        .then(response => {
          this.checkPoints = response;
        });
    }
  },
  data() {
    return {
      checkPoints: [],
      zoom: 11,
      center: [14.6091, 121.0223],
      mapOptions: {
        zoomSnap: 0.5
      }
    };
  }
};
</script>