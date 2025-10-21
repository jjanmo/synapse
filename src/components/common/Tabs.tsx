import styles from "@/styles/components/tabs.module.css";
import { cn } from "@/utils/styles";

interface Props {
  currentTab: "description" | "example";
  onTab1Click: () => void;
  onTab2Click: () => void;
}
const Tabs = ({ currentTab, onTab1Click, onTab2Click }: Props) => {
  return (
    <div className={styles.container}>
      <button className={cn(styles.button, currentTab === "description" && styles.active)} onClick={onTab1Click}>
        Description
      </button>
      <button className={cn(styles.button, currentTab === "example" && styles.active)} onClick={onTab2Click}>
        Example
      </button>
    </div>
  );
};

export default Tabs;
