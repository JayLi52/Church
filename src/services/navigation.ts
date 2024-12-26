import {
    createNavigationContainerRef,
    NavigationContainerRef,
    StackActions,
} from '@react-navigation/native';
import { logger } from './logger';
import { analytics } from './analytics';

export type RootStackParamList = {
    Home: undefined;
    UserProfile: { userId: string };
    Settings: undefined;
    // 添加其他路由参数类型
};

class NavigationService {
    private navigationRef = createNavigationContainerRef<RootStackParamList>();

    setNavigator(ref: NavigationContainerRef<RootStackParamList>) {
        this.navigationRef.current = ref;
    }

    navigate<RouteName extends keyof RootStackParamList>(
        name: RouteName,
        params?: RootStackParamList[RouteName],
    ) {
        try {
            if (this.navigationRef.isReady()) {
                this.navigationRef.navigate(name, params);
                analytics.trackScreenView(name as string);
            } else {
                logger.warn('Navigation attempted before navigator was ready');
            }
        } catch (error) {
            logger.error('Navigation failed:', error);
        }
    }

    push<RouteName extends keyof RootStackParamList>(
        name: RouteName,
        params?: RootStackParamList[RouteName],
    ) {
        try {
            if (this.navigationRef.isReady()) {
                this.navigationRef.dispatch(StackActions.push(name, params));
                analytics.trackScreenView(name as string);
            }
        } catch (error) {
            logger.error('Navigation push failed:', error);
        }
    }

    goBack() {
        try {
            if (this.navigationRef.isReady() && this.navigationRef.canGoBack()) {
                this.navigationRef.goBack();
            }
        } catch (error) {
            logger.error('Navigation back failed:', error);
        }
    }

    reset(routeName: keyof RootStackParamList) {
        try {
            if (this.navigationRef.isReady()) {
                this.navigationRef.reset({
                    index: 0,
                    routes: [{ name: routeName }],
                });
                analytics.trackScreenView(routeName as string);
            }
        } catch (error) {
            logger.error('Navigation reset failed:', error);
        }
    }

    getCurrentRoute() {
        return this.navigationRef.isReady()
            ? this.navigationRef.getCurrentRoute()
            : null;
    }
}

export const navigationService = new NavigationService(); 