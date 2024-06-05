<template>
  <div id="app">
    <nav>
      <router-link to="/">Main page</router-link>
      <br>
      <router-link :to="`/add/`">Add post</router-link>
      <br>
      <router-link :to="`/login/`">login</router-link>
      <br>
      <router-link :to="`/profile/`">Profile</router-link>
      <br>
      <router-link :to="`/upost/`">upost</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>