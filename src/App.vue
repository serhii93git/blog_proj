<template>
  <div id="app">
    <nav>
      <router-link to="/">Main page</router-link>
      <router-link :to="`/add/`">Add post</router-link>
      <router-link :to="`/profile/`">Author Profile</router-link>
      <router-link :to="`/upost/`">Author Posts</router-link>
      <router-link :to="`/login/`">Login</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {  
  name: 'App'
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: space-around;
  background-color: #007bff;
  padding: 15px 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: #0056b3;
  color: #fff;
  border-radius: 5px;
}

nav a.router-link-exact-active {
  background-color: #0056b3;
  color: #fff;
  border-radius: 5px;
}
</style>
