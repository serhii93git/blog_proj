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
      <div class="end">
        <div class="time">
          <p>Створено {{ new Date(post.time_create).toLocaleString('en-US', { hour12: false }) }}</p>
          <p v-if="post.time_create !== post.time_update">Редаговано {{ new Date(post.time_update).toLocaleString('en-US', { hour12: false }) }}</p>
        </div>
        <div class="buttons">
          <router-link :to="`/update/${post.id}`">
            <button>Редагувати</button>
          </router-link>
          <button @click="deletePost">Видалити пост</button>
        </div>
      </div>
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
        this.$router.push('/'); 
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
.user-posts {
  max-width: 800px;
  margin: 0 auto;
}

.creator-image {
  max-width: 200px;
  margin-bottom: 20px;
}

.post-item {
  margin-bottom: 40px;
}

.post-media {
  max-width: 300px;
  margin-bottom: 10px;
}

.time {
  font-style: italic;
  color: #777;
}

.content {
  display: flex;
  align-items: center;
}

.text {
  flex: 1;
}

.image, .media {
  margin-right: 20px;
}

.text p {
  word-wrap: break-word;
  white-space: pre-wrap;
}

.meta {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta .time {
  display: flex;
  flex-direction:column-reverse;
  align-items: flex-start;
  margin: 0px;
  padding: 0px;
}

.meta .buttons {
  display: flex;
  flex-direction:row-reverse;
  align-items: flex-start;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
