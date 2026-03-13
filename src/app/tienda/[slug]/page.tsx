'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Truck, RefreshCw, Plus, Minus, Package, Leaf, WheatOff, ChevronRight, MapPin } from 'lucide-react';
import { getProductBySlug, getRetailProducts } from '@/data/products';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { calculatePackUnitPrice, calculateSubscriptionUnitPrice, getPackDiscount } from '@/lib/pricing';
import { PRICING, SHIPPING } from '@/lib/constants';
import { ProductCard } from '@/components/product/ProductCard';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { StickyAddToCart } from '@/components/ui/StickyAddToCart';
import { BundleBuilderModal } from '@/components/bundle';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedPack, setSelectedPack] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  if (!product) {
    return (
      <div style={{ paddingTop: '140px', paddingBottom: '96px' }}>
        <div className="container-custom text-center">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px' }}>Producto no encontrado</h1>
          <Link href="/tienda" className="btn-pill">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  // Price calculations
  const basePrice = product.priceInCents;
  const packUnitPrice = isSubscription
    ? calculateSubscriptionUnitPrice()
    : calculatePackUnitPrice(selectedPack);
  const discount = isSubscription
    ? PRICING.SUBSCRIPTION_DISCOUNT
    : getPackDiscount(selectedPack);
  const totalUnits = quantity * selectedPack;
  const totalPrice = packUnitPrice * totalUnits;
  const originalPrice = basePrice * totalUnits;
  const savings = originalPrice - totalPrice;

  // Free shipping check
  const isFreeShipping =
    totalUnits >= SHIPPING.FREE_SHIPPING_MIN_ITEMS ||
    totalPrice >= SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS ||
    selectedPack >= 4 ||
    isSubscription;

  const handleAddToCart = () => {
    setIsAdding(true);

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0] || '/images/placeholder-product.jpg',
      quantity,
      packSize: selectedPack,
      isSubscription,
      priceInCents: basePrice,
    });

    toast.success(
      <span>
        <strong>{product.name}</strong> añadido al carrito
        {isSubscription && ' (Suscripción)'}
      </span>
    );

    setTimeout(() => {
      setIsAdding(false);
      toggleCart();
    }, 300);
  };

  // Related products
  const relatedProducts = getRetailProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  return (
    <>
      <div className="pt-24 pb-0 md:pt-[140px]" style={{ background: 'var(--off)' }}>
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8 md:mb-12" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1" style={{ fontSize: '11px', listStyle: 'none' }}>
              <li>
                <Link href="/" style={{ color: 'rgba(17,17,17,.35)', textDecoration: 'none' }} className="hover:text-dark transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3" style={{ color: 'rgba(17,17,17,.2)' }} />
              </li>
              <li>
                <Link href="/tienda" style={{ color: 'rgba(17,17,17,.35)', textDecoration: 'none' }} className="hover:text-dark transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3" style={{ color: 'rgba(17,17,17,.2)' }} />
              </li>
              <li style={{ color: 'var(--dark)', fontWeight: 400 }}>{product.name}</li>
            </ol>
          </nav>

          {/* ── ABOVE THE FOLD — 2 columns, gallery + essentials ── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-0">
            {/* Sticky gallery */}
            <div className="lg:sticky lg:top-[140px] lg:self-start">
              <ImageGallery
                images={product.images.length > 0 ? product.images : ['/images/placeholder-product.jpg']}
                productName={product.name}
                enableZoom={true}
              />
            </div>

            {/* Product info — essentials only */}
            <div style={{ paddingBottom: '64px' }}>
              {/* Weight label */}
              <p style={{ fontSize: '11px', color: 'rgba(17,17,17,.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontWeight: 300 }}>
                {product.weight}g · Sin gluten · Sin lactosa
              </p>

              {/* Name */}
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 3.5vw, 42px)', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {product.name}
              </h1>

              {/* One-line description */}
              <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '20px', maxWidth: '420px' }}>
                {product.shortDescription}
              </p>

              {/* Ingredients — prominent, above the fold */}
              <div className="mb-8" style={{ padding: '20px 24px', background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}>
                <p style={{ fontSize: '11px', color: 'rgba(17,17,17,.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', fontWeight: 300 }}>
                  Ingredientes
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.55)', fontWeight: 300, lineHeight: 1.75 }}>
                  {product.ingredients}
                </p>
                <div className="flex flex-wrap gap-3 mt-3" style={{ borderTop: '1px solid rgba(0,0,0,.04)', paddingTop: '12px' }}>
                  {product.tags.includes('sin-gluten') && (
                    <span className="inline-flex items-center gap-1.5" style={{ fontSize: '10px', letterSpacing: '0.06em', color: '#047857', fontWeight: 400, textTransform: 'uppercase' }}>
                      <WheatOff className="w-3 h-3" />
                      Sin gluten
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5" style={{ fontSize: '10px', letterSpacing: '0.06em', color: '#047857', fontWeight: 400, textTransform: 'uppercase' }}>
                    Sin lactosa
                  </span>
                  {product.isVegan && (
                    <span className="inline-flex items-center gap-1.5" style={{ fontSize: '10px', letterSpacing: '0.06em', color: '#15803d', fontWeight: 400, textTransform: 'uppercase' }}>
                      <Leaf className="w-3 h-3" />
                      Vegano
                    </span>
                  )}
                  {product.hasHoney && (
                    <span className="inline-flex items-center gap-1.5" style={{ fontSize: '10px', letterSpacing: '0.06em', color: '#b45309', fontWeight: 400, textTransform: 'uppercase' }}>
                      Con miel ecológica
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--dark)' }}>
                    {formatPrice(packUnitPrice)}
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(17,17,17,.3)', fontWeight: 300 }}>/unidad</span>
                  {discount > 0 && (
                    <>
                      <span style={{ fontSize: '15px', color: 'rgba(17,17,17,.2)', textDecoration: 'line-through' }}>
                        {formatPrice(basePrice)}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--brown)', fontWeight: 700 }}>
                        -{Math.round(discount * 100)}%
                      </span>
                    </>
                  )}
                </div>
                {savings > 0 && (
                  <p style={{ fontSize: '12px', color: 'var(--brown)', fontWeight: 300, marginTop: '4px' }}>
                    Ahorras {formatPrice(savings)} en este pedido
                  </p>
                )}
              </div>

              {/* Pack selection — minimal pills */}
              <div className="mb-8">
                <p style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', fontWeight: 300 }}>
                  Formato
                </p>
                <div className="flex gap-2">
                  {[1, 3, 4, 6].map((pack) => {
                    const isSelected = selectedPack === pack && !isSubscription;
                    const packDiscount = getPackDiscount(pack);
                    const hasFreeShip = pack >= 4;
                    return (
                      <button
                        key={pack}
                        type="button"
                        onClick={() => {
                          setSelectedPack(pack);
                          setIsSubscription(false);
                        }}
                        className="relative transition-all duration-200"
                        style={{
                          padding: '10px 18px',
                          fontSize: '12px',
                          fontWeight: isSelected ? 700 : 400,
                          border: isSelected ? '1.5px solid var(--dark)' : '1px solid rgba(0,0,0,.1)',
                          background: isSelected ? 'var(--white)' : 'transparent',
                          color: 'var(--dark)',
                          cursor: 'pointer',
                        }}
                      >
                        <span>{pack === 1 ? '1 bolsa' : `Pack ${pack}`}</span>
                        {packDiscount > 0 && (
                          <span style={{ display: 'block', fontSize: '10px', color: 'var(--brown)', fontWeight: 300, marginTop: '2px' }}>
                            -{Math.round(packDiscount * 100)}%{hasFreeShip ? ' · envío gratis' : ''}
                          </span>
                        )}
                        {pack === 1 && (
                          <span style={{ display: 'block', fontSize: '10px', color: 'rgba(17,17,17,.3)', fontWeight: 300, marginTop: '2px' }}>
                            &nbsp;
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Bundle builder link */}
                <button
                  type="button"
                  onClick={() => setIsBundleModalOpen(true)}
                  className="mt-4 flex items-center gap-2 transition-colors"
                  style={{ color: 'var(--brown)', fontWeight: 300, fontSize: '12px' }}
                >
                  <Package className="w-3.5 h-3.5" />
                  O crea un pack mixto con varios sabores
                </button>
              </div>

              {/* Subscription — conversational, not a toggle */}
              <div className="mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscription(!isSubscription);
                    if (!isSubscription) setSelectedPack(6);
                  }}
                  className="w-full text-left transition-all duration-200"
                  style={{
                    padding: '20px 24px',
                    border: isSubscription ? '1.5px solid var(--brown)' : '1px solid rgba(0,0,0,.08)',
                    background: isSubscription ? 'var(--white)' : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: isSubscription ? 700 : 400, color: 'var(--dark)', marginBottom: '4px' }}>
                        Recíbela cada mes con un 15% menos
                      </p>
                      <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.45)', fontWeight: 300 }}>
                        6 bolsas · {formatPrice(calculateSubscriptionUnitPrice())}/ud · Envío gratis · Sin permanencia
                      </p>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: isSubscription ? 'var(--white)' : 'var(--brown)',
                      background: isSubscription ? 'var(--brown)' : 'transparent',
                      border: isSubscription ? 'none' : '1px solid var(--brown)',
                      padding: '4px 10px',
                    }}>
                      -15%
                    </span>
                  </div>
                </button>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', fontWeight: 300 }}>
                  Cantidad
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center" style={{ border: '1px solid rgba(0,0,0,.1)' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 transition-colors hover:bg-gray-50"
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="w-4 h-4" style={{ color: 'rgba(17,17,17,.35)' }} />
                    </button>
                    <span className="w-12 text-center" style={{ fontSize: '14px', color: 'var(--dark)' }}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 transition-colors hover:bg-gray-50"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" style={{ color: 'rgba(17,17,17,.35)' }} />
                    </button>
                  </div>
                  <span style={{ fontSize: '12px', color: 'rgba(17,17,17,.4)', fontWeight: 300 }}>
                    = {totalUnits} {totalUnits === 1 ? 'bolsa' : 'bolsas'}
                  </span>
                </div>
              </div>

              {/* Total + CTA */}
              <div id="main-cta" className="pt-6" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
                <div className="flex items-center justify-between mb-5">
                  <span style={{ fontSize: '12px', color: 'rgba(17,17,17,.35)', fontWeight: 300 }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--dark)' }}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdding}
                  className="w-full flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'var(--dark)',
                    color: 'var(--cream)',
                    padding: '16px 32px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'lowercase' as const,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {isAdding ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ShoppingBag className="w-5 h-5" />
                  )}
                  {isSubscription ? 'suscribirme ahora' : 'añadir al carrito'}
                </button>

                {/* Shipping line — subtle text, not badge icons */}
                <p className="mt-4 text-center" style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', fontWeight: 300 }}>
                  {isFreeShipping ? (
                    <>Envío gratis incluido &nbsp;·&nbsp; Entrega gratis en Málaga centro</>
                  ) : (
                    <>Envío 4-6 días &nbsp;·&nbsp; Gratis desde 4 uds &nbsp;·&nbsp; Entrega gratis en Málaga</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BELOW THE FOLD — Editorial sections
          ══════════════════════════════════════════ */}

      {/* ── DESCRIPTION — full width editorial ── */}
      <section style={{ padding: '96px 0', background: 'var(--white)' }}>
        <div className="container-narrow">
          <span className="section-label">La historia</span>
          {product.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line" style={{ fontSize: '15px', color: 'rgba(17,17,17,.55)', fontWeight: 300, lineHeight: 1.9, marginBottom: '20px' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ── NUTRITIONAL INFO — clean table ── */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container-narrow">
          <span className="section-label">Información nutricional</span>
          <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.3)', marginBottom: '24px', fontWeight: 300 }}>
            Por {product.nutritionalInfo.servingSize}
          </p>
          <div style={{ maxWidth: '480px' }}>
            <table className="w-full" style={{ fontSize: '13px' }}>
              <tbody>
                {[
                  { label: 'Calorías', value: `${product.nutritionalInfo.calories} kcal` },
                  { label: 'Grasas', value: `${product.nutritionalInfo.fat}g` },
                  { label: '  de las cuales saturadas', value: `${product.nutritionalInfo.saturatedFat}g`, indent: true },
                  { label: 'Carbohidratos', value: `${product.nutritionalInfo.carbohydrates}g` },
                  { label: '  de los cuales azúcares', value: `${product.nutritionalInfo.sugars}g`, indent: true },
                  { label: 'Fibra', value: `${product.nutritionalInfo.fiber}g` },
                  { label: 'Proteínas', value: `${product.nutritionalInfo.protein}g` },
                  { label: 'Sal', value: `${product.nutritionalInfo.salt}g`, last: true },
                ].map((row) => (
                  <tr key={row.label} style={!row.last ? { borderBottom: '1px solid rgba(0,0,0,.05)' } : {}}>
                    <td style={{ padding: '12px 0', color: row.indent ? 'rgba(17,17,17,.3)' : 'rgba(17,17,17,.45)', fontWeight: 300, paddingLeft: row.indent ? '20px' : '0' }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 400, color: 'var(--dark)' }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ALLERGENS — subtle warning ── */}
      <section style={{ padding: '56px 0', background: 'var(--off)' }}>
        <div className="container-narrow">
          <span className="section-label">Alérgenos</span>
          <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.45)', fontWeight: 300, lineHeight: 1.85 }}>
            {product.allergens}
          </p>
        </div>
      </section>

      {/* ── FRESHNESS & SHIPPING — editorial ── */}
      <section style={{ padding: '96px 0', background: 'var(--white)', textAlign: 'center' }}>
        <div className="container-custom" style={{ maxWidth: '600px' }}>
          <span className="section-label">Frescura y envío</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(24px, 2.5vw, 34px)',
              marginBottom: '20px',
            }}
          >
            Del horno <em>a tu mesa</em>
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '12px' }}>
            Tostamos cada semana bajo demanda en lotes pequeños. Nunca almacenamos.
            Recibirás tu granola solo horas o días tras su elaboración.
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '12px' }}>
            Envío a toda España en 4-6 días laborables. Entrega gratuita en el centro de Málaga.
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85 }}>
            Packaging de papel 100% reciclable. Te recomendamos volcar la granola en un tarro
            de cristal para conservarla mejor.
          </p>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '80px 0 96px', background: 'var(--off)' }}>
          <div className="container-custom">
            <div className="flex justify-between items-baseline mb-12">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 2.5vw, 34px)' }}>
                También te puede gustar
              </h2>
              <Link href="/tienda" className="btn-text" style={{ fontSize: '13px' }}>
                Ver todas
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-14">
              {relatedProducts.map((p) => (
                <div key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Add to Cart for mobile */}
      <StickyAddToCart
        productName={product.name}
        totalPrice={totalPrice}
        onAddToCart={handleAddToCart}
        isLoading={isAdding}
        isDisabled={product.stock === 0}
        observeElementId="main-cta"
      />

      {/* Bundle Builder Modal */}
      <BundleBuilderModal
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
        initialProductId={product.id}
      />
    </>
  );
}
