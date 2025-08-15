import { getWebApiList } from '@/apis/scrape';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { groupedByFirstLetter } from '@/utils/scrape';

export const useWebApiListQuery = (url: string) => {
  return useQuery({
    queryKey: queryKeys.webApiList,
    queryFn: () => getWebApiList(url),
    select: (data) => {
      const groupedWebApis = groupedByFirstLetter(data.webApiList);
      return groupedWebApis;
    },
  });
};
