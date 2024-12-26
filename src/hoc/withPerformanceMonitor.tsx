import React from 'react';
import {PerformanceMonitor} from '@/components/PerformanceMonitor';

export function withPerformanceMonitor<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  name: string,
) {
  return function WithPerformanceMonitorComponent(props: P) {
    return (
      <PerformanceMonitor name={name}>
        <WrappedComponent {...props} />
      </PerformanceMonitor>
    );
  };
}
