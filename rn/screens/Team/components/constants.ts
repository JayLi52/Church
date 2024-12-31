export const TYPE_ICON_MAP = {
  question: {
    name: 'lightbulb',
    color: '#999',
    background: '#F5F5F5',
  },
  book: {
    name: 'book-open',
    color: '#FFB224',
    background: '#FFF5E6',
  },
  pray: {
    name: 'hands-praying',
    color: '#1890FF',
    background: '#E6F7FF',
  },
} as const;

export type CardType = 'question' | 'book' | 'pray'; 

export type CardStatus = 'todo' | 'pending' | 'completed';

export const CARD_STATUS_CONFIG = {
  todo: {
    background: '#FFF5E5',
    icon: 'clock' as const,
    iconColor: '#FFB224',
  },
  pending: {
    background: '#E6F7FF',
    icon: 'hourglass' as const,
    iconColor: '#1890FF',
  },
  completed: {
    background: '#F6FFED',
    icon: 'circle-check' as const,
    iconColor: '#52C41A',
  },
} as const; 