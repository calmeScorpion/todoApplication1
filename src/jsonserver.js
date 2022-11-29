import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7000/',
  timeout: 3000,
});

export default instance;
