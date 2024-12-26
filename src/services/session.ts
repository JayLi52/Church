import { StorageService } from './storage';
import { ApiService } from './api';
import { logger } from './logger';
import { analytics } from './analytics';

interface UserSession {
    token: string;
    refreshToken: string;
    expiresAt: number;
    userId: string;
}

interface LoginCredentials {
    username: string;
    password: string;
}

class SessionService {
    private readonly STORAGE_KEY = 'user_session';
    private currentSession: UserSession | null = null;
    private refreshPromise: Promise<void> | null = null;

    async init() {
        try {
            const session = await StorageService.getItem<UserSession>(this.STORAGE_KEY);
            if (session) {
                if (this.isSessionExpired(session)) {
                    await this.refreshSession(session);
                } else {
                    this.currentSession = session;
                }
            }
        } catch (error) {
            logger.error('Failed to initialize session:', error);
        }
    }

    async login(credentials: LoginCredentials): Promise<void> {
        try {
            const response = await ApiService.login(credentials);
            const session: UserSession = {
                token: response.token,
                refreshToken: response.refreshToken,
                expiresAt: Date.now() + response.expiresIn * 1000,
                userId: response.userId,
            };

            await this.saveSession(session);
            analytics.trackEvent('user_login', { userId: session.userId });
        } catch (error) {
            logger.error('Login failed:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            if (this.currentSession) {
                await ApiService.logout(this.currentSession.token);
                analytics.trackEvent('user_logout', { userId: this.currentSession.userId });
            }
        } catch (error) {
            logger.error('Logout failed:', error);
        } finally {
            await this.clearSession();
        }
    }

    async getToken(): Promise<string | null> {
        if (!this.currentSession) {
            return null;
        }

        if (this.isSessionExpired(this.currentSession)) {
            await this.refreshSession(this.currentSession);
        }

        return this.currentSession?.token || null;
    }

    isAuthenticated(): boolean {
        return !!this.currentSession && !this.isSessionExpired(this.currentSession);
    }

    private isSessionExpired(session: UserSession): boolean {
        // 提前5分钟刷新token
        return Date.now() > session.expiresAt - 5 * 60 * 1000;
    }

    private async refreshSession(session: UserSession) {
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = (async () => {
            try {
                const response = await ApiService.refreshToken(session.refreshToken);
                const newSession: UserSession = {
                    ...session,
                    token: response.token,
                    expiresAt: Date.now() + response.expiresIn * 1000,
                };

                await this.saveSession(newSession);
            } catch (error) {
                logger.error('Token refresh failed:', error);
                await this.clearSession();
                throw error;
            } finally {
                this.refreshPromise = null;
            }
        })();

        return this.refreshPromise;
    }

    private async saveSession(session: UserSession) {
        this.currentSession = session;
        await StorageService.setItem(this.STORAGE_KEY, session);
    }

    private async clearSession() {
        this.currentSession = null;
        await StorageService.removeItem(this.STORAGE_KEY);
    }
}

export const sessionService = new SessionService(); 