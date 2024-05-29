import { createRouter, createWebHistory } from 'vue-router';
import PostsList from '../components/PostsList.vue'; 
import PostDetail from '../components/PostsDetail.vue'; // Нова сторінка

const routes = [
  {
    path: '/',
    name: 'PostsList',
    component: PostsList
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
    props:true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;