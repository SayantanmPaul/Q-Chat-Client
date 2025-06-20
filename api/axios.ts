import axios, { AxiosInstance } from 'axios';

const isDevMode = false;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: isDevMode
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10 seconds
  withCredentials: true,
});

if (isDevMode) {
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + '/sys/health')
    .then(res => {
      if (res.status === 200) {
        console.log(res.data);
      }
    })
    .catch(error => {
      console.error('Error pinging backend:', error);
    });
}

export default axiosInstance;
