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
      <router-link :to="`/update/${post.id}`">
        <button>Редагувати</button>
      </router-link>
      <button @click="deletePost">Видалити пост</button>
    </div>
  </div>
  
  <div v-else>
    <p>Loading post details...</p>
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
    }
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
        emit('postDeleted'); // Випромінювання події для батьківського компонента
      } catch (error) {
        console.error('Помилка видалення поста:', error);
      }
    };

    onMounted(fetchPost);

    return {
      post,
      deletePost
    };
  }
};
</script>
