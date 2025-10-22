import GlobalNavigationBar from '@/components/common/GlobalNavigationBar';
import { WEB_API_LIST } from '@/constants/home';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <GlobalNavigationBar />
      <main>
        <ul>
          {WEB_API_LIST.map((webApi) => {
            const { slug, title } = webApi;

            return (
              <li key={slug}>
                <Link href={`/web-apis/${slug}`}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Home;
