import { Subject } from 'rxjs';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
    type?: ToastType;
    duration?: number;
}

interface ToastMessage {
    message: string;
    type: ToastType;
    duration: number;
}

class ToastService {
    private messageSubject = new Subject<ToastMessage>();
    private defaultOptions: ToastOptions = {
        type: 'info',
        duration: 3000,
    };

    message$ = this.messageSubject.asObservable();

    show(message: string, options?: ToastOptions) {
        const { type, duration } = { ...this.defaultOptions, ...options };
        this.messageSubject.next({
            message,
            type,
            duration,
        });
    }

    success(message: string, duration?: number) {
        this.show(message, { type: 'success', duration });
    }

    error(message: string, duration?: number) {
        this.show(message, { type: 'error', duration });
    }

    warning(message: string, duration?: number) {
        this.show(message, { type: 'warning', duration });
    }

    info(message: string, duration?: number) {
        this.show(message, { type: 'info', duration });
    }
}

export const toastService = new ToastService(); 