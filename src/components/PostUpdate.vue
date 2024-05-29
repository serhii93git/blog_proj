<template>
    <div>
      <h2>Редагувати пост</h2>
      <form @submit.prevent="updatePost">
        <label for="title">Заголовок:</label>
        <input type="text" id="title" v-model="post.title" required>
        <label for="text">Текст:</label>
        <textarea id="text" v-model="post.text" required></textarea>
        <label for="media">Медіафайл:</label>
        <input type="file" id="media" @change="handleFileChange" accept="image/*">
        <label for="author">Автор:</label>
        <input type="text" id="author" v-model="post.author" required>
        <button type="submit">Оновити пост</button>
        <button @click="cancelEdit">Скасувати</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        post: {
          title: '',
          text: '',
          media: null,
          author: ''
        },
        originalPost: null // для перевірки змін
      };
    },
    props: {
    id: {
      type: String,
      required: true
    }
  },
    mounted() {
      this.fetchPost();
    },
    methods: {
      fetchPost() {
        axios.get(`http://127.0.0.1:8000/api/posts/${this.id}/`)
          .then(response => {
            this.post = response.data;
            this.originalPost = { ...response.data }; // зберігаємо оригінальні дані для перевірки змін
          })
          .catch(error => {
            console.error('Помилка отримання посту:', error);
          });
      },
      handleFileChange(event) {
        this.post.media = event.target.files[0];
      },
      updatePost() {
        const formData = new FormData();
        formData.append('title', this.post.title);
        formData.append('text', this.post.text);
        formData.append('author', this.post.author);
  
        if (this.post.media && (this.originalPost === null || this.post.media !== this.originalPost.media)) {
          formData.append('media', this.post.media);
        }
  
        axios.patch(`http://127.0.0.1:8000/api/posts/${this.id}/`, formData)
          .then(response => {
            console.log('Пост успішно оновлено:', response.data);
            this.$router.push('/'); // Перенаправлення на головну сторінку після успішного оновлення
          })
          .catch(error => {
            console.error('Помилка оновлення посту:', error);
          });
      },
      cancelEdit() {
        this.$router.push('/'); // Перенаправлення на головну сторінку при скасуванні редагування
      }
    }
  };
  </script>
  
  <style scoped>
  /* Додайте стилі за потребою */
  </style>
  