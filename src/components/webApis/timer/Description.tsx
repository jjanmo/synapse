import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import DescriptionLayout from '@/components/layouts/DescriptionLayout';

interface Props {
  content: string;
}

const Description = ({ content }: Props) => {
  return (
    <DescriptionLayout>
      {!content && <div>로딩 중...</div>}
      {content && <MarkdownRenderer content={content} />}
    </DescriptionLayout>
  );
};

export default Description;
