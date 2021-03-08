<template>
  <div
    class="flex flex-col h-full p-8 bg-gray-100 rounded-lg items dark:bg-gray-700"
  >
    <Heading2> Colored lamp </Heading2>

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

export default defineComponent({
  name: "Lamp",
  props: {
    title: { type: String, required: true },
    text: { type: String, required: true },
    url: { type: String, required: true },
  },
  data() {
    return {
      isActive: false,
      color: "blue",
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    cssVars: function () {
      return { "--glow-color": this.color };
    },
  },
});
</script>

<style scoped>
@keyframes pulse {
  from {
    filter: drop-shadow(0px 0px 50px var(--glow-color));
  }
  50% {
    filter: drop-shadow(0px 0px 15px var(--glow-color));
  }
  to {
    filter: drop-shadow(0px 0px 50px var(--glow-color));
  }
}

.pulse {
  animation-name: pulse;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}
</style>
