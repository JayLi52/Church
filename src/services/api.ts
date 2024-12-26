import axios from 'axios';
import { StorageService } from './storage';

const api = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
api.interceptors.request.use(
    async config => {
        const userProfile = await StorageService.getUserProfile();
        if (userProfile?.token) {
            config.headers.Authorization = `Bearer ${userProfile.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// 响应拦截器
api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
            // 处理token过期
            StorageService.clearAll();
            // 跳转到登录页
        }
        return Promise.reject(error);
    },
);

export const ApiService = {
    // 用户相关
    getUsers: () => api.get('/users'),
    getUserProfile: (id: string) => api.get(`/users/${id}`),
    updateUserProfile: (id: string, data: Partial<UserProfile>) =>
        api.put(`/users/${id}`, data),

    // 其他API...
}; 