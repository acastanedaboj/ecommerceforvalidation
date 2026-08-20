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
      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />

      <div className="section">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-display text-4xl text-neutral-900 md:text-5xl">
              Blog & Recetas
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Ideas para disfrutar de tu granola, consejos de nutrición y todo lo que necesitas
              saber sobre alimentación consciente.
            </p>
          </div>

          {/* Category filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`badge transition-colors ${
                selectedCategory === null
                  ? 'badge-primary'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
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
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featuredPost && (
            <article className="mb-16">
              <Link href={`/blog/${featuredPost.slug}`} className="group">
                <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-square">
                    <Image
                      src={featuredPost.coverImage || '/images/blog/placeholder.jpg'}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="badge-accent mb-3">
                      {blogCategories.find((c) => c.id === featuredPost.category)?.name}
                    </span>
                    <h2 className="mb-3 font-display text-2xl text-neutral-900 transition-colors group-hover:text-primary-600 md:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-neutral-600">{featuredPost.excerpt}</p>
                    <div className="mb-4 flex items-center gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readingTime} min lectura
                      </span>
                    </div>
                    <span className="inline-flex items-center font-medium text-primary-600 transition-all group-hover:gap-2">
                      Leer artículo
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Other posts grid */}
          {otherPosts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                      <span className="badge-secondary mb-2 text-xs">
                        {blogCategories.find((c) => c.id === post.category)?.name}
                      </span>
                      <h3 className="mb-2 line-clamp-2 text-neutral-900 transition-colors group-hover:text-primary-600">
                        {post.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-neutral-600">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
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
          <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center md:p-12">
            <h3 className="mb-2 text-2xl text-neutral-900">¿Quieres más recetas y consejos?</h3>
            <p className="mx-auto mb-6 max-w-xl text-neutral-600">
              Suscríbete a nuestra newsletter y recibe ideas, recetas exclusivas y ofertas
              especiales directamente en tu correo.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input type="email" placeholder="tu@email.com" className="input flex-1" required />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Suscribirme
              </button>
            </form>
            <p className="mt-3 text-xs text-neutral-500">
              Sin spam. Puedes darte de baja cuando quieras.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
