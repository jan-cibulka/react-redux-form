import axios from 'axios';
export const baseURL = 'https://my-app-yikvv.ondigitalocean.app';
const http = axios.create({
  baseURL,
});

export default http;
