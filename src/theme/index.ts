export const theme = {
    colors: {
        primary: '#1890FF',
        secondary: '#666666',
        background: '#FFFFFF',
        text: {
            primary: '#333333',
            secondary: '#666666',
            tertiary: '#999999',
        },
        border: '#E5E5E5',
        error: '#FF4D4F',
        success: '#52C41A',
        warning: '#FAAD14',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    typography: {
        h1: {
            fontSize: 24,
            fontWeight: '600',
        },
        h2: {
            fontSize: 20,
            fontWeight: '600',
        },
        body: {
            fontSize: 14,
            fontWeight: 'normal',
        },
        caption: {
            fontSize: 12,
            fontWeight: 'normal',
        },
    },
};

export type Theme = typeof theme; 