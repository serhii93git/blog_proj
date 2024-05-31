<template>
  <div>
    <div v-if="isAuthenticated">
      <p>Логінований як: {{ currentUser }}</p>
      <button @click="logout">Вийти</button>
    </div>
    <div v-else>
      <h2>Логін</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Користувач:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="password">Пароль:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      currentUser: null
    };
  },
  computed: {
    isAuthenticated() {
      return AuthService.isAuthenticated();
    }
  },
  methods: {
    login() {
      AuthService.login({ username: this.username, password: this.password })
        .then(user => {
          this.currentUser = user;
          this.$router.push('/');  // Перенаправлення після успішного входу
        })
        .catch(error => {
          console.error('Помилка авторизації:', error);
          alert('Невірний логін або пароль');
        });
    },
    logout() {
      AuthService.logout();
      this.currentUser = null;
      this.$router.push('/');  // Перенаправлення після виходу
    }
  },
  created() {
    this.currentUser = AuthService.getCurrentUser();
  }
};
</script>
