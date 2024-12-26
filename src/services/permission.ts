import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

export const PermissionService = {
    async checkCamera() {
        const permission = Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
        });

        if (!permission) return false;

        try {
            const result = await check(permission);

            switch (result) {
                case RESULTS.GRANTED:
                    return true;
                case RESULTS.DENIED:
                    const requestResult = await request(permission);
                    return requestResult === RESULTS.GRANTED;
                default:
                    return false;
            }
        } catch (error) {
            console.error('Permission check failed:', error);
            return false;
        }
    },

    // 其他权限检查方法...
}; 