import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CONTENT_PATHS } from './content-parser';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  modified: string;
  status: 'draft' | 'publish';
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featured_image?: string;
  content: string;
  readingTime: number;
}

/**
 * Get all blog posts from the content/posts directory
 */
export function getAllBlogPosts(): BlogPost[] {
  try {
    const postsDir = CONTENT_PATHS.posts;

    if (!fs.existsSync(postsDir)) {
      console.warn(`Posts directory not found: ${postsDir}`);
      return [];
    }

    const fileNames = fs.readdirSync(postsDir);
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const filePath = path.join(postsDir, fileName);
        return parseBlogPost(filePath);
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

/**
 * Get published blog posts only
 */
export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.status === 'publish');
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    // Security: validate slug format
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
      return null;
    }

    const postsRoot = path.resolve(CONTENT_PATHS.posts);
    const filePath = path.resolve(postsRoot, `${slug}.md`);

    // Security: ensure the resolved path is within posts directory
    if (!filePath.startsWith(postsRoot + path.sep)) {
      return null;
    }

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return parseBlogPost(filePath);
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get published blog post by slug (production safe)
 */
export function getPublishedBlogPostBySlug(slug: string): BlogPost | null {
  const post = getBlogPostBySlug(slug);
  
  // Only return published posts in production
  if (post && (process.env.NODE_ENV === 'production' && post.status !== 'publish')) {
    return null;
  }
  
  return post;
}

/**
 * Parse a blog post markdown file
 */
function parseBlogPost(filePath: string): BlogPost {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Calculate reading time
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Extract slug from filename
  const fileName = path.basename(filePath, '.md');
  const slug = data.slug || fileName;

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    modified: data.modified || data.date || new Date().toISOString(),
    status: data.status || 'draft',
    excerpt: data.excerpt || '',
    author: data.author || 'Fuel Foods Team',
    category: data.category || 'Uncategorized',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured_image: data.featured_image,
    content,
    readingTime,
  };
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getPublishedBlogPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getPublishedBlogPosts();
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all categories from published posts
 */
export function getAllCategories(): string[] {
  const posts = getPublishedBlogPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all tags from published posts
 */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getPublishedBlogPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
