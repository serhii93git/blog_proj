import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/PostsList.vue'; 
import NewPage from '../components/PostsDetail.vue'; // Нова сторінка

const routes = [
  {
    path: '/',
    name: 'PostsLiist',
    component: Home
  },
  {
    path: '/post',
    name: 'PostDetail',
    component: NewPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;