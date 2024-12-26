import { MMKV } from 'react-native-mmkv';
import { logger } from './logger';

interface PersistConfig<T> {
    key: string;
    whitelist?: (keyof T)[];
    blacklist?: (keyof T)[];
}

class PersistenceService {
    private storage = new MMKV({ id: 'app_state' });

    persist<T extends object>(state: T, config: PersistConfig<T>): void {
        try {
            let persistedState = { ...state };

            if (config.whitelist) {
                persistedState = Object.keys(state).reduce((acc, key) => {
                    if (config.whitelist?.includes(key as keyof T)) {
                        acc[key] = state[key as keyof T];
                    }
                    return acc;
                }, {} as T);
            }

            if (config.blacklist) {
                config.blacklist.forEach(key => {
                    delete persistedState[key];
                });
            }

            this.storage.set(config.key, JSON.stringify(persistedState));
        } catch (error) {
            logger.error('Failed to persist state:', error);
        }
    }

    hydrate<T>(config: PersistConfig<T>): Partial<T> | null {
        try {
            const persisted = this.storage.getString(config.key);
            return persisted ? JSON.parse(persisted) : null;
        } catch (error) {
            logger.error('Failed to hydrate state:', error);
            return null;
        }
    }

    remove(key: string): void {
        try {
            this.storage.delete(key);
        } catch (error) {
            logger.error('Failed to remove persisted state:', error);
        }
    }

    clear(): void {
        try {
            this.storage.clearAll();
        } catch (error) {
            logger.error('Failed to clear persisted states:', error);
        }
    }
}

export const persistenceService = new PersistenceService(); 