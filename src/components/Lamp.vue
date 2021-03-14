<template>
  <div
    class="flex flex-col h-full p-8 bg-gray-100 rounded-lg items dark:bg-gray-700"
  >
    <Heading2> Single lamp </Heading2>

    <div class="flex flex-col flex-grow">
      <bi:lightbulb
        :style="cssVars"
        :class="{ pulse: isActive }"
        height="10em"
        width="5em"
      />
      <div class="grid grid-cols-3 gap-4">
        <div>
          <button
            :class="[isActive ? 'bg-yellow-400' : 'bg-gray-200']"
            class="p-2 rounded"
            @click="toggle"
          >
            {{ isActive ? "ON" : "OFF" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import axios from "axios";

export default defineComponent({
  name: "Lamp",
  props: {
    url: { type: String, required: true },
  },
  data() {
    return {
      isActive: false,
      color: "white",
      intensity: 100,
      frequency: 60.0 / 3.0,
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    async request() {
      try {
        const resp = await axios.get(this.url + "/lamp", {
          headers: { From: "Lamp" },
        });
        this.color = resp.data.color;
        this.intensity = 2000 / Math.min(Math.max(resp.data.intensity, 0), 100);
        this.frequency = resp.data.frequency;
      } catch (err) {
        // Handle Error Here
        this.color = "white";
      }
    },
  },
  computed: {
    cssVars: function () {
      return {
        "--glow-color": this.color,
        "--max-intensity": this.intensity + "px",
        "--min-intensity": 0.1 * this.intensity + "px",
        "--duration": 60 / this.frequency + "s",
      };
    },
  },
  created: function () {
    /* eslint-disable @typescript-eslint/no-this-alias */
    let self = this;
    setInterval(function () {
      if (self.isActive) {
        self.request();
      }
    }, 1000);
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
