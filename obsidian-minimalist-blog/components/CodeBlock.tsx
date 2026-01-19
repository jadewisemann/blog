
import React from 'react';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const lines = code.trim().split('\n');

  // Simple pseudo-highlighter based on Obsidian styles
  const highlightLine = (line: string) => {
    return line
      .replace(/(\".*?\"|\'.*?\')/g, '<span style="color: #5f8700;">$1</span>') // String
      .replace(/\b(def|class|if|else|elif|for|while|return|import|from|as|in|is|not|and|or)\b/g, '<span style="color: #8700af;">$1</span>') // Keyword
      .replace(/\b(print|id|sorted|len|range|list)\b/g, '<span style="color: #652d90;">$1</span>') // Function
      .replace(/\b(\d+)\b/g, '<span style="color: #d75f00;">$1</span>') // Number
      .replace(/(#.*)/g, '<span style="color: #878787; font-style: italic;">$1</span>'); // Comment
  };

  return (
    <div className="my-6 rounded-md overflow-hidden bg-[#e0e0e0] border border-[#b0bec5] font-mono text-sm group relative">
      <div className="absolute right-3 top-2 text-[10px] text-[#757575] uppercase opacity-50 select-none">
        {language}
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="hover:bg-[#dcdcdc]">
              <td className="w-10 text-right pr-4 text-[#9e9e9e] select-none text-xs align-top pt-[2px]">
                {i + 1}
              </td>
              <td className="py-[2px] pl-2 break-all whitespace-pre-wrap">
                <span dangerouslySetInnerHTML={{ __html: highlightLine(line) }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeBlock;
