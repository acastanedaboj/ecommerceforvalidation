'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, blogCategories, BlogPost } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import { buildBreadcrumbSchema, JsonLd } from '@/lib/seo';

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />

      <div style={{ paddingTop: '140px', paddingBottom: '96px' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
            Blog & recetas
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, maxWidth: '520px', margin: '0 auto', lineHeight: 1.85 }}>
            Ideas para disfrutar de tu granola, consejos de nutrición y todo lo que
            necesitas saber sobre alimentación consciente.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`badge transition-colors ${
              selectedCategory === null
                ? 'badge-primary'
                : ''
            }`}
            style={selectedCategory !== null ? { background: 'var(--off)', color: 'rgba(17,17,17,.5)' } : {}}
          >
            Todos
          </button>
          {blogCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`badge transition-colors ${
                selectedCategory === category.id
                  ? 'badge-primary'
                  : ''
              }`}
              style={selectedCategory !== category.id ? { background: 'var(--off)', color: 'rgba(17,17,17,.5)' } : {}}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featuredPost && (
          <article className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="grid md:grid-cols-2 gap-0 items-stretch overflow-hidden" style={{ border: '1px solid rgba(0,0,0,.06)' }}>
                <div className="relative aspect-video md:aspect-auto md:min-h-[400px]">
                  <Image
                    src={featuredPost.coverImage || '/images/blog/placeholder.jpg'}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center" style={{ background: 'var(--white)' }}>
                  <span className="badge-accent mb-3">
                    {blogCategories.find((c) => c.id === featuredPost.category)?.name}
                  </span>
                  <h2 className="group-hover:text-poppy-brown transition-colors" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 32px)', marginBottom: '12px' }}>
                    {featuredPost.title}
                  </h2>
                  <p className="line-clamp-3" style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '16px' }}>
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-4" style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readingTime} min lectura
                    </span>
                  </div>
                  <span className="btn-text" style={{ width: 'fit-content' }}>
                    Leer artículo
                  </span>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Other posts grid */}
        {otherPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <article key={post.id} className="card group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={post.coverImage || '/images/blog/placeholder.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <span className="badge-secondary mb-2">
                      {blogCategories.find((c) => c.id === post.category)?.name}
                    </span>
                    <h3 className="line-clamp-2 group-hover:text-poppy-brown transition-colors" style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '8px' }}>
                      {post.title}
                    </h3>
                    <p className="line-clamp-2" style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.7, marginBottom: '12px' }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3" style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 md:p-12 text-center" style={{ background: 'var(--off)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '8px' }}>
            ¿Quieres más recetas y consejos?
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.85 }}>
            Suscríbete a nuestra newsletter y recibe ideas, recetas exclusivas y
            ofertas especiales directamente en tu correo.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="input flex-1"
              required
            />
            <button type="submit" className="btn-pill">
              Suscribirme
            </button>
          </form>
          <p className="mt-3" style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', fontWeight: 300 }}>
            Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
