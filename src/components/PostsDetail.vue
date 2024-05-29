<template>
  <div v-if="post.title">
    <h1>{{ post.title }}</h1>
    <div class="content">
      <div class="image" v-if="post.media">
        <img :src="post.media" style="max-width: 300px;" alt="Зображення">
      </div>
      <div class="text">
        <p>{{ post.text }}</p>
      </div>
    </div>
    <div class="meta">
      <div class="author">
        <p>Author: <em>{{ post.author }}</em></p>
      </div>
      <div class="time">
        <p>Time Created: {{ post.time_create }}</p>
        <p>Time Updated: {{ post.time_update }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading post details...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      post: {}
    };
  },
  methods: {
    fetchPost() {
      axios.get(`http://127.0.0.1:8000/api/posts/${this.id}/`)
        .then(response => {
          this.post = response.data;
        })
        .catch(error => {
          console.error('Помилка отримання даних:', error);
        });
     }
  },
  created() {
    this.fetchPost();
  }
};
</script>