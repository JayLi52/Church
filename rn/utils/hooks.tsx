import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useBackHandler() {
    useEffect(() => {
        const handleBackPress = () => {
            // 直接退出
            console.log('退出 不返回stack 上一页')
            return true; // 阻止默认行为
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => backHandler.remove(); // 清理事件
    }, []);
}

export default {
    useBackHandler
};
