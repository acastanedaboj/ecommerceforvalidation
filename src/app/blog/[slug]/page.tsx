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
  buildFaqSchema,
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
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [
        post.coverImage?.startsWith('http')
          ? post.coverImage
          : `${SITE_URL}${post.coverImage || '/images/og-image.jpg'}`,
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
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--brown);text-decoration:underline">$1</a>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Skip empty lines
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1
            key={i}
            style={{ fontFamily: 'var(--font-display)', fontSize: '28px', marginTop: '32px', marginBottom: '16px' }}
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
            style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}
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
            style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '24px', marginBottom: '12px' }}
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
              style={{ color: 'rgba(17,17,17,.5)' }}
              dangerouslySetInnerHTML={{ __html: parseInline(lines[i].slice(2)) }}
            />
          );
          i++;
        }
        elements.push(
          <ul key={`ul-${startIndex}`} className="list-disc list-inside space-y-1 mb-4 ml-2">
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
              style={{ color: 'rgba(17,17,17,.5)' }}
              dangerouslySetInnerHTML={{ __html: parseInline(lines[i].replace(/^\d+\.\s/, '')) }}
            />
          );
          i++;
        }
        elements.push(
          <ol key={`ol-${startIndex}`} className="list-decimal list-inside space-y-1 mb-4 ml-2">
            {listItems}
          </ol>
        );
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={i} style={{ margin: '32px 0', border: 'none', borderTop: '1px solid rgba(0,0,0,.07)' }} />);
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
            className="block my-8 overflow-hidden transition-shadow"
            aria-label={alt}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={600}
              className="w-full h-auto"
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
            style={{ borderLeft: '3px solid var(--brown)', paddingLeft: '16px', margin: '16px 0', fontStyle: 'italic', color: 'rgba(17,17,17,.5)' }}
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
          style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '16px' }}
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

      {/* JSON-LD: FAQ Schema (if post has FAQs) */}
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd data={buildFaqSchema(post.faqs)} />
      )}

      <article style={{ paddingTop: '140px', paddingBottom: '96px' }}>
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
            href="/blog"
            className="inline-flex items-center transition-colors"
            style={{ color: 'rgba(17,17,17,.4)', textDecoration: 'none', fontSize: '13px' }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al blog
          </Link>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-accent mb-4">{category?.name}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '24px' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '24px' }}>{post.excerpt}</p>
          <div className="flex items-center justify-center gap-4" style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <span>{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min lectura
            </span>
          </div>
        </header>

        {/* Featured image */}
        {post.coverImage && (
          <div className="relative aspect-video max-w-4xl mx-auto mb-12 overflow-hidden">
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
          <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(0,0,0,.07)' }}>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ background: 'var(--off)', color: 'rgba(17,17,17,.5)', fontSize: '12px', padding: '4px 12px', borderRadius: '100px', fontWeight: 300 }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)' }}>Compartir:</span>
            <button
              type="button"
              className="p-2 transition-colors"
              style={{ color: 'rgba(17,17,17,.4)' }}
              aria-label="Compartir"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-16" style={{ borderTop: '1px solid rgba(0,0,0,.07)' }}>
            <h2 className="text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '32px' }}>
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
                    <h3 className="group-hover:text-poppy-brown transition-colors" style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '8px' }}>
                      {relatedPost.title}
                    </h3>
                    <p className="line-clamp-2" style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.7 }}>
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-16 p-8 md:p-12 text-center max-w-2xl mx-auto" style={{ background: 'var(--off)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}>
            ¿Te ha gustado este artículo?
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, marginBottom: '24px' }}>
            Prueba nuestra granola Poppy y ponla en práctica
          </p>
          <Link href="/tienda" className="btn-pill">
            ver productos
          </Link>
        </section>
        </div>
      </article>
    </>
  );
}
