<template>
  <div
    class="flex flex-col h-full p-8 bg-gray-100 rounded-lg items dark:bg-gray-700"
  >
    <Heading2> Multiple leds </Heading2>

    <div class="flex flex-row flex-grow flex-wrap">
      <div v-for="(state, index) in states" :key="index" class="mt-4 fle">
        <Led
          :isActive="isActive"
          :color="state.color"
          :intensity="state.intensity"
          :frequency="state.frequency"
        />
      </div>
    </div>
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
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import axios from "axios";

export default defineComponent({
  name: "Leds",
  props: {
    url: { type: String, required: true },
  },
  data() {
    return {
      isActive: false,
      states: Array(12).fill({
        color: "blue",
        intensity: 100,
        frequency: 60.0 / 3.0,
      }),
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    async request() {
      for (var [index, state] of this.states.entries()) {
        try {
          const resp = await axios.get(this.url + "/leds/" + index, {
            headers: { From: "Leds " + index },
          });
          this.states[index] = {
            color: resp.data.color,
            intensity: resp.data.intensity,
            frequency: resp.data.frequency,
          };
        } catch (err) {
          // Handle Error Here
        }
      }
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