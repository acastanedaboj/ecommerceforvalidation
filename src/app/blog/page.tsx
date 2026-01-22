import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, blogCategories } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog & Recetas',
  description:
    'Descubre recetas deliciosas, consejos de nutrición y artículos sobre alimentación saludable en nuestro blog. Aprende a sacar el máximo partido a tu granola.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
            Blog & Recetas
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Ideas para disfrutar de tu granola, consejos de nutrición y todo lo que
            necesitas saber sobre alimentación consciente.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="badge-primary">Todos</button>
          {blogCategories.map((category) => (
            <button
              key={category.id}
              className="badge bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featuredPost && (
          <article className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
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
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readingTime} min lectura
                    </span>
                  </div>
                  <span className="inline-flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                    Leer artículo
                    <ArrowRight className="w-4 h-4 ml-1" />
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
                    <span className="badge-secondary text-xs mb-2">
                      {blogCategories.find((c) => c.id === post.category)?.name}
                    </span>
                    <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
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
        <div className="mt-16 bg-primary-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            ¿Quieres más recetas y consejos?
          </h3>
          <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
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
            <button type="submit" className="btn-primary whitespace-nowrap">
              Suscribirme
            </button>
          </form>
          <p className="text-xs text-neutral-500 mt-3">
            Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </div>
      </div>
    </div>
  );
}
