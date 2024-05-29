import { createRouter, createWebHistory } from 'vue-router';
import PostsList from '../components/PostsList.vue'; 
import PostDetail from '../components/PostsDetail.vue';
import PostAdd from'../components/PostAdd.vue';

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
  },
  {
    path: '/add',
    name: 'PostAdd',
    component: PostAdd
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;