<template>
  <div v-if="post.title" class="user-posts">
    <h1>{{ post.title }}</h1>
    <div class="content">
      <div class="media" v-if="post.media">
        <template v-if="isImage(post.media)">
          <img
            :src="post.media"
            class="post-media"
            alt="Зображення"
            @click="toggleImageSize"
            :style="{ width: imageSize.width, height: imageSize.height }"
          >
        </template>
        <template v-else-if="isVideo(post.media)">
          <video :src="post.media" class="post-video" controls></video>
        </template>
      </div>
      <div class="text">
        <div v-html="post.text" class="text-content"></div>
      </div>
    </div>
    <div class="meta">
      <div class="time">
        <p>Створено {{ new Date(post.time_create).toLocaleString('en-US', { hour12: false }) }}</p>
        <p v-if="post.time_create !== post.time_update">Редаговано {{ new Date(post.time_update).toLocaleString('en-US', { hour12: false }) }}</p>
      </div>
      <div class="author">
        <p>{{ post.author }}</p>
      </div>
      <div class="buttons" v-if="user.username === post.author">
        <router-link :to="`/update/${post.id}`">
          <button>Редагувати</button>
        </router-link>
        <button @click="deletePost">Видалити пост</button>
      </div>
    </div>

    <!-- Спливаюче вікно для збільшення зображення -->
    <div v-if="isZoomed" class="image-overlay" @click="toggleImageSize">
      <img :src="post.media" alt="Зображення" class="zoomed-image">
    </div>
  </div>

  <div v-else>
    <p>Завантаження деталей поста...</p>
  </div>
</template>


<script>
import { reactive, ref, onMounted } from 'vue';
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
    const imageSize = reactive({
      width: '250px',
      height: '150px'
    });
    let originalImageSize = {}; // To store original image size
    const isZoomed = ref(false); // Use ref for boolean

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

    const toggleImageSize = () => {
      if (!originalImageSize.width) {
        // Store original image size if not already stored
        originalImageSize.width = imageSize.width;
        originalImageSize.height = imageSize.height;
      }

      // Toggle zoom state
      isZoomed.value = !isZoomed.value;
    };

    onMounted(fetchPost);

    return {
      post,
      deletePost,
      isImage,
      isVideo,
      user: userStore.user,
      toggleImageSize,
      imageSize,
      isZoomed // Return isZoomed without accessing .value directly in the template
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

  .post-media,
  .post-video {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
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

  .time,
  .author {
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

  /* Стилі для спливаючого вікна */
  .image-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8); /* Півпрозорий чорний фон */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* Встановіть вище, ніж основний контент */
  }

  .zoomed-image {
    max-width: 90%; /* Обмежте максимальну ширину зображення для спливаючого вікна */
    max-height: 90vh; /* Обмежте максимальну висоту зображення для спливаючого вікна */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
  }
</style>

