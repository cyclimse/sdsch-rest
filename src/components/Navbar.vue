<template>
  <header class="text-gray-600 body-font dark:bg-gray-800">
    <div
      class="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row"
    >
      <form @submit.prevent="() => {}" class="m-4 flex">
        <input
          class="rounded-l-lg p-4 text-gray-800 bg-gray-100 dark:bg-gray-700"
          type="url"
          v-model="url"
          placeholder="http://127.0.0.1:5005"
        />
        <button
          v-on:click="router.push({ path: '/', query: { ctrl: url } })"
          class="px-8 rounded-r-lg bg-yellow-400 font-bold p-4 uppercase"
        >
          Set
        </button>
      </form>
      <nav
        class="flex flex-wrap items-center justify-center t ext-base md:ml-auto"
      >
        <RouterLink
          v-for="(route, index) in routes"
          :key="index"
          class="mr-5 font-semibold cursor-pointer"
          :class="{
            'text-green-500 hover:green-500 dark:text-green-500 dark:hover:text-green-500 underline':
              route.name === currentRoute,
            'hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200':
              route.name != currentRoute,
          }"
          :to="{ name: route.name }"
        >
          {{ route.name }}
        </RouterLink>
        <a
          href="https://github.com/cyclimse/sdsch-rest"
          target="_blank"
          class="flex items-center justify-center mr-2 text-black w-9 h-9 dark:text-white"
        >
          <MdiGithub />
        </a>
        <button
          @click="toggle"
          class="flex items-center justify-center w-9 h-9 focus:outline-none"
        >
          <MdiWhiteBalanceSunny class="text-yellow-500" v-if="isDark" />
          <MdiMoonWaningCrescent class="text-gray-800" v-else />
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue-demi";
import { routes } from "@/router";
import { default as router } from "@/router";
import { useDark, useToggle } from "@vueuse/core";

export default defineComponent({
  setup: (_, ctx) => {
    // Import config from .evn
    const appName = import.meta.env.VITE_APP_NAME;

    const availableRoutes = routes.filter((route) => route.name != "NotFound");
    const currentRoute = computed(() => ctx.root.$route.name);

    const isDark = useDark();
    const toggle = useToggle(isDark);

    return {
      appName,
      routes: availableRoutes,
      currentRoute,
      toggle,
      isDark,
      router: router,
    };
  },
  data() {
    return {
      url: "",
    };
  },
});
</script>