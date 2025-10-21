import { useState } from "react";

const useTabs = () => {
  const [currentTab, setCurrentTab] = useState<"description" | "example">("description");

  const handleTab1Click = () => {
    setCurrentTab("description");
  };
  const handleTab2Click = () => {
    setCurrentTab("example");
  };

  return {
    currentTab,
    handleTab1Click,
    handleTab2Click,
  };
};

export default useTabs;
