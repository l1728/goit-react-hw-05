import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmU0NzE1NTY0YjI0MzJhMzI3YjE2MDhlNzNmNWMyNiIsInN1YiI6IjY2NjIwYzkxMjdhMTMyMjliNjIxZmY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j7yY6_fCl1GKpky4veSnGY55bK5MZtPkL7EA5lxNt6Y';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_IMAGE =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export { axiosInstance, IMAGE_BASE_URL, DEFAULT_IMAGE };

// import style from './App.module.css';

// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9
//   .eyJhdWQiOiJjMmU0NzE1NTY0YjI0MzJhMzI3YjE2MDhlNzNmNWMyNiIsInN1YiI6IjY2NjIwYzkxMjdhMTMyMjliNjIxZmY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
//   .j7yY6_fCl1GKpky4veSnGY55bK5MZtPkL7EA5lxNt6Y;

// API Key
// c2e4715564b2432a327b1608e73f5c26;
