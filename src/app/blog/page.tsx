import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Fuel Foods',
  description:
    'Learn about microgreens, nutrition, recipes, and healthy living from the Fuel Foods blog.',
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Fuel Foods Blog
          </h1>
          <p className="text-xl text-gray-600">
            Your guide to microgreens, nutrition, and healthy living
          </p>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No blog posts are currently published. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map(post => (
              <article
                key={post.slug}
                className="border-b border-gray-200 pb-12 last:border-b-0"
              >
                {/* Post Header */}
                <div className="mb-4">
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h2 className="text-3xl font-bold mb-3 group-hover:text-[#7CB342] transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                    {post.category && (
                      <>
                        <span>•</span>
                        <span className="text-[#7CB342] font-medium">
                          {post.category}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#7CB342] font-medium hover:text-[#689F38] transition-colors"
                >
                  Read full article
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
