import type { 
  SearchIndexEntry, 
  SearchResult, 
  SearchMatch,
  WordPressPage,
  FuelFoodsProduct 
} from './types';
import { buildContentSearchIndex } from './content-parser';

// ============================================================================
// SEARCH CONFIGURATION
// ============================================================================

export const SEARCH_CONFIG = {
  // Minimum query length
  minQueryLength: 2,
  
  // Maximum results to return
  maxResults: 20,
  
  // Score thresholds
  minScore: 0.1,
  
  // Field weights for scoring
  fieldWeights: {
    title: 3.0,
    keywords: 2.0,
    excerpt: 1.5,
    content: 1.0,
  },
  
  // Boost factors
  boostFactors: {
    exactMatch: 2.0,
    partialMatch: 1.5,
    keywordMatch: 1.2,
  },
} as const;

// ============================================================================
// SEARCH INDEX MANAGEMENT
// ============================================================================

let searchIndex: SearchIndexEntry[] = [];
let indexLastUpdated: Date | null = null;

/**
 * Initialize or refresh the search index
 */
export function initializeSearchIndex(): void {
  try {
    searchIndex = buildContentSearchIndex();
    indexLastUpdated = new Date();
    console.log(`Search index initialized with ${searchIndex.length} entries`);
  } catch (error) {
    console.error('Failed to initialize search index:', error);
    searchIndex = [];
  }
}

/**
 * Get the current search index
 */
export function getSearchIndex(): SearchIndexEntry[] {
  if (searchIndex.length === 0) {
    initializeSearchIndex();
  }
  return searchIndex;
}

/**
 * Add entry to search index
 */
export function addToSearchIndex(entry: SearchIndexEntry): void {
  const existingIndex = searchIndex.findIndex(item => item.id === entry.id);
  
  if (existingIndex >= 0) {
    searchIndex[existingIndex] = entry;
  } else {
    searchIndex.push(entry);
  }
}

/**
 * Remove entry from search index
 */
export function removeFromSearchIndex(id: string): void {
  searchIndex = searchIndex.filter(entry => entry.id !== id);
}

// ============================================================================
// SEARCH FUNCTIONALITY
// ============================================================================

/**
 * Perform search across all content
 */
export function searchContent(
  query: string,
  options: {
    type?: 'page' | 'post' | 'product' | 'all';
    limit?: number;
    includeContent?: boolean;
  } = {}
): SearchResult[] {
  const {
    type = 'all',
    limit = SEARCH_CONFIG.maxResults,
    includeContent = false,
  } = options;

  // Validate query
  if (!query || query.trim().length < SEARCH_CONFIG.minQueryLength) {
    return [];
  }

  const normalizedQuery = normalizeQuery(query);
  const queryTerms = extractQueryTerms(normalizedQuery);
  
  if (queryTerms.length === 0) {
    return [];
  }

  // Get relevant index entries
  let relevantEntries = getSearchIndex();
  
  if (type !== 'all') {
    relevantEntries = relevantEntries.filter(entry => entry.type === type);
  }

  // Score and filter results
  const results: SearchResult[] = relevantEntries
    .map(entry => scoreSearchEntry(entry, queryTerms, normalizedQuery))
    .filter(result => result.score >= SEARCH_CONFIG.minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  // Remove content from results if not requested (for performance)
  if (!includeContent) {
    results.forEach(result => {
      result.entry = { ...result.entry, content: '' };
    });
  }

  return results;
}

/**
 * Search for specific products
 */
export function searchProducts(query: string): SearchResult[] {
  return searchContent(query, { type: 'product', limit: 10 });
}

/**
 * Search for pages
 */
export function searchPages(query: string): SearchResult[] {
  return searchContent(query, { type: 'page', limit: 15 });
}

/**
 * Get search suggestions based on partial query
 */
export function getSearchSuggestions(
  partialQuery: string,
  limit: number = 5
): string[] {
  if (!partialQuery || partialQuery.length < 2) {
    return [];
  }

  const query = partialQuery.toLowerCase().trim();
  const suggestions = new Set<string>();

  // Get suggestions from titles
  getSearchIndex().forEach(entry => {
    const title = entry.title.toLowerCase();
    if (title.includes(query) && suggestions.size < limit * 2) {
      suggestions.add(entry.title);
    }
  });

  // Get suggestions from keywords
  getSearchIndex().forEach(entry => {
    entry.keywords.forEach(keyword => {
      if (keyword.includes(query) && suggestions.size < limit * 2) {
        // Capitalize first letter of suggestion
        const suggestion = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        suggestions.add(suggestion);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}

// ============================================================================
// SEARCH SCORING AND MATCHING
// ============================================================================

/**
 * Score a search entry against query terms
 */
function scoreSearchEntry(
  entry: SearchIndexEntry,
  queryTerms: string[],
  fullQuery: string
): SearchResult {
  let totalScore = 0;
  const matches: SearchMatch[] = [];

  // Score title matches
  const titleMatches = findMatches(entry.title, queryTerms, fullQuery);
  titleMatches.forEach(match => {
    totalScore += match.score * SEARCH_CONFIG.fieldWeights.title;
    matches.push({ ...match, field: 'title' });
  });

  // Score keyword matches
  const keywordText = entry.keywords.join(' ');
  const keywordMatches = findMatches(keywordText, queryTerms, fullQuery);
  keywordMatches.forEach(match => {
    totalScore += match.score * SEARCH_CONFIG.fieldWeights.keywords;
    matches.push({ ...match, field: 'keywords' });
  });

  // Score excerpt matches
  const excerptMatches = findMatches(entry.excerpt, queryTerms, fullQuery);
  excerptMatches.forEach(match => {
    totalScore += match.score * SEARCH_CONFIG.fieldWeights.excerpt;
    matches.push({ ...match, field: 'excerpt' });
  });

  // Score content matches (limited to avoid performance issues)
  const contentSample = entry.content.substring(0, 1000);
  const contentMatches = findMatches(contentSample, queryTerms, fullQuery);
  contentMatches.slice(0, 3).forEach(match => {
    totalScore += match.score * SEARCH_CONFIG.fieldWeights.content;
    matches.push({ ...match, field: 'content' });
  });

  // Apply entry weight boost
  totalScore *= entry.searchWeight;

  // Normalize score (0-1 range)
  const normalizedScore = Math.min(totalScore / 10, 1);

  return {
    entry,
    score: normalizedScore,
    matches: matches.sort((a: any, b: any) => b.score - a.score),
  };
}

/**
 * Find matches within text
 */
function findMatches(
  text: string,
  queryTerms: string[],
  fullQuery: string
): Array<SearchMatch & { score: number }> {
  const matches: Array<SearchMatch & { score: number }> = [];
  const lowerText = text.toLowerCase();
  const lowerFullQuery = fullQuery.toLowerCase();

  // Check for exact phrase match
  const exactIndex = lowerText.indexOf(lowerFullQuery);
  if (exactIndex >= 0) {
    matches.push({
      field: 'title', // Will be overridden by caller
      text: text.substring(exactIndex, exactIndex + fullQuery.length),
      startIndex: exactIndex,
      endIndex: exactIndex + fullQuery.length,
      context: getContext(text, exactIndex, fullQuery.length),
      score: SEARCH_CONFIG.boostFactors.exactMatch,
    });
  }

  // Check for individual term matches
  queryTerms.forEach(term => {
    let searchIndex = 0;
    while (true) {
      const index = lowerText.indexOf(term, searchIndex);
      if (index === -1) break;

      // Avoid duplicate matches with exact phrase
      if (exactIndex === -1 || index < exactIndex || index >= exactIndex + fullQuery.length) {
        const isPartialWord = (
          (index > 0 && /\w/.test(lowerText[index - 1])) ||
          (index + term.length < lowerText.length && /\w/.test(lowerText[index + term.length]))
        );

        const score = isPartialWord 
          ? SEARCH_CONFIG.boostFactors.partialMatch * 0.7
          : SEARCH_CONFIG.boostFactors.partialMatch;

        matches.push({
          field: 'title', // Will be overridden by caller
          text: text.substring(index, index + term.length),
          startIndex: index,
          endIndex: index + term.length,
          context: getContext(text, index, term.length),
          score,
        });
      }

      searchIndex = index + 1;
    }
  });

  return matches;
}

/**
 * Get context around a match
 */
function getContext(text: string, startIndex: number, matchLength: number, contextLength: number = 100): string {
  const contextStart = Math.max(0, startIndex - contextLength);
  const contextEnd = Math.min(text.length, startIndex + matchLength + contextLength);
  
  let context = text.substring(contextStart, contextEnd);
  
  // Add ellipsis if we're not at the beginning/end
  if (contextStart > 0) context = '...' + context;
  if (contextEnd < text.length) context = context + '...';
  
  return context.trim();
}

// ============================================================================
// QUERY PROCESSING UTILITIES
// ============================================================================

/**
 * Normalize search query
 */
function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Extract search terms from query
 */
function extractQueryTerms(query: string): string[] {
  const terms = query.split(' ').filter(term => term.length >= 2);
  
  // Remove common stop words
  const stopWords = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'
  ]);
  
  return terms.filter(term => !stopWords.has(term));
}

// ============================================================================
// SPECIALIZED SEARCH FUNCTIONS
// ============================================================================

/**
 * Search for microgreens products by nutritional content
 */
export function searchByNutrition(nutrients: string[]): SearchResult[] {
  const nutritionTerms = nutrients.map(n => n.toLowerCase());
  const query = nutritionTerms.join(' ');
  
  return searchContent(query, { type: 'product' })
    .filter(result => {
      const entry = result.entry;
      return nutritionTerms.some(term => 
        entry.keywords.some(keyword => keyword.includes(term)) ||
        entry.content.toLowerCase().includes(term)
      );
    });
}

/**
 * Search for content by category
 */
export function searchByCategory(category: string, query?: string): SearchResult[] {
  let baseQuery = category;
  if (query) {
    baseQuery += ' ' + query;
  }

  return searchContent(baseQuery, { limit: 15 })
    .filter(result => {
      const entry = result.entry;
      const categoryLower = category.toLowerCase();
      
      return (
        entry.keywords.some(keyword => keyword.includes(categoryLower)) ||
        entry.url.includes(categoryLower) ||
        entry.title.toLowerCase().includes(categoryLower)
      );
    });
}

/**
 * Get popular search terms (based on content keywords)
 */
export function getPopularSearchTerms(limit: number = 10): string[] {
  const termFrequency = new Map<string, number>();
  
  getSearchIndex().forEach(entry => {
    entry.keywords.forEach(keyword => {
      if (keyword.length > 3) {
        termFrequency.set(keyword, (termFrequency.get(keyword) || 0) + 1);
      }
    });
  });

  return Array.from(termFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);
}

/**
 * Get search analytics/statistics
 */
export function getSearchAnalytics() {
  const index = getSearchIndex();
  
  return {
    totalEntries: index.length,
    entriesByType: {
      pages: index.filter(e => e.type === 'page').length,
      posts: index.filter(e => e.type === 'post').length,
      products: index.filter(e => e.type === 'product').length,
    },
    indexLastUpdated,
    averagContentLength: Math.round(
      index.reduce((sum, entry) => sum + entry.content.length, 0) / index.length
    ),
    averageKeywords: Math.round(
      index.reduce((sum, entry) => sum + entry.keywords.length, 0) / index.length
    ),
    topKeywords: getPopularSearchTerms(20),
  };
}