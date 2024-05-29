<template>
  <div id="app">
    <nav>
      <router-link to="/">Main page</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>