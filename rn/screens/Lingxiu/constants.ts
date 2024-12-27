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