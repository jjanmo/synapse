import type { WebApiItem } from '@/types/webapis';

export const WEB_API_LIST: WebApiItem[] = [
  {
    title: '타이머 함수',
    slug: 'timer',
    group: 'interface',
    keywords: ['setInterval', 'setTimeout'],
  },
  {
    title: 'Web Worker',
    slug: 'Web_Workers_API',
    group: 'api',
  },
  {
    title: 'Message API',
    slug: 'Message_API',
    keywords: ['iframe', 'postMessage', 'Broadcast Channel API'],
    group: 'api',
  },
  {
    title: 'Animation API',
    slug: 'Animation_API',
    keywords: ['requestAnimationFrame', 'Web Animations API'],
    group: 'api',
  },
];
