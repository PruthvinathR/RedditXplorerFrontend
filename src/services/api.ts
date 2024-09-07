import axios from 'axios';


const API_URL = process.env.REACT_APP_BACKEND_URL + '/reddit';

export const getPosts = ((searchQuery: string, sortBy: string) => 
  axios.get(`${API_URL}/posts?subreddit=${searchQuery}&categories=${sortBy}&limit=10`));

export const analyzeSentiment = (text: string) =>
  axios.post(`${API_URL}/analyze_sentiment`, { text });