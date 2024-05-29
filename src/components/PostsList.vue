

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios.get('http://127.0.0.1:8000/api/posts/')
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error('Помилка отримання даних:', error);
        });
    }
  }
}
</script>

<template>
  <div class="post">
    <h1>Мій блог</h1>
    <div v-for="post in posts" :key="post.id">
      <h2 class="link">
        <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
      </h2>   
         
    <div class="content">
      <div class="image">
        <img :src="post.media" style="max-width: 300px;" alt="Зображення">
      </div>
      <div class="text">
        <p>text post: {{ post.text }}</p>
      </div>
      
    </div>
    <div class="meta">
      <div class="author">
        <p>Author: <em>{{ post.author }}</em></p>
      </div>
      
      <div class="time">
        <p>time create: {{ post.time_create }}</p>
        <p>time update: {{ post.time_update }}</p>
      </div>
    </div>
      <hr>

    </div>
  </div>
</template>

<style src="../style/PostList.css"></style>