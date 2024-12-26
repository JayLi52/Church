import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {transformStyles} from '@utils/index';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/store';
import {togglePlayer} from '@store/slices/bibleSlice';

type FloatingPlayerProps = {
  onCoverPress: () => void;
  coverUrl: string;
  title: string;
};

export const FloatingPlayer = ({
  onCoverPress,
  coverUrl,
  title,
}: FloatingPlayerProps) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.bible.isPlaying);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.coverContainer} onPress={onCoverPress}>
        <Image source={{uri: coverUrl}} style={styles.cover} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => dispatch(togglePlayer())}>
        <FontAwesome
          name={isPlaying ? 'pause' : 'play'}
          size={25}
          color="#2E2E2E"
          iconStyle="solid"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playButton} onPress={onCoverPress}>
        <FontAwesome
          name="expand"
          size={25}
          color="#2E2E2E"
          iconStyle="solid"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = transformStyles({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 0,
    backgroundColor: '#FFC965',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    elevation: 5,
    width: 154,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  coverContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#333',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 16,
  },
});
