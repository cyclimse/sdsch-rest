<template>
  <section class="container px-5 py-12 mx-auto text-gray-600 body-font">
    <div class="flex flex-col w-full mb-8 text-center">
      <Heading1> Appliances </Heading1>
      <p class="dark:text-gray-300">Blabla qui donne explications</p>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="w-full py-4 pr-4 xs:pl-4 md:w-1/2 lg:w-1/4">
        <Thermometer
          title="vite-plugin-vue2"
          text="Vue 2 support for Vite"
          url="https://github.com/underfin/vite-plugin-vue2"
        />
      </div>
      <div class="w-full py-4 pr-4 xs:pl-4 md:w-1/2 lg:w-1/4">
        <Lamp
          title="vite-plugin-vue2"
          text="Vue 2 support for Vite"
          url="https://github.com/underfin/vite-plugin-vue2"
        />
      </div>
    </div>
  </section>
</template>
