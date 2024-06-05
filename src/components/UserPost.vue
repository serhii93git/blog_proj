<template>
  <div>
    <h1>{{ user.username }}'s Posts</h1>
    <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" />
    <ul>
      <li v-for="post in user.posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.text }}</p>
        <img :src="post.media" alt="Post Media" />
        <p>Created at: {{ new Date(post.time_create).toLocaleString() }}</p>
        <p>Updated at: {{ new Date(post.time_update).toLocaleString() }}</p>
      </li>
    </ul>
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
        creator_image: '',
        posts: []
      }
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/creator/');
        console.log(response.data); // Логування для перевірки даних
        // Оскільки response.data є масивом користувачів, беремо першого
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.user = response.data[0];
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Додайте ваші стилі тут */
</style>
