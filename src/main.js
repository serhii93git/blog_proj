import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useUserStore } from './store';  // Імпортуйте ваш store тут

const app = createApp(App);
const pinia = createPinia();

const userStore = useUserStore(pinia);
userStore.fetchUser().then(() => {
  app.use(pinia);
  app.use(router);
  app.mount('#app');
});
