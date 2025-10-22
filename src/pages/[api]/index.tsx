import type { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import styles from '@/pages/[api]/WebApiDetailPage.module.css';
import { WEB_API_LIST } from '@/constants/home';
import Timer from '@/components/webApis/Timer';

interface Props {
  markdownContent?: string;
}

const WebApiDetail = ({ markdownContent }: Props) => {
  return <div className={styles.container}>{markdownContent && <Timer markdownContent={markdownContent} />}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = WEB_API_LIST.map((webApi) => ({ params: { api: webApi.slug } }));

  return {
    paths,
    fallback: false, // false인 경우 허용되지 않은 주소로 접근시 404 페이지 반환
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const apiSlug = params?.api as string;

  try {
    const contentFilePath = path.join(process.cwd(), 'content', 'web-apis', `${apiSlug}.md`);
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

export default WebApiDetail;
