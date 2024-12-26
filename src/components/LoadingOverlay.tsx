import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Text,
  ViewStyle,
} from 'react-native';
import {theme} from '@/theme';

interface Props {
  visible: boolean;
  message?: string;
  style?: ViewStyle;
}

export const LoadingOverlay = React.memo(({visible, message, style}: Props) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <View style={[styles.container, style]}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: theme.spacing.lg,
    borderRadius: theme.spacing.sm,
    alignItems: 'center',
    minWidth: 120,
  },
  message: {
    marginTop: theme.spacing.sm,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.body.fontSize,
  },
});
