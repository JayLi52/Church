import { StorageService } from './storage';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    timestamp: number;
    level: LogLevel;
    message: string;
    data?: any;
}

class Logger {
    private readonly STORAGE_KEY = 'app_logs';
    private readonly MAX_LOGS = 1000;

    async log(level: LogLevel, message: string, data?: any) {
        const entry: LogEntry = {
            timestamp: Date.now(),
            level,
            message,
            data,
        };

        // 开发环境下在控制台输出
        if (__DEV__) {
            console[level](message, data);
        }

        await this.saveLog(entry);
    }

    info(message: string, data?: any) {
        return this.log('info', message, data);
    }

    warn(message: string, data?: any) {
        return this.log('warn', message, data);
    }

    error(message: string, data?: any) {
        return this.log('error', message, data);
    }

    debug(message: string, data?: any) {
        return this.log('debug', message, data);
    }

    private async saveLog(entry: LogEntry) {
        try {
            const logs = await this.getLogs();
            logs.push(entry);

            // 保持日志数量在限制内
            if (logs.length > this.MAX_LOGS) {
                logs.splice(0, logs.length - this.MAX_LOGS);
            }

            await StorageService.setItem(this.STORAGE_KEY, logs);
        } catch (error) {
            console.error('Failed to save log:', error);
        }
    }

    async getLogs(): Promise<LogEntry[]> {
        try {
            return (await StorageService.getItem<LogEntry[]>(this.STORAGE_KEY)) || [];
        } catch (error) {
            console.error('Failed to get logs:', error);
            return [];
        }
    }

    async clearLogs() {
        try {
            await StorageService.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear logs:', error);
        }
    }
}

export const logger = new Logger(); 