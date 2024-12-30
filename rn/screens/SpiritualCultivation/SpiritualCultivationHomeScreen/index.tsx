import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

import Header from '@components/Header';
import StudyingClassics from '@components/StudyingClassics';
import Statistics from './components/Statistics';
import SpiritualCultivationCase from './components/SpiritualCultivationCase';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

function SpiritualCultivationHomeScreen(): React.JSX.Element {
  // const navigation = useNavigation();
  // useFocusEffect(() => {
  //   navigation.navigate('BookManageNavigator', {
  //     screen: 'LingxiuHome',
  //   });
  // });
  return (
    <View style={styles.container}>
      <Header />
      <Statistics />
      <SpiritualCultivationCase />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flexDirection: 'column',
    flex: 1,
  },
});

export default SpiritualCultivationHomeScreen;
