import { createRouter, createWebHistory } from 'vue-router';
import PostsList from '../components/PostsList.vue'; 
import PostDetail from '../components/PostsDetail.vue';
import PostAdd from '../components/PostAdd.vue';
import PostUpdate from '../components/PostUpdate.vue';
import UserLogin from '../components/UserLogin.vue';
import UserProfile from '../components/UserProfile.vue';
import UserPost from '../components/UserPost.vue'



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
    path: '/update/:id',
    name: 'PostUpdate',
    component: PostUpdate,
    props:true
  },
  {
    path: '/add',
    name: 'PostAdd',
    component: PostAdd
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/upost',
    name: 'UserPost',
    component: UserPost
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;