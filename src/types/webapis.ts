/** 크롤링을 해서 주는 WebAPI 아이템 타입 */
export type ScrapedWebApiItem = {
  id: string;
  title: string;
  url: string;
};
export type GroupedScrapedWebApis = {
  [key: string]: ScrapedWebApiItem[];
};

/** 커스터마이징(하드코딩)을 한 WebAPI 아이템 타입 */
export interface WebApiItem {
  title: string;
  slug: string;
  group: 'api' | 'interface';
  keywords?: string[];
}
