import Description from "@/components/webApis/timer/Description";
import Example from "@/components/webApis/timer/Example";
import useTabs from "@/hooks/useTabs";
import Tabs from "@/components/common/Tabs";

const Timer = () => {
  const { currentTab, handleTab1Click, handleTab2Click } = useTabs();

  return (
    <div>
      <Tabs currentTab={currentTab} onTab1Click={handleTab1Click} onTab2Click={handleTab2Click} />
      {currentTab === "description" && <Description />}
      {currentTab === "example" && <Example />}
    </div>
  );
};

export default Timer;
