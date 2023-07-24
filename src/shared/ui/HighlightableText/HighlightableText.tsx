const getHighlightedContent = (content: string, searchTerm: string) => {
  if (!searchTerm) return content;

  const regex = new RegExp(searchTerm, "gi");
  const matches = content.match(regex);

  if (!matches) return content;

  const highlightedContent = content.replace(
    regex,
    (match) => `<mark class="highlight">${match}</mark>`
  );
  return highlightedContent;
};

interface HighlightableTextProps {
  content: string;
  searchTerm: string;
}

export const HighlightableText = (props: HighlightableTextProps) => {
  const { content, searchTerm } = props;

  const highlightedText = getHighlightedContent(content, searchTerm);

  return <p dangerouslySetInnerHTML={{ __html: highlightedText }}></p>;
};
