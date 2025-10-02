import React, { useState } from 'react'

interface SourceSampleProps {
  code: string
  language?: string
  className?: string
}

const SourceSample: React.FC<SourceSampleProps> = ({ 
  code, 
  language = 'tsx',
  className = '' 
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Falha ao copiar código:', err)
    }
  }

  const highlightCode = (code: string) => {
    // Escapa HTML primeiro
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Aplica syntax highlighting básico
    escaped = escaped
      .replace(/\b(import|export|const|let|var|function|class|interface|type|from|as|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|super|extends|implements|public|private|protected|static|readonly|async|await|yield)\b/g, '<span class="keyword">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');

    return escaped;
  }

  return (
    <div className={`source-sample ${className}`}>
      <div className="source-sample__header">
        <span className="source-sample__language">{language.toUpperCase()}</span>
        <button 
          className="source-sample__copy-btn"
          onClick={handleCopy}
          title={copied ? 'Copiado!' : 'Copiar código'}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>
      <pre className="editor-code">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  )
}

export default SourceSample
