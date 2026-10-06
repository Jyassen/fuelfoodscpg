import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from '@/lib/blog';
import { markdownToHtml } from '@/lib/content-parser';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Fuel Foods',
    };
  }

  return {
    title: `${post.title} | Fuel Foods Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  const posts = getPublishedBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#7CB342] hover:text-[#689F38] transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
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

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mb-4
            prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-[#7CB342] prose-a:no-underline hover:prose-a:text-[#689F38]
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-gray-700 prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-[#7CB342] prose-blockquote:pl-4 prose-blockquote:italic
            prose-code:text-[#7CB342] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
            prose-img:rounded-lg prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-[#F1F8E9] rounded-lg border border-[#7CB342]/20">
          <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
          <p className="text-gray-700 mb-4">
            Experience the nutrition and flavor of fresh microgreens delivered
            to your door every week.
          </p>
          <Link
            href="/configure/weekly"
            className="inline-block px-6 py-3 bg-[#7CB342] text-white font-medium rounded-lg hover:bg-[#689F38] transition-colors"
          >
            Choose Your Plan
          </Link>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-[#7CB342] hover:text-[#689F38] transition-colors font-medium"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
