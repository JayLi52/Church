import { InteractionManager } from 'react-native';
import { StorageService } from './storage';

interface PerformanceMetric {
    name: string;
    startTime: number;
    endTime: number;
    duration: number;
}

class PerformanceMonitor {
    private metrics: Map<string, PerformanceMetric> = new Map();
    private readonly STORAGE_KEY = 'performance_metrics';

    startMeasure(name: string) {
        this.metrics.set(name, {
            name,
            startTime: performance.now(),
            endTime: 0,
            duration: 0,
        });
    }

    endMeasure(name: string) {
        const metric = this.metrics.get(name);
        if (!metric) return;

        metric.endTime = performance.now();
        metric.duration = metric.endTime - metric.startTime;

        // 异步保存指标
        InteractionManager.runAfterInteractions(() => {
            this.saveMetric(metric);
        });
    }

    private async saveMetric(metric: PerformanceMetric) {
        try {
            const existingMetrics = await StorageService.getItem<PerformanceMetric[]>(
                this.STORAGE_KEY,
            );
            const metrics = existingMetrics || [];
            metrics.push(metric);
            await StorageService.setItem(this.STORAGE_KEY, metrics);
        } catch (error) {
            console.error('Failed to save performance metric:', error);
        }
    }

    async getMetrics(): Promise<PerformanceMetric[]> {
        try {
            return (
                (await StorageService.getItem<PerformanceMetric[]>(this.STORAGE_KEY)) || []
            );
        } catch (error) {
            console.error('Failed to get performance metrics:', error);
            return [];
        }
    }
}

export const performanceMonitor = new PerformanceMonitor(); 