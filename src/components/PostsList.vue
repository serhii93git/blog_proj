<template>
  <div class="post">
    <h1>У - умігрант, або записки з закордоння</h1>
    <h3>
      <em>"Скажи мені що ти вважаєш проблемою - 
        і я скажу як сильно ти щасливий.."</em>
    </h3>
    <h4>Розповіді про те, що і як зі мною відбувалось закордоном 
      з домішками сухих фактів, власних емоцій та мрікувань</h4>
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
          <p>Автор <em>{{ post.author }}</em></p>
        </div>
        <div class="time">
          <p>Створено {{ new Date(post.time_create).toLocaleString('en-US', { hour12: false }) }}</p>
          <p v-if="post.time_create !== post.time_update">Редаговано {{ new Date(post.time_update).toLocaleString('en-US', { hour12: false }) }}</p>
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
      axios.get('http://3.95.246.201:8000/api/posts/')
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
