<template>
  <div
    class="flex flex-col h-full p-8 bg-gray-100 rounded-lg items dark:bg-gray-700"
  >
    <Heading2> Thermometer </Heading2>

    <div class="flex flex-col flex-grow">
      <bi:thermometer v-show="!isActive" height="10em" width="5em" />
      <bi:thermometer-low
        v-show="isActive && temperature < 10"
        height="10em"
        width="5em"
      />
      <bi:thermometer-half
        v-show="isActive && temperature >= 10 && temperature < 20"
        height="10em"
        width="5em"
      />
      <bi:thermometer-high
        v-show="isActive && temperature >= 20"
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
        <div class="col-span-2">
          <p class="flex-grow text-base leading-relaxed dark:text-gray-300">
            Reading: {{ temperature }}°C
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "Thermometer",
  props: {
    title: { type: String, required: true },
    text: { type: String, required: true },
    url: { type: String, required: true },
  },
  data() {
    return {
      isActive: false,
      temperature: 15,
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
  },
});
</script>

<style scoped></style>
