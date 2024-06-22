<template>
    <div class="register-container">
      <h2>Реєстрація</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Логін</label>
          <input type="text" v-model="username" id="username" required>
        </div>
        <div class="form-group">
          <label for="email">Електронна пошта</label>
          <input type="email" v-model="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="password1">Пароль</label>
          <input type="password" v-model="password1" id="password1" required>
        </div>
        <div class="form-group">
          <label for="password2">Повторити пароль</label>
          <input type="password" v-model="password2" id="password2" required>
        </div>
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Завантаження...</span>
          <span v-else>Зареєструватися</span>
        </button>
      </form>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Імпортуємо useRouter з vue-router

export default {
  name: 'UserRegister',
  setup() {
    const router = useRouter(); // Отримуємо доступ до router через useRouter()

    const username = ref('');
    const email = ref('');
    const password1 = ref('');
    const password2 = ref('');
    const isLoading = ref(false);

    const register = async () => {
      if (password1.value !== password2.value) {
        alert('Паролі не співпадають');
        return;
      }

      isLoading.value = true;

      try {
        await axios.post('http://34.228.31.75:8000/api/auth/registration/', {
          username: username.value,
          email: email.value,
          password1: password1.value,
          password2: password2.value,
        });

        alert('Реєстрація успішна!');
        username.value = '';
        email.value = '';
        password1.value = '';
        password2.value = '';

        // Після успішної реєстрації можна перенаправити користувача на іншу сторінку
        router.push('/login');
      } catch (error) {
        console.error('Помилка реєстрації:', error);
        router.push('/login');
      } finally {
        isLoading.value = false;
      }
    };

    return {
      username,
      email,
      password1,
      password2,
      register,
      isLoading,
    };
  }
};

  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
  </style>
  