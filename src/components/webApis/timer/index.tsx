import Example from '@/components/webApis/Timer/Example';
import useTabs from '@/hooks/useTabs';
import Tabs from '@/components/common/Tabs';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';

interface Props {
  markdownContent: string;
}

const Timer = ({ markdownContent }: Props) => {
  const { currentTab, handleTab1Click, handleTab2Click } = useTabs();

  return (
    <div>
      <Tabs currentTab={currentTab} onTab1Click={handleTab1Click} onTab2Click={handleTab2Click} />
      {currentTab === 'description' && <MarkdownRenderer content={markdownContent} />}
      {currentTab === 'example' && <Example />}
    </div>
  );
};

export default Timer;
