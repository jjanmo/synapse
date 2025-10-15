import type { ScrapedWebApiItem } from '@/types/webapis';
import { axiosInstance } from '.';

export const getWebApiList = async (url: string) => {
  return axiosInstance.get<{ webApiList: ScrapedWebApiItem[] }>(`/api/scrape?url=${url}`);
};
