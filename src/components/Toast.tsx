import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {theme} from '@/theme';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Props {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Toast = React.memo(
  ({
    visible,
    message,
    type = 'info',
    duration = 3000,
    onHide,
    style,
  }: Props) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (visible) {
        show();
      }
    }, [visible]);

    const show = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide?.();
      });
    };

    if (!visible) return null;

    return (
      <TouchableWithoutFeedback onPress={onHide}>
        <View style={styles.container}>
          <Animated.View style={[styles.toast, styles[type], style, {opacity}]}>
            <Text style={styles.message}>{message}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  toast: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    minWidth: 120,
    maxWidth: '80%',
  },
  message: {
    color: '#fff',
    fontSize: theme.typography.body.fontSize,
    textAlign: 'center',
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  warning: {
    backgroundColor: theme.colors.warning,
  },
  info: {
    backgroundColor: theme.colors.primary,
  },
});
