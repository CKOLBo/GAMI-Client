import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from '@/assets/shared/lib/cookie';

export const baseURL = import.meta.env.DEV
  ? ''
  : 'https://port-0-gami-server-mj0rdvda8d11523e.sel3.cloudtype.app';

export const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const refreshURL = import.meta.env.DEV
          ? '/api/auth/reissue'
          : 'https://port-0-gami-server-mj0rdvda8d11523e.sel3.cloudtype.app/api/auth/reissue';

        const response = await axios.patch<{
          accessToken: string;
          refreshToken: string;
        }>(refreshURL, null, {
          headers: {
            RefreshToken: refreshToken,
          },
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        setCookie('accessToken', accessToken);
        setCookie('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (e) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/signin';
        }
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
