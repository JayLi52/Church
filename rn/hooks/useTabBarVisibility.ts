import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {hideTabBar, showTabBar} from '@store/tabSlice';
import {hideStatusBar, showStatusBar} from '@store/statusBarSlice';
import { useFocusEffect } from '@react-navigation/native';

type VisibilityOptions = {
  visible?: boolean;
  focusEffect?: boolean;
};

export const useTabBarVisibility = (options: VisibilityOptions = {}) => {
  const {visible = true} = options;
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      dispatch(showTabBar());
      dispatch(showStatusBar());
    } else {
      dispatch(hideTabBar());
      dispatch(hideStatusBar());
    }
  }, [dispatch, visible]);

  useFocusEffect(() => {
      if (visible) {
        dispatch(showTabBar());
        dispatch(showStatusBar());
      } else {
        dispatch(hideTabBar());
        dispatch(hideStatusBar());
      }
  });
};
