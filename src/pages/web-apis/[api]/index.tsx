import { useState, type FC } from 'react';
import Example from '@/components/webApis/timer/Example';
import Tabs from '@/components/common/Tabs';
import styles from '@/styles/pages/webapiDetail.module.css';

const WebApiPage: FC = () => {
  const [tab, setTab] = useState<'description' | 'example'>('description');

  const handleTab1Click = () => {
    setTab('description');
  };
  const handleTab2Click = () => {
    setTab('example');
  };

  return (
    <main className={styles.main}>
      <h1>Timer</h1>
      <Tabs currentTab={tab} onTab1Click={handleTab1Click} onTab2Click={handleTab2Click} />
      {tab === 'description' && <div>description</div>}
      {tab === 'example' && <Example />}
    </main>
  );
};

export default WebApiPage;
