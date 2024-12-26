interface AnalyticsEvent {
    name: string;
    params?: Record<string, any>;
    timestamp: number;
}

class Analytics {
    private events: AnalyticsEvent[] = [];
    private readonly BATCH_SIZE = 10;
    private readonly FLUSH_INTERVAL = 60000; // 1分钟

    constructor() {
        // 定期发送事件
        setInterval(() => this.flush(), this.FLUSH_INTERVAL);
    }

    trackEvent(name: string, params?: Record<string, any>) {
        const event: AnalyticsEvent = {
            name,
            params,
            timestamp: Date.now(),
        };

        this.events.push(event);

        // 当事件数量达到批量大小时发送
        if (this.events.length >= this.BATCH_SIZE) {
            this.flush();
        }
    }

    trackScreenView(screenName: string) {
        this.trackEvent('screen_view', { screen_name: screenName });
    }

    trackUserAction(action: string, data?: Record<string, any>) {
        this.trackEvent('user_action', { action, ...data });
    }

    private async flush() {
        if (this.events.length === 0) return;

        const eventsToSend = [...this.events];
        this.events = [];

        try {
            // 这里应该调用实际的分析服务API
            console.log('Sending analytics events:', eventsToSend);
        } catch (error) {
            // 发送失败时，将事件放回队列
            this.events.unshift(...eventsToSend);
            console.error('Failed to send analytics events:', error);
        }
    }
}

export const analytics = new Analytics(); 