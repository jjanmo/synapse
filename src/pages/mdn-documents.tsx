import { useState } from 'react';
import type { Nullable } from '@/types/common';
import { useWebApiListQuery } from '@/queries/scrape';
import Loading from '@/components/common/Loading';
import Title from '@/components/documents/Title';
import styles from '@/pages/mdn-documents.module.css';
import ApiListModal from '@/components/documents/ApiListModal';

const SCRAPE_URL = 'https://developer.mozilla.org/ko/docs/Web/API';

const Documents = () => {
  const { data: groupedWebApis, isPending } = useWebApiListQuery(SCRAPE_URL);
  const [selectedWebApiKey, setSelectedWebApiKey] = useState<Nullable<string>>(null);

  const handleCloseModal = () => {
    setSelectedWebApiKey(null);
  };

  const handleWebApiClick = (id: string) => () => {
    setSelectedWebApiKey(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title />
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
        <ApiListModal
          apiList={groupedWebApis[selectedWebApiKey]}
          isOpen={!!selectedWebApiKey}
          title={selectedWebApiKey}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Documents;
