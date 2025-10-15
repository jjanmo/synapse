import { useState, type FC } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import Example from '@/components/webApis/timer/Example';
import Tabs from '@/components/common/Tabs';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import styles from '@/styles/pages/webapiDetail.module.css';

interface Props {
  markdownContent: string;
}

const WebApiPage: FC<Props> = ({ markdownContent }) => {
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
      {tab === 'description' && <MarkdownRenderer content={markdownContent} />}
      {tab === 'example' && <Example />}
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { api: 'timer' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const api = params?.api as string;

  try {
    const contentFilePath = path.join(process.cwd(), 'content', 'web-apis', `${api}.md`);
    const markdownContent = fs.readFileSync(contentFilePath, 'utf8');

    return {
      props: {
        markdownContent,
      },
    };
  } catch (error) {
    // @TODO 실제 UI에서 에러 처리 추가
    console.error('마크다운 파일 로드 실패:', error);
    return {
      props: {
        markdownContent: '# 콘텐츠를 찾을 수 없습니다.',
      },
    };
  }
};

export default WebApiPage;
