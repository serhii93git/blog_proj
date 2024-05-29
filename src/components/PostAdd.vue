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
        <label for="author">Автор:</label>
        <input type="text" id="author" v-model="post.author" required>
        <button type="submit">Додати пост</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        post: {
          title: '',
          text: '',
          media: null,
          author: ''
        },
      };
    },
    methods: {
      async addPost() {
        const formData = new FormData();
        formData.append('title', this.post.title);
        formData.append('text', this.post.text);
        formData.append('author', this.post.author);
  
        // Додаємо медіафайл тільки якщо він існує
        if (this.post.media) {
          formData.append('media', this.post.media);
        }
  
        try {
          const response = await fetch('http://localhost:8000/api/posts/', {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) {
            throw new Error('Failed to add post');
          }
          const data = await response.json();
          console.log('Post added successfully:', data);
          this.$router.push('/'); // Перенаправлення на головну сторінку
        } catch (error) {
          console.error('Error adding post:', error);
          // Обробка помилок, наприклад, показ помилки користувачеві
        }
      },
      handleFileChange(event) {
        this.post.media = event.target.files[0];
      },
    },
  };
  </script>
  
