import { InteractionManager } from 'react-native';
import { configService } from './config';
import { sessionService } from './session';
import { notificationService } from './notification';
import { deepLinkService } from './deeplink';
import { logger } from './logger';
import { performanceMonitor } from './performance';

interface StartupTask {
    name: string;
    task: () => Promise<void>;
    critical?: boolean;
}

class StartupService {
    private tasks: StartupTask[] = [
        {
            name: 'Initialize Session',
            task: () => sessionService.init(),
            critical: true,
        },
        {
            name: 'Initialize Config',
            task: () => Promise.resolve(configService.init()),
            critical: true,
        },
        {
            name: 'Initialize Notifications',
            task: () => notificationService.init(),
        },
        {
            name: 'Initialize Deep Links',
            task: () => deepLinkService.init(),
        },
    ];

    async start() {
        performanceMonitor.startMeasure('app_startup');

        try {
            // 首先执行关键任务
            const criticalTasks = this.tasks.filter(task => task.critical);
            await Promise.all(
                criticalTasks.map(async task => {
                    performanceMonitor.startMeasure(`startup_${task.name}`);
                    await task.task();
                    performanceMonitor.endMeasure(`startup_${task.name}`);
                }),
            );

            // 非关键任务在交互完成后执行
            const nonCriticalTasks = this.tasks.filter(task => !task.critical);
            InteractionManager.runAfterInteractions(() => {
                nonCriticalTasks.forEach(async task => {
                    try {
                        performanceMonitor.startMeasure(`startup_${task.name}`);
                        await task.task();
                        performanceMonitor.endMeasure(`startup_${task.name}`);
                    } catch (error) {
                        logger.error(`Non-critical startup task ${task.name} failed:`, error);
                    }
                });
            });

            performanceMonitor.endMeasure('app_startup');
        } catch (error) {
            logger.error('Critical startup tasks failed:', error);
            throw error;
        }
    }

    addTask(task: StartupTask) {
        this.tasks.push(task);
    }
}

export const startupService = new StartupService(); 