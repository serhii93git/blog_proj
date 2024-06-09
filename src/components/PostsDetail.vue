<template>
  <div v-if="post.title">
    <h1>{{ post.title }}</h1>
    <div class="content">
      <div class="media" v-if="post.media">
        <template v-if="isImage(post.media)">
          <img :src="post.media" style="max-width: 300px;" alt="Зображення">
        </template>
        <template v-else-if="isVideo(post.media)">
          <video :src="post.media" style="max-width: 300px;" controls></video>
        </template>
      </div>
      <div class="text">
        <div v-html="post.text"></div>
      </div>
    </div>
    <div class="meta">
      <div class="author">
        <p>Автор: <em>{{ post.author }}</em></p>
      </div>
      <div class="time">
        <p>Час створення: {{ post.time_create }}</p>
        <p>Час оновлення: {{ post.time_update }}</p>
      </div>
      <router-link :to="`/update/${post.id}`">
        <button>Редагувати</button>
      </router-link>
      <button @click="deletePost">Видалити пост</button>
    </div>
  </div>
  
  <div v-else>
    <p>Завантаження деталей поста...</p>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from '@/axios';

export default {
  name: 'PostDetail',
  props: {
    id: {
      type: String,
      required: true
    },
  },
  setup(props, { emit }) {
    const post = reactive({});

    const fetchPost = async () => {
      try {
        const response = await axios.get(`posts/${props.id}/`);
        Object.assign(post, response.data);
      } catch (error) {
        console.error('Помилка отримання даних:', error);
      }
    };

    const deletePost = async () => {
      try {
        await axios.delete(`posts/${props.id}/`);
        console.log('Пост видалено!');
        emit('postDeleted');
        this.$router.push('/'); // Випромінювання події для батьківського компонента
      } catch (error) {
        console.error('Помилка видалення поста:', error);
      }
    };

    onMounted(fetchPost);

    const isImage = (media) => {
      return /\.(jpeg|jpg|gif|png|webp)$/i.test(media);
    };

    const isVideo = (media) => {
      return /\.(mp4|webm|ogg)$/i.test(media);
    };

    return {
      post,
      deletePost,
      isImage,
      isVideo
    };
  }
};
</script>

<style scoped>
/* Додайте ваші стилі тут */
</style>
