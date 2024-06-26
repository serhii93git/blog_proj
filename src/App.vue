<template>
  <div id="app">
    <nav>
      <div class="main">
        <router-link to="/">Головна сторінка</router-link>
      </div>
      <div class="main">
      <router-link v-if="isAuthenticated" :to="`/add/`">Додати пост</router-link>
      </div>
      <div class="main">
      <router-link v-if="isAuthenticated" :to="`/profile/`">Твій профіль</router-link>
      </div>
      <div class="main">
      <router-link v-if="isAuthenticated" :to="`/upost/`">Твої пости</router-link>
      </div>
      <div class="main">
        <div v-if="!isAuthenticated" class="auth-links">
          <router-link :to="`/login/`">Авторизуйся</router-link>
          <router-link :to="`/register/`">Зареєструйся</router-link>
        </div>
      </div>
      <div class="main">
        <button v-if="isAuthenticated" @click="logout">Вихід</button>
      </div>
      
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AuthService from '../src/services/AuthService'; // імпортуємо AuthService

export default {  
  name: 'App',
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      this.isAuthenticated = AuthService.isAuthenticated();
    },
    logout() {
      AuthService.logout();
      this.isAuthenticated = false;
      window.location.href = '/login'; 
    }
  }
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

nav a, nav button {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  transition: transform 0.3s, background-color 0.3s, color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none; 
  cursor: pointer; 
}

nav a:hover, nav button:hover {
  background-color: #007bff;
  color: #fff;
  transform: translateY(-5px);
}

nav a.router-link-exact-active {
  background-color: #0056b3;
  color: #fff;
}

.main {
  display: flex;
  justify-content: space-around; /* Вирівнює по центру всередині батьківського контейнера */
  align-items: center; /* Вирівнює елементи по вертикалі по центру */
  
}

.auth-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }
  
  nav a, nav button {
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
