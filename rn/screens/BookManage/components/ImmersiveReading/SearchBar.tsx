import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';

type SearchBarProps = {
  showSearch: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  setShowSearch: (show: boolean) => void;
};

export const SearchBar = ({
  showSearch,
  searchText,
  setSearchText,
  setShowSearch,
}: SearchBarProps) => {
  return (
    <View style={[styles.searchBar, !showSearch && styles.hidden]}>
      <TextInput
        style={styles.searchInput}
        placeholder="搜索内容"
        value={searchText}
        onChangeText={setSearchText}
        selectionColor={'#FFB224'}
      />
      <TouchableOpacity onPress={() => setShowSearch(false)}>
        <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
      </TouchableOpacity>
    </View>
  );
};

const styles = transformStyles({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  searchInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#F6F6F6',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  hidden: {
    display: 'none',
  },
});
