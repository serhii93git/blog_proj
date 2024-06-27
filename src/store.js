import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      date_joined: '',
      creator_image: ''
    },
    loading: false,
    error: null
  }),
  actions: {
    setUser(data) {
      this.user = { ...data };
    },
    async fetchUser() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://34.228.31.75:8000/api/creator/');
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.setUser(response.data[0]);
        } else {
          this.error = 'No user data found';
        }
      } catch (error) {
        this.error = 'Error fetching data';
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
