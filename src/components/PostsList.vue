<template>
  <div class="post">
    <h1>Мій блог</h1>
    <div v-for="post in posts" :key="post.id">
      <h2 class="link">
        <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
      </h2>   
         
      <div class="content">
        <div class="image" v-if="post.media">
          <img :src="post.media" style="max-width: 300px;" alt="Зображення">
        </div>
        <div class="text">
          <p>{{ getTruncatedText(post) }}</p>
          <button v-if="showReadMoreButton(post)" @click="toggleExpand(post)">
            {{ getButtonText(post) }}
          </button>
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

<script>
import axios from 'axios';
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      posts: [],
      limit: 500
    });

    const fetchPosts = () => {
      axios.get('http://127.0.0.1:8000/api/posts/')
        .then(response => {
          state.posts = response.data.map(post => ({
            ...post,
            isExpanded: false
          }));
        })
        .catch(error => {
          console.error('Помилка отримання даних:', error);
        });
    };

    const toggleExpand = (post) => {
      post.isExpanded = !post.isExpanded;
    };

    const getTruncatedText = (post) => {
      if (post.isExpanded || !post.text) {
        return post.text;
      }
      return post.text.length > state.limit
        ? post.text.substring(0, state.limit) + '...'
        : post.text;
    };

    const showReadMoreButton = (post) => {
      return post.text && post.text.length > state.limit;
    };

    const getButtonText = (post) => {
      return post.isExpanded ? 'Згорнути' : 'Читати далі';
    };

    fetchPosts();

    return {
      ...toRefs(state),
      fetchPosts,
      toggleExpand,
      getTruncatedText,
      showReadMoreButton,
      getButtonText
    };
  }
};
</script>

<style src="../style/PostList.css"></style>
