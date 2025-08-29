import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
// api will be on port 3500
// axios will be on port 3000 <- this is what server.js is on

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});