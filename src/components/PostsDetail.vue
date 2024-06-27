<template>
  <div v-if="post.title">
    <h1>{{ post.title }}</h1>
    <div class="content">
      <div class="media" v-if="post.media">
        <template v-if="isImage(post.media)">
          <img :src="post.media" class="post-media" alt="Зображення">
        </template>
        <template v-else-if="isVideo(post.media)">
          <video :src="post.media" class="post-media" controls></video>
        </template>
      </div>
      <div class="text">
        <div v-html="post.text"></div>
      </div>
    </div>
    <div class="meta">
      <div class="time">
        <p>Створено {{ new Date(post.time_create).toLocaleString('en-US', { hour12: false }) }}</p>
        <p v-if="post.time_create !== post.time_update">Редаговано {{ new Date(post.time_update).toLocaleString('en-US', { hour12: false }) }}</p>
      </div>
      <div>{{ post.author.username }}</div>
      <div class="buttons" v-if="user.username === post.author">
        <router-link :to="`/update/${post.id}`">
          <button>Редагувати</button>
        </router-link>
        <button @click="deletePost">Видалити пост</button>
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
import { useUserStore } from '../store';

export default {
  name: 'PostDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const userStore = useUserStore();
    const post = reactive({});

    const fetchPost = async () => {
      try {
        const response = await axios.get(`posts/${props.id}/`);
        Object.assign(post, response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    const deletePost = async () => {
      try {
        await axios.delete(`posts/${props.id}/`);
        console.log('Post deleted!');
        emit('postDeleted');
        this.$router.push('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    };

    const isImage = (media) => /\.(jpeg|jpg|gif|png|webp)$/i.test(media);
    const isVideo = (media) => /\.(mp4|webm|ogg)$/i.test(media);

    

    onMounted(fetchPost);

    return {
      post,
      deletePost,
      isImage,
      isVideo,
      
      user: userStore.user
    };
  }
};
</script>

<style scoped>
.user-posts {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.content {
  display: flex;
  align-items: flex-start;
}

.media {
  margin-right: 20px;
}

.post-media {
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text {
  flex: 1;
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.time {
  font-style: italic;
  color: #777;
  font-size: 14px;
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
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
