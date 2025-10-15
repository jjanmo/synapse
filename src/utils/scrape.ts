import type { GroupedScrapedWebApis, ScrapedWebApiItem } from '@/types/webapis';

export function groupedByFirstLetter(items: ScrapedWebApiItem[]): GroupedScrapedWebApis {
  return items
    .sort((a, b) => a.id.localeCompare(b.id))
    .reduce<GroupedScrapedWebApis>((acc, item) => {
      const firstLetter = item.id.slice(0, 1);
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item);
      return acc;
    }, {});
}
