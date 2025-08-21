import { useState, type FC } from 'react';
import styles from '@/styles/home.module.css';
import type { Nullable } from '@/types/common';
import { useWebApiListQuery } from '@/queries/scrape';
import Loading from '@/components/common/Loading';
import WebApiModal from '@/components/home/WebApiModal';
import Introduction from '@/components/home/Introduction';

const SCRAPE_URL = 'https://developer.mozilla.org/ko/docs/Web/API';

const Home: FC = () => {
  const { data: groupedWebApis, isPending } = useWebApiListQuery(SCRAPE_URL);
  const [selectedWebApiKey, setSelectedWebApiKey] = useState<Nullable<string>>(null);

  const handleCloseModal = () => {
    setSelectedWebApiKey(null);
  };

  const handleWebApiClick = (id: string) => () => {
    setSelectedWebApiKey(id);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Introduction />
        <ul className={styles.list}>
          {isPending && <Loading overrideStyle={styles.loading} />}
          {groupedWebApis &&
            Object.entries(groupedWebApis).map(([firstLetter, webApiItems]) => {
              const firstWebApiText = webApiItems[0].title;
              const count = webApiItems.length;

              return (
                <li className={styles.item} key={firstLetter} onClick={handleWebApiClick(firstLetter)}>
                  <div className={styles.firstLetter}>{firstLetter}</div>
                  <div className={styles.firstItemText}>
                    <span>{firstWebApiText}</span>
                    {count > 1 && ` 외 ${count - 1}개`}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {groupedWebApis && selectedWebApiKey && (
        <WebApiModal
          webApiList={groupedWebApis[selectedWebApiKey]}
          isOpen={!!selectedWebApiKey}
          title={selectedWebApiKey}
          onCloseModal={handleCloseModal}
        />
      )}
    </main>
  );
};

export default Home;
