import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {performanceMonitor} from '@/services/performance';
import {theme} from '@/theme';

interface Props {
  name: string;
  children: React.ReactNode;
}

export const PerformanceMonitor = React.memo(({name, children}: Props) => {
  const [renderTime, setRenderTime] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      setRenderTime(duration);
      performanceMonitor.endMeasure(name);
    };
  }, [name]);

  useEffect(() => {
    performanceMonitor.startMeasure(name);
  }, [name]);

  if (__DEV__) {
    return (
      <View>
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>
            {`${name} render time: ${renderTime.toFixed(2)}ms`}
          </Text>
        </View>
        {children}
      </View>
    );
  }

  return <>{children}</>;
});

const styles = StyleSheet.create({
  debugInfo: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.xs,
    zIndex: 999,
  },
  debugText: {
    color: '#fff',
    fontSize: 10,
  },
});
