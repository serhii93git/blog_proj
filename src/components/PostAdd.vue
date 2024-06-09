<template>
  <div>
    <h2>Додати новий пост</h2>
    <form @submit.prevent="addPost" class="add-post-form">
      <label for="title">Заголовок:</label>
      <input type="text" id="title" v-model="post.title" required class="input-field">
      <label for="text">Текст:</label>
      <div ref="editorContainer" class="editor-container"></div>
      <label for="media">Медіафайл:</label>
      <input type="file" id="media" @change="handleFileChange" accept="image/*" class="input-field">
      
      <button type="submit" class="submit-button">Додати пост</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
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
    });
    const editorContainer = ref(null);
    let quillEditor;

    const handleFileChange = (event) => {
      post.value.media = event.target.files[0];
    };

    const addPost = async () => {
      const formData = new FormData();
      formData.append('title', post.value.title);
      formData.append('text', quillEditor.root.innerHTML);

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

    onMounted(() => {
      quillEditor = new Quill(editorContainer.value, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
        }
      });
    });

    return {
      post,
      handleFileChange,
      addPost,
      editorContainer
    };
  }
};
</script>

<style scoped>
.add-post-form {
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

.textarea-field {
  height: auto; /* Забезпечує автоматичне розширення текстового поля */
  min-height: 100px; /* Мінімальна висота текстового поля */
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

.editor-container {
  height: 200px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
}
</style>
