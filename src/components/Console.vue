<template>
  <div class="h-full p-8">
    <div
      class="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-gray-800 pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
      ref="terminal"
    >
      <div class="top mb-2 flex">
        <div class="h-3 w-3 bg-red-500 rounded-full"></div>
        <div class="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
        <div class="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
      </div>
      <div v-for="(request, index) in requests" :key="index" class="mt-4 fle">
        <span class="text-green-400">computer:~$</span>
        <p class="flex-1 typing items-center pl-2">
          {{ request.method }} to {{ request.url }} with {{ request.data }}
          <br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue-demi";
import axios from "axios";

export default defineComponent({
  name: "Console",
  props: {
    title: { type: String },
  },
  data() {
    return {
      requests: [],
    };
  },
  methods: {
    log(config) {
      // Do something before request is sent
      console.log(config);
      let { url, method, data } = config;
      if (this.$refs.terminal.scrollHeight > this.$refs.terminal.clientHeight) {
        this.requests = [];
      }
      this.requests.push({ url: url, method: method, data: data });
      return config;
    },
  },
  mounted: function () {
    /* eslint-disable @typescript-eslint/no-this-alias */
    let self = this;
    // Add a request interceptor
    axios.interceptors.request.use(self.log, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  },
});
</script>

<style>
.coding {
  min-height: 70vh;
  max-height: 70vh;
  width: auto;
  height: auto;
}
</style>
