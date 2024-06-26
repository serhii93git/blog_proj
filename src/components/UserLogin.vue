<template>
  <div>
    <div v-if="isAuthenticated" class="user-info">
      
      <button @click="logout" class="logout-button">Вийти</button>
    </div>
    <div v-else>
      <h2 class="h2">Авторизуйтесь</h2>
      
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Користувач:</label>
          <input type="text" v-model="username" required class="input-field" />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" v-model="password" required class="input-field" />
        </div>
        <button type="submit" class="submit-button">Увійти</button>
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
          window.location.href = '/profile';  // Повне оновлення сторінки після успішного входу
        })
        .catch(error => {
          console.error('Помилка авторизації:', error);
          alert('Невірний логін або пароль');
        });
    },
    logout() {
      AuthService.logout();
      this.currentUser = null;
      window.location.reload();  // Повне оновлення сторінки після виходу
    }
  },
  created() {
    this.currentUser = AuthService.getCurrentUser();
  }
};
</script>

<style scoped>
.user-info {
  margin-bottom: 20px;
}

.logout-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c82333;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.h2 {
  max-width: 400px;
  margin: 25px auto;
  
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
