import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { NewsGrid } from '@/components/sections/NewsGrid';
import { getNewsArticleBySlug, getRelatedNews, NEWS_ARTICLES } from '@/lib/constants/news';

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const article = getNewsArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | YPI News`,
    description: article.excerpt,
  };
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = getNewsArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedNews(params.slug, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-2"
          asChild
        >
          <Link href="/news">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Link>
        </Button>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-xl mb-8">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-6 left-6">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-lg px-4 py-2">
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Article metadata */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{article.author}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Share buttons */}
        <div className="mb-12">
          <ShareButtons
            url={`https://yellowpowerinternational.com/news/${article.slug}`}
            title={article.title}
            description={article.excerpt}
            variant="compact"
          />
        </div>

        {/* Article content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap pt-8 border-t">
            <Tag className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Tags:</span>
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Share at bottom */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm font-medium text-gray-600 mb-4">Share this article:</p>
          <ShareButtons
            url={`https://yellowpowerinternational.com/news/${article.slug}`}
            title={article.title}
            description={article.excerpt}
            variant="compact"
          />
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="border-t pt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <NewsGrid articles={relatedArticles} columns={3} showExcerpt={true} />
          </div>
        </div>
      )}

      {/* CTA section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Stay Updated with YPI News
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gold-50">
            Subscribe to our newsletter to receive the latest news, project updates, 
            and industry insights directly in your inbox.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-gold-600 hover:bg-gray-100"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}
