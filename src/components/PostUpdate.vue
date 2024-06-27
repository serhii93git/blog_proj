<template>
  <div>
    <h2>Редагувати пост</h2>
    <form @submit.prevent="updatePost" class="edit-post-form">
      <label for="title">Заголовок:</label>
      <input type="text" id="title" v-model="post.title" required class="input-field">
      
      <label for="text">Текст:</label>
      <div ref="editorContainer" class="editor-container"></div>
      
      <label for="media">Медіафайл:</label>
      <input type="file" id="media" @change="handleFileChange" accept="image/*" class="input-field">
      
          
      <button type="submit" class="submit-button">Оновити пост</button>
      <button @click="cancelEdit" class="cancel-button">Скасувати</button>
    </form>
  </div>
</template>



<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

export default {
  data() {
    return {
      post: {
        title: '',
        text: '',
        media: null
        
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
    this.initializeQuillEditor();
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(`http://34.228.31.75:8000/api/posts/${this.id}/`);
        this.post = response.data;
        this.originalPost = { ...response.data }; // зберігаємо оригінальні дані для перевірки змін
        this.quill.root.innerHTML = this.post.text; // Завантажуємо текст у редактор
      } catch (error) {
        console.error('Помилка отримання посту:', error);
      }
    },
    handleFileChange(event) {
      this.post.media = event.target.files[0];
    },
    initializeQuillEditor() {
      this.quill = new Quill(this.$refs.editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ 'align': [] }],
            ['link', 'image']
          ]
        }
      });
    },
    async updatePost() {
      const formData = new FormData();
      formData.append('title', this.post.title);
      formData.append('text', this.quill.root.innerHTML); // Оновлюємо текст з Quill редактора
      

      if (this.post.media && (this.originalPost === null || this.post.media !== this.originalPost.media)) {
        formData.append('media', this.post.media);
      }

      try {
        const response = await axios.patch(`http://34.228.31.75:8000/api/posts/${this.id}/`, formData);
        console.log('Пост успішно оновлено:', response.data);
        this.$router.push(`/post/${this.id}`); // Перенаправлення на сторінку оновленого посту
      } catch (error) {
        console.error('Помилка оновлення посту:', error);
      }
    },
    cancelEdit() {
      this.$router.push(`/post/${this.id}`); // Перенаправлення на сторінку оновленого посту при скасуванні редагування
    }
  }
};
</script>



<style scoped>
.edit-post-form {
  max-width: 600px;
  margin: 0 auto;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.editor-container {
  height: 200px;
  margin-bottom: 15px;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.cancel-button:hover {
  background-color: #5a6268;
}
</style>

