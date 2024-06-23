<template>
  <div class="user-profile">
    <h1>{{ user.username }}</h1>
    <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" class="creator-image" />
    <p class="user-info">First Name: {{ user.first_name }}</p>
    <p class="user-info">Last Name: {{ user.last_name }}</p>
    <p class="user-info">Email: {{ user.email }}</p>
    <p class="user-info">Date Joined: {{ new Date(user.date_joined).toLocaleString() }}</p>
  </div>
  <div class="edit-btn">
    <router-link :to="`/edit/${user.id}`">
      <button>Редагувати</button>
    </router-link>
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
  max-width: 600px;
  margin: 0 auto;
}

.creator-image {
  max-width: 200px;
  margin-bottom: 20px;
}

.user-info {
  margin-bottom: 10px;
}
</style>
