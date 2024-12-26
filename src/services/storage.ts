import { MMKV } from 'react-native-mmkv';
import { logger } from './logger';

class StorageService {
    private storage = new MMKV({
        id: 'app_storage',
        encryptionKey: 'your-encryption-key',
    });

    async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = this.storage.getString(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            logger.error('Failed to get item from storage:', error);
            return null;
        }
    }

    async setItem<T>(key: string, value: T): Promise<void> {
        try {
            this.storage.set(key, JSON.stringify(value));
        } catch (error) {
            logger.error('Failed to set item in storage:', error);
            throw error;
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            this.storage.delete(key);
        } catch (error) {
            logger.error('Failed to remove item from storage:', error);
            throw error;
        }
    }

    async clearAll(): Promise<void> {
        try {
            this.storage.clearAll();
        } catch (error) {
            logger.error('Failed to clear storage:', error);
            throw error;
        }
    }

    // 用户相关的存储方法
    async getUserProfile(): Promise<any | null> {
        return this.getItem('user_profile');
    }

    async setUserProfile(profile: any): Promise<void> {
        return this.setItem('user_profile', profile);
    }

    async removeUserProfile(): Promise<void> {
        return this.removeItem('user_profile');
    }

    // 应用设置相关的存储方法
    async getSettings(): Promise<any | null> {
        return this.getItem('app_settings');
    }

    async setSettings(settings: any): Promise<void> {
        return this.setItem('app_settings', settings);
    }

    // 缓存相关的存储方法
    async getCacheItem<T>(key: string): Promise<{ data: T; timestamp: number } | null> {
        return this.getItem(`cache_${key}`);
    }

    async setCacheItem<T>(
        key: string,
        data: T,
        maxAge: number = 5 * 60 * 1000, // 默认5分钟
    ): Promise<void> {
        return this.setItem(`cache_${key}`, {
            data,
            timestamp: Date.now() + maxAge,
        });
    }

    async removeCacheItem(key: string): Promise<void> {
        return this.removeItem(`cache_${key}`);
    }

    async clearCache(): Promise<void> {
        const allKeys = this.storage.getAllKeys();
        const cacheKeys = allKeys.filter(key => key.startsWith('cache_'));
        cacheKeys.forEach(key => this.storage.delete(key));
    }

    // 检查并清理过期的缓存
    async cleanExpiredCache(): Promise<void> {
        const allKeys = this.storage.getAllKeys();
        const cacheKeys = allKeys.filter(key => key.startsWith('cache_'));
        const now = Date.now();

        for (const key of cacheKeys) {
            const cached = await this.getCacheItem(key.replace('cache_', ''));
            if (cached && cached.timestamp < now) {
                await this.removeCacheItem(key);
            }
        }
    }
}

export const StorageService = new StorageService(); 