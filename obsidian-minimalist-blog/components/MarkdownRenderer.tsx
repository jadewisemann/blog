
import React from 'react';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parseContent = (text: string) => {
    const parts: React.ReactNode[] = [];
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let language = '';

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          language = line.trim().slice(3) || 'text';
          codeContent = [];
        } else {
          inCodeBlock = false;
          parts.push(<CodeBlock key={`code-${idx}`} language={language} code={codeContent.join('\n')} />);
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        parts.push(<h1 key={idx} className="text-3xl border-b border-[#b0bec5] pb-2 mb-6">{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        parts.push(<h2 key={idx} className="text-2xl mb-4">{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        parts.push(<h3 key={idx} className="text-xl mb-3">{line.slice(4)}</h3>);
      } 
      // Lists
      else if (line.trim().startsWith('- ')) {
        parts.push(<li key={idx} className="ml-6 list-disc mb-1">{parseInline(line.trim().slice(2))}</li>);
      }
      // Empty line
      else if (line.trim() === '') {
        parts.push(<div key={idx} className="h-4" />);
      }
      // Normal Paragraph
      else {
        parts.push(<p key={idx} className="mb-4 leading-relaxed">{parseInline(line)}</p>);
      }
    });

    return parts;
  };

  const parseInline = (text: string) => {
    // Very basic regex-based inline parser for demo
    let elements: (React.ReactNode | string)[] = [text];

    const replacePattern = (regex: RegExp, className: string, isLink: boolean = false) => {
      const nextElements: (React.ReactNode | string)[] = [];
      elements.forEach(el => {
        if (typeof el !== 'string') {
          nextElements.push(el);
          return;
        }
        const parts = el.split(regex);
        const matches = el.match(regex);
        parts.forEach((part, i) => {
          nextElements.push(part);
          if (matches && matches[i]) {
            const matchText = matches[i];
            if (isLink) {
              const linkMatch = matchText.match(/\[(.*?)\]\((.*?)\)/);
              if (linkMatch) {
                nextElements.push(<a key={i} href={linkMatch[2]} target="_blank" rel="noreferrer">{linkMatch[1]}</a>);
              }
            } else {
              const cleanText = matchText.replace(/[*_`]/g, '');
              nextElements.push(<span key={i} className={className}>{cleanText}</span>);
            }
          }
        });
      });
      elements = nextElements;
    };

    replacePattern(/`[^`]+`/g, 'inline-code bg-[#e0e0e0] px-1 rounded text-[#d70087] font-mono text-[0.9em]');
    replacePattern(/\*\*[^*]+\*\*/g, 'cm-strong font-extrabold text-[#0087af]');
    replacePattern(/\*[^*]+\*/g, 'cm-em italic font-semibold text-[#8700af]');
    replacePattern(/\[.*?\]\(.*?\)/g, '', true);

    return elements;
  };

  return (
    <div className="markdown-rendered max-w-4xl mx-auto px-10 py-12 bg-[#f3f3f3] min-h-full">
      {parseContent(content)}
    </div>
  );
};

export default MarkdownRenderer;
