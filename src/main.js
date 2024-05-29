import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Імпортуємо роутер

const app = createApp(App);
app.use(router); // Використовуємо роутер
app.mount('#app');




