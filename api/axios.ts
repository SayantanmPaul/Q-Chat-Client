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
  timeout: 5000, // 5 seconds
  withCredentials: true,
});

export async function checkServerStatus({
  apiUrl,
}: {
  apiUrl: string;
}): Promise<boolean> {
  try {
    const res = await fetch(apiUrl + '/health', {
      method: 'GET',
      cache: 'no-store',
    });
    return res.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default axiosInstance;
