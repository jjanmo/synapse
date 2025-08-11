import type { GroupedWebApiObject, WebApiItem } from '@/types/scrape';

export function groupedByFirstLetter(items: WebApiItem[]): GroupedWebApiObject {
  return items.reduce((acc, item) => {
    const firstLetter = item.title.slice(0, 1);
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as GroupedWebApiObject);
}
