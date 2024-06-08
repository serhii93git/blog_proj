<template>
    <div>
      <h1>{{ user.username }}</h1>
      <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" />
      <p>First Name: {{ user.first_name }}</p>
      <p>Last Name: {{ user.last_name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Date Joined: {{ new Date(user.date_joined).toLocaleString() }}</p>
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
          const response = await axios.get('http://3.95.246.201:8000/api/creator/');
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
  /* Додайте ваші стилі тут */
  </style>
  