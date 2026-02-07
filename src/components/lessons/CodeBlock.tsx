'use client';

import { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
}

export default function CodeBlock({
    code,
    language = 'java',
    filename,
    showLineNumbers = true
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.trim().split('\n');

    // Simple syntax highlighting for Java
    const highlightLine = (line: string) => {
        // Keywords
        const keywords = /\b(public|private|protected|class|interface|extends|implements|static|final|void|int|double|float|boolean|String|new|return|if|else|for|while|switch|case|break|continue|try|catch|finally|throw|throws|import|package|this|super|null|true|false)\b/g;

        // Annotations
        const annotations = /(@\w+)/g;

        // Strings
        const strings = /("(?:[^"\\]|\\.)*")/g;

        // Comments
        const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/g;

        // Numbers
        const numbers = /\b(\d+\.?\d*[fFdDlL]?)\b/g;

        // Methods
        const methods = /\b(\w+)(?=\s*\()/g;

        let highlighted = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        highlighted = highlighted
            .replace(comments, '<span class="code-comment">$1</span>')
            .replace(strings, '<span class="code-string">$1</span>')
            .replace(annotations, '<span class="code-annotation">$1</span>')
            .replace(keywords, '<span class="code-keyword">$1</span>')
            .replace(numbers, '<span class="code-number">$1</span>');

        return highlighted;
    };

    return (
        <div className="code-block-container my-6 rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#1E1E2E]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D3F] border-b border-[#3D3D5C]">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27CA40]"></div>
                    </div>
                    {filename && (
                        <span className="text-sm text-gray-400 font-mono">{filename}</span>
                    )}
                    {!filename && language && (
                        <span className="text-xs text-gray-500 uppercase">{language}</span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#3D3D5C]"
                >
                    {copied ? (
                        <>
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Скопировано!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Копировать</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
                <pre className="p-4 text-sm font-mono leading-relaxed">
                    <code>
                        {lines.map((line, index) => (
                            <div key={index} className="flex">
                                {showLineNumbers && (
                                    <span className="select-none text-gray-600 w-8 text-right pr-4 flex-shrink-0">
                                        {index + 1}
                                    </span>
                                )}
                                <span
                                    className="text-gray-300 flex-1"
                                    dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }}
                                />
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}
