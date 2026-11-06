export const SITE = {
  name: 'Pavlos',
  title: 'Pavlos · Product designer',
  description: 'A living timeline of what I work on, write about and spend my time on.',
};

export const CATEGORIES = {
  design: { label: 'Product design', color: '#2F6B5A' },
  writing: { label: 'Writing', color: '#C08A2E' },
  hobby: { label: 'Hobbies', color: '#C2573C' },
  interest: { label: 'New interests', color: '#4F63B0' },
} as const;

export type CategoryId = keyof typeof CATEGORIES;
export const CATEGORY_IDS = Object.keys(CATEGORIES) as [CategoryId, ...CategoryId[]];
export const ENDED_COLOR = '#C9C3B8';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const iso = (d: Date) => d.toISOString().slice(0, 10);
export const monthYear = (d: Date) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const fullDate = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
