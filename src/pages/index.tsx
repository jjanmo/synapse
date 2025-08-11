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
    <main className={styles.main}>
      <ul className={styles.list}>
        {Object.entries(groupedWebApiObject ?? {}).map(([key, value]) => (
          <li key={key}>
            <h2>{key}</h2>
            <ul>
              {value.map((item) => (
                <li key={item.url}>{item.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
