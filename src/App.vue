<template>
  <div class="h-full" id="app">
    <Navbar />
    <main class="md:flex">
      <div class="w-full md:w-2/3"><RouterView /></div>
      <div class="w-full md:w-1/3"><Console /></div>
    </main>
  </div>
</template>

<style>
main {
  padding-top: 164px;
  margin-top: -164px;
}
</style>
