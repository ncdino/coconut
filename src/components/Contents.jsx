import MarkdownRenderer from "./MarkdownRenderer";

export default function Contents({ content }) {
  return (
    <div className="flex justify-center">
      <MarkdownRenderer>{content}</MarkdownRenderer>
    </div>
  );
}
