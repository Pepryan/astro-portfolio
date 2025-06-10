import { useState, useRef, useEffect } from 'react';
import { FiCopy, FiCheck, FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';

// Create a proper React component for pre
const PreBlock = ({ children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const codeElement = preRef.current?.querySelector('code');
    const textToCopy = codeElement?.textContent || '';

    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log('✅ Code copied successfully (MDX):', textToCopy.substring(0, 50) + '...');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('❌ Failed to copy (MDX):', err);
    }
  };

  const handleMobileTouch = () => {
    if (window.innerWidth <= 768) {
      setShowButton(true);
      console.log('📱 MDX Copy button shown on mobile');
      setTimeout(() => {
        setShowButton(false);
        console.log('📱 MDX Copy button hidden on mobile');
      }, 3000);
    }
  };

  return (
    <div className="relative group">
      <pre
        ref={preRef}
        onTouchStart={handleMobileTouch}
        onClick={handleMobileTouch}
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className={`
          absolute top-3 right-3 w-9 h-9 md:w-8 md:h-8 rounded-md transition-all duration-200
          bg-neutral-100/90 dark:bg-neutral-800/90 backdrop-blur-sm
          text-neutral-500 dark:text-neutral-400
          hover:bg-neutral-200 dark:hover:bg-neutral-700
          hover:text-neutral-700 dark:hover:text-neutral-200
          focus:outline-none focus:ring-1 focus:ring-blue-500
          ${showButton ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          border border-neutral-200/50 dark:border-neutral-600/50
          shadow-sm hover:shadow-md
          flex items-center justify-center
          ${copied
            ? 'bg-green-100/90 dark:bg-green-900/90 text-green-600 dark:text-green-400 border-green-300 dark:border-green-600'
            : ''
          }
        `}
        aria-label={copied ? 'Copied!' : 'Copy code'}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <FiCheck className="w-5 h-5 md:w-4 md:h-4 transition-transform duration-200" />
        ) : (
          <FiCopy className="w-5 h-5 md:w-4 md:h-4 transition-transform duration-200" />
        )}
      </button>
    </div>
  );
};

// Add ImageWithLightbox component
const ImageWithLightbox = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        className="inline-block"
        onClick={handleImageClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleImageClick();
          }
        }}
      >
        <img
          {...props}
          className="my-8 rounded-lg cursor-pointer hover:opacity-90 transition-opacity max-w-full h-auto"
          alt={props.alt || ''}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </span>

      {isOpen && isMounted && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
            aria-label="Close image preview"
          >
            <FiX className="w-6 h-6" />
          </button>

          <img
            {...props}
            className="rounded-lg max-h-[90vh] max-w-[90vw] object-contain"
            alt={props.alt || ''}
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
};

const MDXComponents = {
  // Basic elements
  img: (props: any) => <ImageWithLightbox {...props} />,
  a: ({ href, children }: any) => (
    <a href={href} className="text-blue-500 hover:text-blue-600 underline">
      {children}
    </a>
  ),
  pre: PreBlock,
  // Custom components can be added here
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mb-2 text-neutral-900 dark:text-neutral-100" {...props} />,
  p: (props: any) => <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="mb-4 pl-6 list-disc text-neutral-700 dark:text-neutral-300" {...props} />,
  ol: (props: any) => <ol className="mb-4 pl-6 list-decimal text-neutral-700 dark:text-neutral-300" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/50 rounded-r" {...props} />
  ),
  code: (props: any) => {
    // Inline code
    if (!props.className) {
      return <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    }
    // Block code (handled by pre)
    return <code {...props} />;
  },
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-neutral-300 dark:border-neutral-700" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-neutral-300 dark:border-neutral-700 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 font-semibold text-left" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-neutral-300 dark:border-neutral-700 px-4 py-2" {...props} />
  ),
};

export default MDXComponents;
