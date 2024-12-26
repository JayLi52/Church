import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {useNetworkStore} from '@/services/network';
import {theme} from '@/theme';

export const NetworkStatus = React.memo(() => {
  const {isConnected, type} = useNetworkStore();
  const translateY = React.useRef(new Animated.Value(-50)).current;

  React.useEffect(() => {
    Animated.spring(translateY, {
      toValue: isConnected ? -50 : 0,
      useNativeDriver: true,
      bounciness: 8,
    }).start();
  }, [isConnected]);

  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <View style={styles.content}>
        <Text style={styles.text}>
          {isConnected
            ? `已连接到${type === 'wifi' ? 'WiFi' : '移动网络'}`
            : '网络连接已断开'}
        </Text>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  content: {
    backgroundColor: theme.colors.error,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: theme.typography.caption.fontSize,
  },
});
