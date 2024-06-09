<template>
  <div v-if="post.title" class="post-detail">
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
        <p>{{ post.text }}</p>
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

    const isImage = (media) => {
      return /\.(jpeg|jpg|gif|png|webp)$/i.test(media);
    };

    const isVideo = (media) => {
      return /\.(mp4|webm|ogg)$/i.test(media);
    };

    onMounted(fetchPost);

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
.post-detail {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.post-detail h1 {
  font-size: 28px;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
}

.post-detail .content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.post-detail .media {
  margin-right: 30px;
}

.post-detail .media img {
  max-width: 100%;
  border-radius: 10px;
}

.post-detail .media video {
  max-width: 100%;
  border-radius: 10px;
}

.post-detail .text {
  flex: 1;
}

.post-detail .meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.post-detail .author {
  font-style: italic;
}

.post-detail .time {
  font-size: 14px;
}

.post-detail button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.post-detail button:hover {
  background-color: #0056b3;
}
</style>
