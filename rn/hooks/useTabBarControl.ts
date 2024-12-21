import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { showTabBar } from '@store/tabSlice';
import { resetStatusBar } from '@store/statusBarSlice';

export const useTabBarControl = () => {
    const dispatch = useDispatch();

    useFocusEffect(
        () => {
            // 页面获得焦点时显示TabBar
            dispatch(showTabBar());
            dispatch(resetStatusBar());
        }
    );
}; 