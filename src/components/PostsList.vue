<template>
  <div>
    

    <div class="user-posts" v-for="post in posts" :key="post.id">
      <h2>
          <router-link :to="`/post/${post.id}`">
            {{ post.title }}
          </router-link>
        </h2>
      <div class="content">
        <div class="media" v-if="post.media">
          <router-link :to="`/post/${post.id}`" v-if="!isVideo(post.media)">
            <img v-if="!isVideo(post.media)" :src="post.media" class="post-media" alt="Зображення">
          </router-link>
          <video class="post-video" v-else-if="isVideo(post.media)" controls>
            <source :src="post.media" type="video/mp4">
            Ваш браузер не підтримує відтворення відео.
          </video>
        </div>
        <div class="text">
          <div v-html="getTruncatedText(post)"></div>
          <button v-if="showReadMoreButton(post)" @click="toggleExpand(post)">
            {{ getButtonText(post) }}
          </button>
        </div>
      </div>
      <div class="meta">
        <div class="author">
          <p>Автор <em>{{ post.author }}</em></p>
        </div>
        <div class="post-time">
          <p>Створено {{ new Date(post.time_create).toLocaleString('en-US', { hour12: false }) }}</p>
          <p v-if="post.time_create !== post.time_update">Редаговано {{ new Date(post.time_update).toLocaleString('en-US', { hour12: false }) }}</p>
        </div>
      </div>
      <hr>
    </div>
  </div>
  <div class="footer">
    <h3>Цей блог створений на django rest framework та Vue.js</h3>
    <h6>
      Тут можна зареєструвати нового користувача, додати, редагувати та видалити допис
      через текстовий редактор з базовими функціями. Є особиста сторінка з інформацією про користувача
      та списком постів автора (поки що доступно тільки авторизоавному користувачу). Без авторизації можна
      просто переглядати всі пости всіх авторів без можливості створення та редагування.
      Реєструватись можна будь яким імям та електронкою (верифікації поки немає).
      <br>
      Якщо пости не відображаються, можливо треба трохи зачекати (сервер безоплатний, тому повільний)
    </h6>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, toRefs } from 'vue';
import '../style/PostList.css'

export default {
  setup() {
    const state = reactive({
      posts: [],
      limit: 500
    });

    const fetchPosts = () => {
      axios.get('http://34.228.31.75:8000/api/posts/')
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

    const isVideo = (url) => {
      return url.match(/\.(mp4|webm|ogg)$/i);
    };

    fetchPosts();

    return {
      ...toRefs(state),
      fetchPosts,
      toggleExpand,
      getTruncatedText,
      showReadMoreButton,
      getButtonText,
      isVideo
     
    };
  }
};
</script>

<style>
</style>
