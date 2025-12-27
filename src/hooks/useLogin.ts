import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { instance } from '@/assets/shared/lib/axios';
import { setCookie } from '@/assets/shared/lib/cookie';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

interface UserInfo {
  id: number;
  email: string;
  name?: string;
  role?: string | string[];
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
}

const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT 디코딩 실패:', error);
    return null;
  }
};

export function useLogin(): UseLoginReturn {
  const { login: setAuthUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await instance.post<LoginResponse>('/api/auth/signin', {
        email: credentials.email,
        password: credentials.password,
      });

      const { accessToken, refreshToken } = response.data;

      const decodedToken = decodeJWT(accessToken);

      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);

      const userResponse = await instance.get<UserInfo>('/api/member', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = userResponse.data;

      const roleFromToken =
        decodedToken?.auth ||
        decodedToken?.role ||
        decodedToken?.roles ||
        decodedToken?.authorities ||
        decodedToken?.authority ||
        decodedToken?.Role ||
        decodedToken?.ROLE ||
        decodedToken?.userRole ||
        decodedToken?.memberRole;
      const roleFromAPI =
        (userData as any).role ||
        (userData as any).roles ||
        (userData as any).authorities ||
        (userData as any).Role ||
        (userData as any).ROLE ||
        (userData as any).userRole ||
        (userData as any).memberRole;
      const role = roleFromToken || roleFromAPI;

      const finalUserData = {
        ...userData,
        id: (userData as any).id || (userData as any).memberId,
        role: role,
      };

      setAuthUser(finalUserData, accessToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
        if (status === 404) {
          throw new Error('사용자 정보를 가져오는데 실패했습니다.');
        }
        throw new Error(
          error.response?.data?.message || '로그인 중 오류가 발생했습니다.'
        );
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
