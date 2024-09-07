import axios from 'axios';


const API_URL = process.env.REACT_APP_BACKEND_URL + '/reddit';

export const getPosts = ((searchQuery: string, sortBy: string) => 
  axios.get(`${API_URL}/posts?subreddit=${searchQuery}&categories=${sortBy}&limit=10`));

export const analyzePost = (post_id: string) =>
  axios.get(`${API_URL}/post?post_id=${post_id}`);