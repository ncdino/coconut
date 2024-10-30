import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
// import 'highlight.js/styles/github.css';

// 마크다운을 렌더링하는 컴포넌트
const MarkdownRenderer = ({ children }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
