<template>
  <div id="nav">
    <router-link to="/"> Home </router-link> |
    <router-link to="about"> About </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: lightsteelblue;
  font-family: "Poppins", sans-serif;
}

.header-container {
  text-align: center;
  color: #2c305d;
  letter-spacing: 0.08em;
  font-size: 1.5em;
}
</style>