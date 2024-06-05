<template>
  <div>
    <h2>Додати новий пост</h2>
    <form @submit.prevent="addPost">
      <label for="title">Заголовок:</label>
      <input type="text" id="title" v-model="post.title" required>
      <label for="text">Текст:</label>
      <textarea id="text" v-model="post.text" required></textarea>
      <label for="media">Медіафайл:</label>
      <input type="file" id="media" @change="handleFileChange" accept="image/*">
      
      <button type="submit">Додати пост</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/axios';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    const post = ref({
      title: '',
      text: '',
      media: null,
      author: '1'
    });

    const handleFileChange = (event) => {
      post.value.media = event.target.files[0];
    };

    const addPost = async () => {
      const formData = new FormData();
      formData.append('title', post.value.title);
      formData.append('text', post.value.text);
      formData.append('author', post.value.author);

      if (post.value.media) {
        formData.append('media', post.value.media);
      }

      try {
        const response = await axios.post('posts/', formData);
        if (response.status !== 201) {
          throw new Error('Failed to add post');
        }
        const data = response.data;
        console.log('Post added successfully:', data);
        router.push({ name: 'PostDetail', params: { id: data.id }, query: { refresh: Date.now() } });
      } catch (error) {
        console.error('Error adding post:', error);
        // Обробка помилок, наприклад, показ помилки користувачеві
      }
    };

    return {
      post,
      handleFileChange,
      addPost
    };
  }
};
</script>