import { MMKV } from 'react-native-mmkv';
import { Platform } from 'react-native';
import { logger } from './logger';

interface AppConfig {
    apiUrl: string;
    apiTimeout: number;
    theme: 'light' | 'dark' | 'system';
    language: string;
    cacheMaxAge: number;
    pushNotificationsEnabled: boolean;
    analyticsEnabled: boolean;
    debugMode: boolean;
}

class ConfigService {
    private storage = new MMKV({ id: 'app_config' });
    private readonly STORAGE_KEY = 'app_config';

    private defaultConfig: AppConfig = {
        apiUrl: 'https://api.example.com',
        apiTimeout: 10000,
        theme: 'system',
        language: Platform.select({ ios: 'en', android: 'en' }) || 'en',
        cacheMaxAge: 5 * 60 * 1000, // 5 minutes
        pushNotificationsEnabled: true,
        analyticsEnabled: !__DEV__,
        debugMode: __DEV__,
    };

    private config: AppConfig;

    constructor() {
        this.config = this.loadConfig();
    }

    private loadConfig(): AppConfig {
        try {
            const savedConfig = this.storage.getString(this.STORAGE_KEY);
            return savedConfig
                ? { ...this.defaultConfig, ...JSON.parse(savedConfig) }
                : this.defaultConfig;
        } catch (error) {
            logger.error('Failed to load app config:', error);
            return this.defaultConfig;
        }
    }

    get<K extends keyof AppConfig>(key: K): AppConfig[K] {
        return this.config[key];
    }

    set<K extends keyof AppConfig>(key: K, value: AppConfig[K]) {
        this.config[key] = value;
        this.saveConfig();
    }

    getAll(): AppConfig {
        return { ...this.config };
    }

    update(partialConfig: Partial<AppConfig>) {
        this.config = { ...this.config, ...partialConfig };
        this.saveConfig();
    }

    private saveConfig() {
        try {
            this.storage.set(this.STORAGE_KEY, JSON.stringify(this.config));
        } catch (error) {
            logger.error('Failed to save app config:', error);
        }
    }

    reset() {
        this.config = { ...this.defaultConfig };
        this.saveConfig();
    }
}

export const configService = new ConfigService(); 