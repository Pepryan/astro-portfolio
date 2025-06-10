/**
 * Calculate reading time for blog posts with improved accuracy
 * Based on average reading speeds and content complexity
 */

interface ReadingTimeOptions {
  wordsPerMinute?: number;
  includeCodeBlocks?: boolean;
  includeImages?: boolean;
}

interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

export function calculateReadingTime(
  content: string,
  options: ReadingTimeOptions = {}
): ReadingTimeResult {
  const {
    wordsPerMinute = 200, // Average reading speed
    includeCodeBlocks = true,
    includeImages = true
  } = options;

  let processedContent = content;

  // Remove frontmatter if present
  processedContent = processedContent.replace(/^---[\s\S]*?---/, '');

  // Count and handle images
  const imageMatches = processedContent.match(/!\[.*?\]\(.*?\)/g) || [];
  const imageCount = imageMatches.length;
  
  if (!includeImages) {
    processedContent = processedContent.replace(/!\[.*?\]\(.*?\)/g, '');
  }

  // Count and handle code blocks
  const codeBlockMatches = processedContent.match(/```[\s\S]*?```/g) || [];
  const inlineCodeMatches = processedContent.match(/`[^`]+`/g) || [];
  
  let codeBlockWords = 0;
  let inlineCodeWords = 0;

  if (includeCodeBlocks) {
    // Code blocks are read slower (assume 100 WPM for code)
    codeBlockWords = codeBlockMatches.reduce((acc, block) => {
      const codeContent = block.replace(/```[\w]*\n?/, '').replace(/```$/, '');
      return acc + codeContent.trim().split(/\s+/).length;
    }, 0);

    inlineCodeWords = inlineCodeMatches.reduce((acc, code) => {
      const codeContent = code.replace(/`/g, '');
      return acc + codeContent.trim().split(/\s+/).length;
    }, 0);
  } else {
    // Remove code blocks and inline code
    processedContent = processedContent.replace(/```[\s\S]*?```/g, '');
    processedContent = processedContent.replace(/`[^`]+`/g, '');
  }

  // Remove markdown syntax
  processedContent = processedContent
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/>\s/g, '') // Blockquotes
    .replace(/^\s*[-*+]\s/gm, '') // List items
    .replace(/^\s*\d+\.\s/gm, '') // Numbered lists
    .replace(/\|.*?\|/g, '') // Tables
    .replace(/---+/g, '') // Horizontal rules
    .replace(/\n{2,}/g, '\n') // Multiple newlines
    .trim();

  // Count regular words
  const words = processedContent.split(/\s+/).filter(word => word.length > 0);
  const regularWordCount = words.length;

  // Calculate total reading time
  const regularReadingTime = regularWordCount / wordsPerMinute;
  const codeReadingTime = (codeBlockWords + inlineCodeWords) / (wordsPerMinute * 0.5); // Code is read slower
  const imageReadingTime = imageCount * 0.2; // 12 seconds per image

  const totalMinutes = Math.max(1, Math.ceil(regularReadingTime + codeReadingTime + imageReadingTime));
  const totalWords = regularWordCount + codeBlockWords + inlineCodeWords;

  return {
    minutes: totalMinutes,
    words: totalWords,
    text: `${totalMinutes} min read`
  };
}

/**
 * Simple reading time calculation for compatibility
 */
export function simpleReadingTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
