import { WEB_API_LIST } from '@/constants/home';
import Link from 'next/link';

const Home = () => {
  return (
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
  );
};

export default Home;
