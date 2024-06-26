<template>
  <div id="app">
    <nav>
      <router-link to="/">Main page</router-link>
      <router-link :to="`/add/`">Add post</router-link>
      <router-link :to="`/profile/`">Author Profile</router-link>
      <router-link :to="`/upost/`">Author Posts</router-link>
      <router-link :to="`/login/`">Login</router-link>
      <router-link :to="`/register/`">Register</router-link>
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
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 800px;
}

nav a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  transition: transform 0.3s, background-color 0.3s, color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

nav a:hover {
  background-color: #007bff;
  color: #fff;
  transform: translateY(-5px);
}

nav a.router-link-exact-active {
  background-color: #0056b3;
  color: #fff;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }
  
  nav a {
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
