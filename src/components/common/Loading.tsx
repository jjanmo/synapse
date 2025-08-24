import type { FC } from 'react';
import styles from '@/styles/components/loading.module.css';
import { cn } from '@/utils/styles';

interface Props {
  overrideStyle?: string;
}

const Loading: FC<Props> = ({ overrideStyle }) => {
  return (
    <div className={cn(styles.loadingContainer, overrideStyle)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.loadingSpinner}
      >
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </svg>
    </div>
  );
};

export default Loading;
