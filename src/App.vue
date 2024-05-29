<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <br>
      <router-link to="/post">Post Detail</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>