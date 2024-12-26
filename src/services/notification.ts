import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { StorageService } from './storage';
import { logger } from './logger';

interface PushNotification {
    title: string;
    body: string;
    data?: Record<string, any>;
}

class NotificationService {
    private readonly STORAGE_KEY = 'fcm_token';

    async init() {
        try {
            await this.requestPermission();
            await this.setupFCM();
            await this.setupNotificationListeners();
        } catch (error) {
            logger.error('Failed to initialize notification service:', error);
        }
    }

    private async requestPermission() {
        if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (!enabled) {
                throw new Error('User declined push notifications');
            }
        }
    }

    private async setupFCM() {
        const token = await messaging().getToken();
        await StorageService.setItem(this.STORAGE_KEY, token);

        // 监听 token 刷新
        messaging().onTokenRefresh(async newToken => {
            await StorageService.setItem(this.STORAGE_KEY, newToken);
            // 这里可以将新 token 发送到服务器
        });
    }

    private setupNotificationListeners() {
        // 应用在前台时收到通知
        messaging().onMessage(async remoteMessage => {
            this.handleNotification({
                title: remoteMessage.notification?.title || '',
                body: remoteMessage.notification?.body || '',
                data: remoteMessage.data,
            });
        });

        // 应用在后台时点击通知
        messaging().onNotificationOpenedApp(remoteMessage => {
            this.handleNotificationOpen({
                title: remoteMessage.notification?.title || '',
                body: remoteMessage.notification?.body || '',
                data: remoteMessage.data,
            });
        });

        // 应用完全关闭时点击通知打开
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                this.handleNotificationOpen({
                    title: remoteMessage.notification?.title || '',
                    body: remoteMessage.notification?.body || '',
                    data: remoteMessage.data,
                });
            }
        });
    }

    private handleNotification(notification: PushNotification) {
        // 处理前台通知，可以显示自定义通知UI
        logger.info('Received foreground notification:', notification);
    }

    private handleNotificationOpen(notification: PushNotification) {
        // 处理通知点击，可以进行页面导航等操作
        logger.info('Notification opened:', notification);
    }

    async getToken(): Promise<string | null> {
        return StorageService.getItem<string>(this.STORAGE_KEY);
    }
}

export const notificationService = new NotificationService(); 