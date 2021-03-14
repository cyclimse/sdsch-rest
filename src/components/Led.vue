<template>
  <mdi:led-outline
    :style="cssVars"
    :class="{ pulse: isActive }"
    height="2em"
    width="2em"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "Led",
  props: {
    isActive: { type: Boolean, default: false },
    color: { type: String, default: "white" },
    intensity: { type: Number, default: 100 },
    frequency: { type: Number, default: 60 / 3.0 },
  },
  computed: {
    cssVars: function () {
      const myintensity = 1000 / Math.min(Math.max(this.intensity, 0), 100);
      return {
        "--glow-color": this.color,
        "--max-intensity": myintensity + "px",
        "--min-intensity": 0.2 * myintensity + "px",
        "--duration": 60 / this.frequency + "s",
      };
    },
  },
});
</script>

<style scoped>
@keyframes pulse {
  from {
    filter: drop-shadow(0px 0px var(--max-intensity) var(--glow-color));
  }
  50% {
    filter: drop-shadow(0px 0px var(--min-intensity) var(--glow-color));
  }
  to {
    filter: drop-shadow(0px 0px var(--max-intensity) var(--glow-color));
  }
}

.pulse {
  animation-name: pulse;
  animation-duration: var(--duration);
  animation-iteration-count: infinite;
}
</style>
