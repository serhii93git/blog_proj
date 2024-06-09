<template>
  <div class="user-posts">
    <h1>{{ user.username }}'s Posts</h1>
    <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" class="creator-image" />
    <ul>
      <li v-for="post in user.posts" :key="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p>{{ post.text }}</p>
        <img :src="mediaUrl(post.media)" alt="Post Media" class="post-media" />
        <p class="post-time">Created at: {{ new Date(post.time_create).toLocaleString() }}</p>
        <p class="post-time">Updated at: {{ new Date(post.time_update).toLocaleString() }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        date_joined: '',
        creator_image: '',
        posts: []
      }
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://34.228.31.75:8000/api/creator/');
        console.log(response.data); // Логування для перевірки даних
        // Оскільки response.data є масивом користувачів, беремо першого
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.user = response.data[0];
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    mediaUrl(media) {
      return `http://3.95.246.201:8000${media}`;
    }
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

.post-time {
  font-style: italic;
  color: #777;
}
</style>
