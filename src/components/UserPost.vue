<template>
  <div class="user-posts">
    <h1>{{ user.username }}'s Posts</h1>
    <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" class="creator-image" />
    <ul>
      <li v-for="post in user.posts" :key="post.id" class="post-item">
        <h2>
          <router-link :to="`/post/${post.id}`">
            {{ post.title }}
          </router-link>
        </h2>
        <div class="image" v-if="post.media">
          <img :src="mediaUrl(post.media)" alt="Post Media" class="post-media" @error="onImageError" />
        </div>
        <div class="text">
          <div v-html="getTruncatedText(post)"></div>
          <button v-if="showReadMoreButton(post)" @click="toggleExpand(post)">
            {{ getButtonText(post) }}
          </button>
        </div>
        
        <p class="post-time">Created at: {{ new Date(post.time_create).toLocaleString() }}</p>
        <p class="post-time" v-if="post.time_create !== post.time_update">Updated at: {{ new Date(post.time_update).toLocaleString() }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, toRefs } from 'vue';

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
  setup() {
    const state = reactive({
      posts: [],
      limit: 500
    });

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

    return {
      ...toRefs(state),
      toggleExpand,
      getTruncatedText,
      showReadMoreButton,
      getButtonText
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://34.228.31.75:8000/api/creator/');
        
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.user = response.data[0];
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    mediaUrl(media) {
      const url = `http://34.228.31.75:8000${media}`;
      
      return url;
    },
    onImageError(event) {
      console.error('Image failed to load:', event.target.src);
    }
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

.creator-image {
  display: block;
  max-width: 200px;
  margin: 0 auto 20px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
}

.post-item {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.post-item:hover {
  transform: translateY(-5px);
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.text {
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
}

.text button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.text button:hover {
  background-color: #0056b3;
}

.post-media {
  display: block;
  max-width: 100%;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-time {
  font-style: italic;
  color: #777;
  font-size: 14px;
}
</style>
