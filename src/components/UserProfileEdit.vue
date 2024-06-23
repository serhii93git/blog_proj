<template>
    <div class="user-profile">
      <h1>Edit Profile: {{ user.username }}</h1>
      <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" class="creator-image" />
      <form @submit.prevent="updateUserData">
        <div class="form-group">
          <label for="username">Username:</label>
          <input id="username" v-model="user.username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="first_name">First Name:</label>
          <input id="first_name" v-model="user.first_name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="last_name">Last Name:</label>
          <input id="last_name" v-model="user.last_name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="user.email" type="email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="creator_image">Creator Image URL:</label>
          <input id="creator_image" v-model="user.creator_image" type="text" class="form-control" />
        </div>
        <div class="button1">
        <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
        <button @click="deleteUserData" type="button" class="btn btn-danger">Delete Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AuthService from '../services/AuthService.js';
  
  export default {
    data() {
      return {
        user: {
          id: '',
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
          console.log(response.data); // Log data for verification
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.user = response.data[0];
          } else {
            console.error('No user data found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      async updateUserData() {
        try {
          if (!this.user.id) {
            console.error('User ID is missing');
            return;
          }
          const response = await axios.put(`http://34.228.31.75:8000/api/creator/${this.user.id}/`, this.user);
          console.log('User data updated:', response.data);
        } catch (error) {
          console.error('Error updating data:', error);
        }
      },
      async deleteUserData() {
        try {
          if (!this.user.id) {
            console.error('User ID is missing');
            return;
          }
          await axios.delete(`http://34.228.31.75:8000/api/creator/${this.user.id}/`);
          console.log('User data deleted');
          AuthService.logout();
          // Optionally, redirect to another page after deletion
          this.$router.push('/register');
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      }
    }
  };
  </script>
  <style scoped>
  .user-profile {
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
    margin-bottom: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }

  </style>
  