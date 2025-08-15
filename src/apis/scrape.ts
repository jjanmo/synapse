import type { WebApiItem } from '@/types/scrape';
import { axiosInstance } from '.';

export const getWebApiList = async (url: string) => {
  return axiosInstance.get<{ webApiList: WebApiItem[] }>(`/api/scrape?url=${url}`);
};
