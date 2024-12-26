import { MMKV } from 'react-native-mmkv';
import { ApiService } from './api';

const cache = new MMKV({
    id: 'cache',
    encryptionKey: 'your-encryption-key',
});

interface CacheConfig {
    ttl: number; // Time to live in milliseconds
}

export const CacheService = {
    async get<T>(key: string): Promise<T | null> {
        const data = cache.getString(key);
        if (!data) return null;

        const { value, timestamp, ttl } = JSON.parse(data);
        if (Date.now() - timestamp > ttl) {
            cache.delete(key);
            return null;
        }

        return value as T;
    },

    set<T>(key: string, value: T, config: CacheConfig) {
        const data = {
            value,
            timestamp: Date.now(),
            ttl: config.ttl,
        };
        cache.set(key, JSON.stringify(data));
    },

    async getUsers(forceRefresh = false) {
        const cacheKey = 'users';

        if (!forceRefresh) {
            const cached = await this.get(cacheKey);
            if (cached) return cached;
        }

        const users = await ApiService.getUsers();
        this.set(cacheKey, users, { ttl: 5 * 60 * 1000 }); // 5 minutes
        return users;
    },

    clear() {
        cache.clearAll();
    },
}; 