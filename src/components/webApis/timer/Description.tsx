import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import DescriptionLayout from "@/components/common/DescriptionLayout";

const Description = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch("/api/markdown/web-apis/timer.md");
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("마크다운 파일 로드 실패:", error);
      }
    };

    loadMarkdown();
  }, []);

  return (
    <DescriptionLayout>
      {!content && <div>로딩 중...</div>}
      {content && <MarkdownRenderer content={content} />}
    </DescriptionLayout>
  );
};

export default Description;
