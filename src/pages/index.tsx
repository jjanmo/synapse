import type { GroupedWebApiObject, WebApiItem } from '@/types/scrape';
import axios from 'axios';
import { useEffect, useState, type FC } from 'react';
import styles from '@/styles/home.module.css';
import { groupedByFirstLetter } from '@/utils/scrape';
import type { Nullable } from '@/types/common';

const SCRAPE_URL = 'https://developer.mozilla.org/ko/docs/Web/API';

const Home: FC = () => {
  const [groupedWebApiObject, setGroupedWebApiObject] = useState<Nullable<GroupedWebApiObject>>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<{ webApiList: WebApiItem[] }>(`/api/scrape?url=${SCRAPE_URL}`);
      setGroupedWebApiObject(groupedByFirstLetter(response.data.webApiList));
    };

    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Web API 목록</h1>
      <ul className={styles.list}>
        {Object.entries(groupedWebApiObject ?? {}).map(([firstLetter, webApiItems]) => {
          const firstWebApiText = webApiItems[0].title;
          const count = webApiItems.length;
          return (
            <li className={styles.item} key={firstLetter}>
              <div className={styles.firstLetter}>{firstLetter}</div>
              <div className={styles.firstItemText}>
                <span>{firstWebApiText}</span>
                {count > 1 && ` 외 ${count - 1}개`}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Home;
