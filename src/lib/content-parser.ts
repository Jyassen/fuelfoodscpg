import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import type {
  WordPressFrontmatter,
  WordPressPage,
  ParsedContent,
  ContentHeading,
  SearchIndexEntry,
} from './types';

// ============================================================================
// CONTENT DIRECTORY CONSTANTS
// ============================================================================

export const CONTENT_PATHS = {
  pages: path.join(process.cwd(), '../../content/pages'),
  posts: path.join(process.cwd(), '../../content/posts'),
  images: path.join(process.cwd(), '../../content/images'),
  root: path.join(process.cwd(), '../../content'),
} as const;

// ============================================================================
// MARKDOWN PARSING UTILITIES
// ============================================================================

/**
 * Parse markdown file with frontmatter extraction
 */
export function parseMarkdownFile<T = WordPressFrontmatter>(
  filePath: string
): ParsedContent<T> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const {
      data: frontmatter,
      content,
      excerpt,
    } = matter(fileContent, {
      excerpt: true,
      excerpt_separator: '<!-- more -->',
    });

    // Calculate reading time (average 200 words per minute)
    const wordCount = content
      .split(/\s+/)
      .filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Extract headings for table of contents
    const headings = extractHeadings(content);

    return {
      frontmatter: frontmatter as T,
      content,
      excerpt: excerpt || generateExcerpt(content),
      readingTime,
      wordCount,
      headings,
    };
  } catch (error) {
    throw new Error(`Failed to parse markdown file ${filePath}: ${error}`);
  }
}

/**
 * Parse WordPress page from markdown file
 */
export function parseWordPressPage(filePath: string): WordPressPage {
  const parsed = parseMarkdownFile<WordPressFrontmatter>(filePath);

  return {
    frontmatter: parsed.frontmatter,
    content: parsed.content,
    rawContent: fs.readFileSync(filePath, 'utf8'),
    filePath,
    excerpt: parsed.excerpt,
  };
}

/**
 * Get all WordPress pages from the content directory
 */
export function getAllWordPressPages(): WordPressPage[] {
  try {
    const pagesDir = CONTENT_PATHS.pages;

    if (!fs.existsSync(pagesDir)) {
      console.warn(`Pages directory not found: ${pagesDir}`);
      return [];
    }

    const fileNames = fs.readdirSync(pagesDir);
    const pages = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const filePath = path.join(pagesDir, fileName);
        return parseWordPressPage(filePath);
      })
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      );

    return pages;
  } catch (error) {
    console.error('Error reading WordPress pages:', error);
    return [];
  }
}

/**
 * Get WordPress page by slug
 */
export function getWordPressPageBySlug(slug: string): WordPressPage | null {
  try {
    const filePath = path.join(CONTENT_PATHS.pages, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return parseWordPressPage(filePath);
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error);
    return null;
  }
}

// ============================================================================
// CONTENT PROCESSING UTILITIES
// ============================================================================

/**
 * Convert markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const processor = remark()
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkHtml, { sanitize: false });

  const result = await processor.process(markdown);
  return result.toString();
}

/**
 * Extract headings from markdown content
 */
export function extractHeadings(content: string): ContentHeading[] {
  const headings: ContentHeading[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length as 1 | 2 | 3 | 4 | 5 | 6;
      const text = match[2].trim();
      const slug = slugify(text);

      headings.push({
        level,
        text,
        slug,
      });
    }
  }

  // Build hierarchical structure
  return buildHeadingHierarchy(headings);
}

/**
 * Build hierarchical heading structure
 */
function buildHeadingHierarchy(headings: ContentHeading[]): ContentHeading[] {
  const result: ContentHeading[] = [];
  const stack: ContentHeading[] = [];

  for (const heading of headings) {
    // Remove headings from stack that are at same or deeper level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    // If stack is empty, this is a top-level heading
    if (stack.length === 0) {
      result.push(heading);
    } else {
      // Add as child to the last heading in stack
      const parent = stack[stack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(heading);
    }

    stack.push(heading);
  }

  return result;
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxLength = 160): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\n\s*\n/g, ' ') // Replace multiple newlines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }

  return truncated + '...';
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200
): number {
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Create slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================================================
// SEARCH INDEX UTILITIES
// ============================================================================

/**
 * Create search index entry from WordPress page
 */
export function createSearchIndexEntry(page: WordPressPage): SearchIndexEntry {
  const keywords = extractKeywords(page.content, page.frontmatter.title);

  return {
    id: page.frontmatter.slug,
    type: 'page',
    title: page.frontmatter.title,
    slug: page.frontmatter.slug,
    excerpt: page.excerpt || generateExcerpt(page.content),
    content: page.content,
    keywords,
    url: `/${page.frontmatter.slug}`,
    lastModified: new Date(page.frontmatter.modified || page.frontmatter.date),
    searchWeight: calculateSearchWeight(page.frontmatter.title, keywords),
  };
}

/**
 * Extract keywords from content
 */
function extractKeywords(content: string, title: string): string[] {
  const keywords = new Set<string>();

  // Add title words
  title
    .toLowerCase()
    .split(/\s+/)
    .forEach(word => {
      if (word.length > 2) keywords.add(word);
    });

  // Extract important words from content
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  // Simple frequency analysis for keyword extraction
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });

  // Get top 15 most frequent words (excluding common stop words)
  const stopWords = new Set([
    'that',
    'with',
    'have',
    'this',
    'will',
    'your',
    'from',
    'they',
    'know',
    'want',
    'been',
    'good',
    'much',
    'some',
    'time',
    'very',
    'when',
    'come',
    'here',
    'just',
    'like',
    'long',
    'make',
    'many',
    'over',
    'such',
    'take',
    'than',
    'them',
    'well',
    'were',
  ]);

  const topWords = Array.from(wordFreq.entries())
    .filter(([word]) => !stopWords.has(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);

  topWords.forEach(word => keywords.add(word));

  return Array.from(keywords);
}

/**
 * Calculate search weight based on various factors
 */
function calculateSearchWeight(title: string, keywords: string[]): number {
  let weight = 1;

  // Boost for certain keywords
  const importantKeywords = [
    'microgreens',
    'organic',
    'fresh',
    'delivery',
    'subscription',
    'healthy',
    'nutrition',
  ];
  const hasImportantKeywords = keywords.some(keyword =>
    importantKeywords.some(important => keyword.includes(important))
  );

  if (hasImportantKeywords) weight += 0.5;

  // Boost for product pages
  if (
    title.toLowerCase().includes('mix') ||
    title.toLowerCase().includes('blend')
  ) {
    weight += 0.3;
  }

  // Boost for main pages
  const mainPages = ['home', 'shop', 'about', 'contact'];
  if (mainPages.some(page => title.toLowerCase().includes(page))) {
    weight += 0.4;
  }

  return weight;
}

// ============================================================================
// BATCH PROCESSING UTILITIES
// ============================================================================

/**
 * Process all content files and create search index
 */
export function buildContentSearchIndex(): SearchIndexEntry[] {
  const pages = getAllWordPressPages();
  return pages.map(createSearchIndexEntry);
}

/**
 * Get content statistics
 */
export function getContentStatistics() {
  const pages = getAllWordPressPages();

  const stats = {
    totalPages: pages.length,
    publishedPages: pages.filter(p => p.frontmatter.status === 'publish')
      .length,
    draftPages: pages.filter(p => p.frontmatter.status === 'draft').length,
    totalWords: pages.reduce((sum, page) => {
      const wordCount = page.content
        .split(/\s+/)
        .filter(word => word.length > 0).length;
      return sum + wordCount;
    }, 0),
    averageReadingTime: 0,
    pagesByTemplate: {} as Record<string, number>,
    recentPages: pages
      .filter(p => p.frontmatter.status === 'publish')
      .slice(0, 5)
      .map(p => ({
        title: p.frontmatter.title,
        slug: p.frontmatter.slug,
        date: p.frontmatter.date,
      })),
  };

  stats.averageReadingTime = Math.ceil(stats.totalWords / pages.length / 200);

  // Group by template
  pages.forEach(page => {
    const template = page.frontmatter.wp_page_template || 'default';
    stats.pagesByTemplate[template] =
      (stats.pagesByTemplate[template] || 0) + 1;
  });

  return stats;
}
