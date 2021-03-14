<template>
  <section class="container px-5 py-12 mx-auto text-gray-600 body-font">
    <div class="flex flex-col w-full mb-8 text-center">
      <Heading1> Appliances </Heading1>
      <p class="dark:text-gray-300">Blabla qui donne explications</p>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="w-full py-4 pr-4 xs:pl-4 md:w-1/2 lg:w-1/4">
        <Thermometer :url="this.url" />
      </div>
      <div class="w-full py-4 pr-4 xs:pl-4 md:w-1/2 lg:w-1/4">
        <Lamp :url="this.url" />
      </div>
      <div class="w-full py-4 pr-4 xs:pl-4 md:w-1/2 lg:w-1/4">
        <Leds :url="this.url" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "Features",
  data() {
    return {
      url: "http://127.0.0.1:5005",
    };
  },
  watch: {
    $route(to, from) {
      this.url = to.query.ctrl;
    },
  },
});
</script>