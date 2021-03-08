<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div class="col-span-2"><RouterView /></div>
        <div class="col-span-1"><Console /></div>
      </div>
    </main>
  </div>
</template>
