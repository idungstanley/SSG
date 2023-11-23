import React, { useMemo } from 'react';

interface LinkifyTextProps {
  text: string;
  checker: boolean;
}

function LinkifyText({ text = '', checker }: LinkifyTextProps) {
  if (!text || checker) {
    // If text is null or undefined, return null or an appropriate fallback
    return null; // You can also return a default text here if you prefer
  }

  // Regular expression to match URLs in the text
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Memoize the result based on the text prop
  const result = useMemo(() => {
    // Split the text into an array of parts: text and links
    const parts = text.split(urlRegex);
    // Map each part to either regular text or a link
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        // If the part is a link, wrap it in an <a> tag
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {part}
          </a>
        );
      } else {
        // If the part is regular text, just display it
        return <span key={index}>{part}</span>;
      }
    });
  }, [text, urlRegex, checker]);
  return <>{result}</>;
}

export default LinkifyText;
