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
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
}

export function useLogin(): UseLoginReturn {
  const { login: setAuthUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    const startTime = performance.now();
    
    try {
      const signinStartTime = performance.now();
      const response = await instance.post<LoginResponse>('/api/auth/signin', {
        email: credentials.email,
        password: credentials.password,
      });
      const signinEndTime = performance.now();
      console.log(`[로그인 성능] signin API: ${(signinEndTime - signinStartTime).toFixed(2)}ms`);

      const { accessToken, refreshToken } = response.data;

      const cookieStartTime = performance.now();
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      const cookieEndTime = performance.now();
      console.log(`[로그인 성능] 쿠키 설정: ${(cookieEndTime - cookieStartTime).toFixed(2)}ms`);

      const memberStartTime = performance.now();
      const userResponse = await instance.get<UserInfo>('/api/member', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const memberEndTime = performance.now();
      console.log(`[로그인 성능] member API: ${(memberEndTime - memberStartTime).toFixed(2)}ms`);

      const authStartTime = performance.now();
      setAuthUser(userResponse.data, accessToken);
      const authEndTime = performance.now();
      console.log(`[로그인 성능] AuthContext 업데이트: ${(authEndTime - authStartTime).toFixed(2)}ms`);
      
      const totalTime = performance.now() - startTime;
      console.log(`[로그인 성능] 총 소요 시간: ${totalTime.toFixed(2)}ms`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const url = error.config?.url || '';
        
        if (url.includes('/api/auth/signin') && (status === 401 || status === 403)) {
          throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
        
        if (url.includes('/api/member') && status === 401) {
          throw new Error('사용자 정보를 가져오는데 실패했습니다.');
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
