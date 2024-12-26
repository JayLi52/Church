import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {UserListItem} from './components/UserListItem';
import {TabBar} from './components/TabBar';
import {Header} from './components/Header';

const HomeScreen = () => {
  const {t} = useTranslation();

  const users = useSelector(state => state.users.list);

  const renderItem = useCallback(({item}) => <UserListItem user={item} />, []);

  return (
    <View style={styles.container}>
      <Header />
      <TabBar />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default React.memo(HomeScreen);
