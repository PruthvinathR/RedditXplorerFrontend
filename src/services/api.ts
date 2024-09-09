import axios from 'axios';


const API_URL = process.env.REACT_APP_BACKEND_URL + '/reddit';

export const getPosts = ((searchQuery: string, sortBy: string) => 
  axios.get(`${API_URL}/posts?subreddit=${searchQuery}&categories=${sortBy}&limit=10`, {
    timeout: 15000 // 15 seconds timeout
  }));

export const analyzePost = (post_id: string) =>
  axios.get(`${API_URL}/post?post_id=${post_id}`, {
    timeout: 15000 // 15 seconds timeout
  });

export const getChatResponse = (post_id: string, message: string, chat_history: Array<[string, string]>) =>
  axios.post(`${API_URL}/chat`, {post_id, message, chat_history}, {
    timeout: 15000 // 15 seconds timeout
  });


