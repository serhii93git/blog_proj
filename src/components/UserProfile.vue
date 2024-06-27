<template>
  <div class="user-profile">
    <div class="profile-header">
      <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" class="creator-image" />
      <h1>{{ user.username }}</h1>
    </div>
    <div class="profile-details">
      <p class="user-info"><strong>Ім'я:</strong> {{ user.first_name }}</p>
      <p class="user-info"><strong>Прізвище:</strong> {{ user.last_name }}</p>
      <p class="user-info"><strong>Електронна пошта:</strong> {{ user.email }}</p>
      <p class="user-info"><strong>Дата приєднання:</strong> {{ new Date(user.date_joined).toLocaleString() }}</p>
    </div>
    <div class="edit-btn">
      <router-link :to="`/edit/${user.id}`">
        <button>Редагувати</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        date_joined: '',
        creator_image: ''
      }
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://34.228.31.75:8000/api/creator/');
        console.log(response.data); // Логування для перевірки даних
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.user = response.data[0];
        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

.profile-header {
  position: relative;
  margin-bottom: 20px;
}

.creator-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #007bff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.profile-details {
  text-align: left;
  margin: 0 auto;
  max-width: 600px;
}

.user-info {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.user-info strong {
  color: #007bff;
}

.edit-btn {
  margin-top: 30px;
}

.edit-btn button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.edit-btn button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
