<template>
  <div
    class="flex flex-col h-full p-8 bg-gray-100 rounded-lg items dark:bg-gray-700"
  >
    <Heading2> Multiple leds </Heading2>

    <div class="flex flex-row flex-grow flex-wrap p-4">
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
      <button
        :class="[isActive ? 'bg-yellow-400' : 'bg-gray-200']"
        class="p-2 rounded"
        @click="toggle"
      >
        {{ isActive ? "ON" : "OFF" }}
      </button>
      <div>
        <input
          v-model="groupedRequest"
          type="checkbox"
          name="toggle"
          id="toggle"
          class="toggle-checkbox block p-3 w-6 h-6 bg-white border-4"
        />
        <label for="toggle" class="text-xs text-gray-700">Toggle me!</label>
      </div>
      <div>
        <button
          class="p-2 rounded-full bg-yellow-400 font-bold w-10 h-10"
          @click="createRequest"
        >
          +
        </button>
        <button
          class="p-2 rounded-full bg-yellow-400 font-bold w-10 h-10"
          @click="deleteRequest"
        >
          -
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import axios from "axios";

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export default defineComponent({
  name: "Leds",
  props: {
    url: { type: String, required: true },
  },
  data() {
    return {
      isActive: false,
      groupedRequest: false,
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
      if (this.groupedRequest) {
        try {
          const resp = await axios.get(this.url + "/leds/", {
            headers: { From: "Leds" },
          });
          for (var [index, state] of this.states.entries()) {
            this.states[index] = {
              color: resp.data[index].color,
              intensity: resp.data[index].intensity,
              frequency: resp.data[index].frequency,
            };
          }
        } catch (err) {
          // Handle Error Here
        }
      } else {
        for (var [index, state] of this.states.entries()) {
          try {
            const resp = await axios.get(this.url + "/leds/" + index, {
              headers: { From: "Led " + index },
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
      }
    },
    async createRequest() {
      let newLed = {
        color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
        intensity: generateRandomInteger(20, 100),
        frequency: 60 / generateRandomInteger(2, 6),
      };
      const index = this.states.length;
      this.states.push(newLed);
      try {
        const resp = await axios.put(this.url + "/leds/" + index, newLed, {
          headers: { From: "Led " + index },
        });
      } catch (err) {
        // Handle Error Here
      }
    },
    async deleteRequest() {
      this.states.pop();
      const index = this.states.length;
      try {
        const resp = await axios.put(
          this.url + "/leds/" + index,
          {},
          {
            headers: { From: "Led " + index },
          }
        );
      } catch (err) {
        // Handle Error Here
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

<style>
</style>