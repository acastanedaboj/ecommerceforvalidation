import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ChevronLeft, Share2 } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts, blogCategories } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import {
  SITE_URL,
  getCanonicalUrl,
  buildArticleSchema,
  buildBreadcrumbSchema,
  JsonLd,
} from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return { title: 'Artículo no encontrado' };
  }

  const postUrl = `/blog/${post.slug}`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: getCanonicalUrl(postUrl),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      url: `${SITE_URL}${postUrl}`,
      images: [
        {
          url: post.coverImage?.startsWith('http')
            ? post.coverImage
            : `${SITE_URL}${post.coverImage || '/images/og-image.jpg'}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const category = blogCategories.find((c) => c.id === post.category);
  const relatedPosts = getAllBlogPosts()
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  const postUrl = `/blog/${post.slug}`;

  // Simple markdown-like parsing for the content
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-display font-bold text-neutral-900 mt-8 mb-4">
              {line.slice(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-display font-bold text-neutral-900 mt-8 mb-4">
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
              {line.slice(4)}
            </h3>
          );
        }
        // List items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-neutral-600 ml-4">
              {line.slice(2)}
            </li>
          );
        }
        // Bold text
        const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }
        // Regular paragraphs
        return (
          <p
            key={index}
            className="text-neutral-600 mb-4"
            dangerouslySetInnerHTML={{ __html: boldLine }}
          />
        );
      });
  };

  return (
    <>
      {/* JSON-LD: Article Schema */}
      <JsonLd data={buildArticleSchema(post, postUrl)} />

      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: postUrl },
        ])}
      />

      <article className="section">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
            href="/blog"
            className="inline-flex items-center text-neutral-600 hover:text-primary-600"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al blog
          </Link>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-accent mb-4">{category?.name}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-neutral-600 mb-6">{post.excerpt}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
            <span>{post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min lectura
            </span>
          </div>
        </header>

        {/* Featured image */}
        {post.coverImage && (
          <div className="relative aspect-video max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose-custom">{formatContent(post.content)}</div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge bg-neutral-100 text-neutral-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-neutral-600">Compartir:</span>
            <button
              type="button"
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Compartir"
            >
              <Share2 className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-neutral-200">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8 text-center">
              Artículos relacionados
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="card group"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={relatedPost.coverImage || '/images/blog/placeholder.jpg'}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-16 bg-primary-50 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            ¿Te ha gustado este artículo?
          </h3>
          <p className="text-neutral-600 mb-4">
            Prueba nuestra granola Poppy y ponla en práctica
          </p>
          <Link href="/tienda" className="btn-primary">
            Ver productos
          </Link>
        </section>
        </div>
      </article>
    </>
  );
}
