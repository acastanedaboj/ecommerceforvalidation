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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
    // Helper function to parse inline markdown (bold + links)
    const parseInline = (text: string) => {
      return text
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-earth-600 underline hover:text-earth-700 transition-colors">$1</a>'
        )
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Skip empty lines (don't render <br/>)
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1
            key={i}
            className="mb-4 mt-8 font-display text-3xl text-neutral-900"
            dangerouslySetInnerHTML={{ __html: parseInline(line.slice(2)) }}
          />
        );
        i++;
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={i}
            className="mb-4 mt-8 font-display text-2xl text-neutral-900"
            dangerouslySetInnerHTML={{ __html: parseInline(line.slice(3)) }}
          />
        );
        i++;
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={i}
            className="mb-3 mt-6 text-xl font-semibold text-neutral-900"
            dangerouslySetInnerHTML={{ __html: parseInline(line.slice(4)) }}
          />
        );
        i++;
        continue;
      }

      // Collect consecutive list items into a <ul>
      if (line.startsWith('- ')) {
        const listItems: React.ReactNode[] = [];
        const startIndex = i;
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(
            <li
              key={i}
              className="text-neutral-600"
              dangerouslySetInnerHTML={{ __html: parseInline(lines[i].slice(2)) }}
            />
          );
          i++;
        }
        elements.push(
          <ul key={`ul-${startIndex}`} className="mb-4 ml-2 list-inside list-disc space-y-1">
            {listItems}
          </ul>
        );
        continue;
      }

      // Numbered list items
      if (/^\d+\.\s/.test(line)) {
        const listItems: React.ReactNode[] = [];
        const startIndex = i;
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          listItems.push(
            <li
              key={i}
              className="text-neutral-600"
              dangerouslySetInnerHTML={{ __html: parseInline(lines[i].replace(/^\d+\.\s/, '')) }}
            />
          );
          i++;
        }
        elements.push(
          <ol key={`ol-${startIndex}`} className="mb-4 ml-2 list-inside list-decimal space-y-1">
            {listItems}
          </ol>
        );
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={i} className="my-8 border-neutral-200" />);
        i++;
        continue;
      }

      // Affiliate banner: %%BANNER:imageUrl|href|altText%%
      const bannerMatch = line.match(/^%%BANNER:([^|]+)\|([^|]+)\|([^%]+)%%$/);
      if (bannerMatch) {
        const [, src, href, alt] = bannerMatch;
        elements.push(
          <a
            key={i}
            href={href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="my-8 block overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md"
            aria-label={alt}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={600}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </a>
        );
        i++;
        continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={i}
            className="my-4 rounded-r border-l-4 border-primary-300 bg-neutral-50 py-2 pl-4 italic text-neutral-600"
            dangerouslySetInnerHTML={{ __html: parseInline(line.slice(2)) }}
          />
        );
        i++;
        continue;
      }

      // Regular paragraphs
      elements.push(
        <p
          key={i}
          className="mb-4 leading-relaxed text-neutral-600"
          dangerouslySetInnerHTML={{ __html: parseInline(line) }}
        />
      );
      i++;
    }

    return elements;
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
              <ChevronLeft className="mr-1 h-4 w-4" />
              Volver al blog
            </Link>
          </nav>

          {/* Header */}
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <span className="badge-accent mb-4">{category?.name}</span>
            <h1 className="mb-6 font-display text-3xl text-neutral-900 md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mb-6 text-lg text-neutral-600">{post.excerpt}</p>
            <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
              <span>{post.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min lectura
              </span>
            </div>
          </header>

          {/* Featured image */}
          {post.coverImage && (
            <div className="relative mx-auto mb-12 aspect-video max-w-4xl overflow-hidden rounded-2xl">
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
          <div className="mx-auto max-w-3xl">
            <div className="prose-custom">{formatContent(post.content)}</div>

            {/* Tags */}
            <div className="mt-8 border-t border-neutral-200 pt-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge bg-neutral-100 text-neutral-700">
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
                className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
                aria-label="Compartir"
              >
                <Share2 className="h-5 w-5 text-neutral-600" />
              </button>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-neutral-200 pt-16">
              <h2 className="mb-8 text-center font-display text-2xl text-neutral-900">
                Artículos relacionados
              </h2>
              <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
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
                      <h3 className="text-neutral-900 transition-colors group-hover:text-primary-600">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mx-auto mt-16 max-w-2xl rounded-2xl bg-primary-50 p-8 text-center">
            <h3 className="mb-2 text-xl text-neutral-900">¿Te ha gustado este artículo?</h3>
            <p className="mb-4 text-neutral-600">
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
