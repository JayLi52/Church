import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

import Header from '@components/CommonHeader';
import Statistics from './components/Statistics';
import BookCase from './components/BookCase';
import {transformStyles} from '@utils/index';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {showStatusBar} from '@store/statusBarSlice';
import {showTabBar} from '@store/tabSlice';
import {useDispatch} from 'react-redux';

function ReadingRoomHomeScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    // StatusBar.setBarStyle('dark-content')
    // navigation.navigate('BookManageNavigator', {
    //   screen: 'CommentList'
    // });
    dispatch(showTabBar());
    dispatch(showStatusBar());
  }, []);

  useFocusEffect(() => {
    dispatch(showTabBar());
    dispatch(showStatusBar());
  });
  return (
    <View style={styles.container}>
      <Header />
      <Statistics />
      <BookCase />
    </View>
  );
}

const styles = transformStyles({
  container: {
    backgroundColor: '#F6F6F6',
    flexDirection: 'column',
    flex: 1,
  },
});

export default ReadingRoomHomeScreen;
