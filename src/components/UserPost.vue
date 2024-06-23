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
        <div class="text">
          <div v-html="getTruncatedText(post)"></div>
          <button v-if="showReadMoreButton(post)" @click="toggleExpand(post)">
            {{ getButtonText(post) }}
          </button>
        </div>
        <img v-if="post.media" :src="mediaUrl(post.media)" alt="Post Media" class="post-media" />
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
