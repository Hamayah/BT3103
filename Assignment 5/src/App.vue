<template>
  <div id="nav">
    <router-link to="/"> Home </router-link> |
    <router-link to="/about"> About </router-link> |
    <router-link to="/profit"> Profit </router-link>
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
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: lightsteelblue;
  margin: 0;
}

#nav {
  padding-top: 1vw;
}

#nav a {
  color: #2c305d;
  padding: 5px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #2c305d;
  font-weight: bold;
}
</style>