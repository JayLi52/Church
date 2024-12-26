import { Linking } from 'react-native';
import { logger } from './logger';
import { analytics } from './analytics';

interface DeepLinkConfig {
    screens: {
        [key: string]: {
            path: string;
            parse?: (params: Record<string, string>) => Record<string, any>;
        };
    };
}

class DeepLinkService {
    private config: DeepLinkConfig = {
        screens: {
            UserProfile: {
                path: 'user/:id',
                parse: params => ({
                    id: params.id,
                }),
            },
            // 添加其他页面的深链接配置
        },
    };

    async init() {
        try {
            // 处理应用打开时的初始 URL
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {
                this.handleDeepLink(initialUrl);
            }

            // 监听新的深链接
            Linking.addEventListener('url', ({ url }) => {
                this.handleDeepLink(url);
            });
        } catch (error) {
            logger.error('Failed to initialize deep link service:', error);
        }
    }

    private handleDeepLink(url: string) {
        try {
            const route = this.parseUrl(url);
            if (route) {
                // 这里可以通过导航服务进行页面跳转
                logger.info('Handling deep link:', { url, route });
                analytics.trackEvent('deep_link_opened', { url, route });
            }
        } catch (error) {
            logger.error('Failed to handle deep link:', error);
        }
    }

    private parseUrl(url: string) {
        const { pathname, searchParams } = new URL(url);
        const params = Object.fromEntries(searchParams);

        for (const [screen, config] of Object.entries(this.config.screens)) {
            const pattern = this.pathToPattern(config.path);
            const match = pathname.match(pattern);

            if (match) {
                const pathParams = this.extractPathParams(config.path, pathname);
                const parsedParams = config.parse?.(pathParams) || pathParams;

                return {
                    screen,
                    params: {
                        ...parsedParams,
                        ...params,
                    },
                };
            }
        }

        return null;
    }

    private pathToPattern(path: string) {
        return new RegExp(
            `^${path.replace(/:[a-zA-Z]+/g, '([^/]+)')}/?$`,
        );
    }

    private extractPathParams(path: string, pathname: string) {
        const params: Record<string, string> = {};
        const pathParts = path.split('/');
        const pathnameParts = pathname.split('/');

        for (let i = 0; i < pathParts.length; i++) {
            if (pathParts[i].startsWith(':')) {
                const paramName = pathParts[i].slice(1);
                params[paramName] = pathnameParts[i];
            }
        }

        return params;
    }
}

export const deepLinkService = new DeepLinkService(); 