import MarkdownRenderer from '@/components/common/MarkdownRenderer';

interface Props {
  content: string;
}

const Description = ({ content }: Props) => {
  return (
    <div>
      {!content && <div>로딩 중...</div>}
      {content && <MarkdownRenderer content={content} />}
    </div>
  );
};

export default Description;
