import { Alert } from 'react-native';
import i18n from '@/i18n';

export class AppError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

export const handleError = (error: unknown) => {
    if (error instanceof AppError) {
        Alert.alert(i18n.t('common.error'), error.message);
    } else if (error instanceof Error) {
        Alert.alert(i18n.t('common.error'), error.message);
    } else {
        Alert.alert(i18n.t('common.error'), i18n.t('common.unknownError'));
    }
}; 