'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Truck, RefreshCw, Shield, Plus, Minus, FileText, List, BarChart2, AlertTriangle, Package, Leaf, Clock, WheatOff, ChevronRight } from 'lucide-react';
import { getProductBySlug, getRetailProducts } from '@/data/products';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { calculatePackUnitPrice, calculateSubscriptionUnitPrice, getPackDiscount } from '@/lib/pricing';
import { PRICING, SHIPPING } from '@/lib/constants';
import { ProductCard } from '@/components/product/ProductCard';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { PackPillSelector } from '@/components/ui/PackPillSelector';
import { Collapsible } from '@/components/ui/Collapsible';
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
            volver a la tienda
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
        <strong>{product.name}</strong> anadido al carrito
        {isSubscription && ' (Suscripcion)'}
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
    .slice(0, 3);

  return (
    <>
      <div style={{ paddingTop: '140px', paddingBottom: '96px', background: 'var(--off)' }}>
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-10" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1" style={{ fontSize: '12px', listStyle: 'none' }}>
              <li>
                <Link href="/" style={{ color: 'rgba(17,17,17,.35)', textDecoration: 'none' }} className="hover:text-dark transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.2)' }} />
              </li>
              <li>
                <Link href="/tienda" style={{ color: 'rgba(17,17,17,.35)', textDecoration: 'none' }} className="hover:text-dark transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.2)' }} />
              </li>
              <li style={{ color: 'var(--dark)', fontWeight: 700 }}>{product.name}</li>
            </ol>
          </nav>

          {/* Product main section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Images */}
            <div>
              <ImageGallery
                images={product.images.length > 0 ? product.images : ['/images/placeholder-product.jpg']}
                productName={product.name}
                enableZoom={true}
              />
              {/* Badges overlay */}
              <div className="flex gap-2 mt-4">
                {product.tags.includes('sin-gluten') && (
                  <span className="badge-primary">Sin gluten</span>
                )}
              </div>
            </div>

            {/* Product info */}
            <div>
              <div className="mb-8">
                <p style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  {product.weight}g · SKU: {product.sku}
                </p>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 36px)', marginBottom: '12px' }}>
                  {product.name}
                </h1>
                <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85 }}>{product.shortDescription}</p>
              </div>

              {/* Price display */}
              <div className="p-6 mb-8" style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--brown)' }}>
                    {formatPrice(packUnitPrice)}
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(17,17,17,.35)' }}>/unidad</span>
                  {discount > 0 && (
                    <>
                      <span style={{ fontSize: '16px', color: 'rgba(17,17,17,.25)', textDecoration: 'line-through' }}>
                        {formatPrice(basePrice)}
                      </span>
                      <span style={{ background: 'var(--yellow)', color: 'var(--dark)', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px' }}>-{Math.round(discount * 100)}%</span>
                    </>
                  )}
                </div>
                {savings > 0 && (
                  <p style={{ fontSize: '13px', color: 'var(--brown)', fontWeight: 400 }}>
                    Ahorras {formatPrice(savings)} en este pedido
                  </p>
                )}
              </div>

              {/* Pack selection with pills */}
              <div className="mb-8">
                <label className="label mb-4">Elige tu pack:</label>
                <PackPillSelector
                  selectedPack={selectedPack}
                  onSelect={(pack) => {
                    setSelectedPack(pack);
                    setIsSubscription(false);
                  }}
                  showSavings={true}
                  showShipping={true}
                  variant="horizontal"
                  size="lg"
                />
                {/* Bundle builder link */}
                <button
                  type="button"
                  onClick={() => setIsBundleModalOpen(true)}
                  className="mt-4 flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'var(--brown)', fontWeight: 400 }}
                >
                  <Package className="w-4 h-4" />
                  O crea un pack mixto con este sabor
                </button>
              </div>

              {/* Subscription option */}
              <div className="mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscription(!isSubscription);
                    if (!isSubscription) setSelectedPack(6);
                  }}
                  className={cn(
                    'w-full p-5 transition-all text-left group',
                    isSubscription
                      ? 'border-2'
                      : 'border'
                  )}
                  style={isSubscription
                    ? { borderColor: 'var(--brown)', background: 'var(--off)' }
                    : { borderColor: 'rgba(0,0,0,.08)', background: 'var(--white)' }
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center" style={{ background: isSubscription ? 'var(--white)' : 'var(--off)' }}>
                        <RefreshCw
                          className="w-6 h-6"
                          style={{ color: isSubscription ? 'var(--brown)' : 'rgba(17,17,17,.3)' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontWeight: 400, color: 'var(--dark)', display: 'block', marginBottom: '4px' }}>
                          Suscripcion mensual (Pack 6)
                        </span>
                        <span style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>
                          {formatPrice(calculateSubscriptionUnitPrice())}/ud · Envio gratis · Cancela cuando quieras
                        </span>
                      </div>
                    </div>
                    <span style={{ background: 'var(--yellow)', color: 'var(--dark)', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px' }}>-15%</span>
                  </div>
                </button>
              </div>

              {/* Quantity selector */}
              <div className="mb-8">
                <label className="label mb-4">Cantidad:</label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center" style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.1)', borderRadius: '100px' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 transition-colors"
                      style={{ borderRadius: '100px 0 0 100px' }}
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="w-4 h-4" style={{ color: 'rgba(17,17,17,.4)' }} />
                    </button>
                    <span className="w-14 text-center" style={{ color: 'var(--dark)' }}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 transition-colors"
                      style={{ borderRadius: '0 100px 100px 0' }}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" style={{ color: 'rgba(17,17,17,.4)' }} />
                    </button>
                  </div>
                  <span style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>
                    = {totalUnits} {totalUnits === 1 ? 'bolsa' : 'bolsas'}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: Truck, text: 'Envio 2-4 dias' },
                  { icon: Shield, text: 'Pago seguro' },
                  { icon: RefreshCw, text: '14 dias devolucion' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2" style={{ fontSize: '12px', color: 'rgba(17,17,17,.4)', fontWeight: 300 }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--brown)' }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Total and add to cart */}
              <div id="main-cta" className="p-6" style={{ background: 'var(--dark)', color: 'var(--white)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)' }}>Total:</span>
                  <div className="text-right">
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--white)' }}>{formatPrice(totalPrice)}</span>
                    {isFreeShipping && (
                      <p className="flex items-center gap-2 justify-end mt-1" style={{ color: 'var(--yellow)', fontSize: '12px' }}>
                        <Truck className="w-4 h-4" />
                        Envio gratis incluido
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdding}
                  className={cn(
                    'flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                  style={{
                    background: 'var(--brown)',
                    color: 'var(--white)',
                    padding: '14px 32px',
                    borderRadius: '100px',
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
                  {isSubscription ? 'suscribirme ahora' : 'anadir al carrito'}
                </button>
              </div>
            </div>
          </div>

          {/* Product details - Collapsible sections */}
          <div className="max-w-3xl mb-20">
            <Collapsible
              title="Descripcion"
              icon={<FileText className="w-5 h-5" />}
              defaultOpen={true}
            >
              <div>
                {product.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line" style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '16px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Collapsible>

            <Collapsible
              title="Ingredientes"
              icon={<List className="w-5 h-5" />}
            >
              <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85 }}>{product.ingredients}</p>
            </Collapsible>

            <Collapsible
              title="Informacion nutricional"
              icon={<BarChart2 className="w-5 h-5" />}
            >
              <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.35)', marginBottom: '16px' }}>Por {product.nutritionalInfo.servingSize}</p>
              <div className="p-4" style={{ background: 'var(--off)' }}>
                <table className="w-full" style={{ fontSize: '13px' }}>
                  <tbody>
                    {[
                      { label: 'Calorias', value: `${product.nutritionalInfo.calories} kcal` },
                      { label: 'Grasas', value: `${product.nutritionalInfo.fat}g` },
                      { label: '- Saturadas', value: `${product.nutritionalInfo.saturatedFat}g`, indent: true },
                      { label: 'Carbohidratos', value: `${product.nutritionalInfo.carbohydrates}g` },
                      { label: '- Azucares', value: `${product.nutritionalInfo.sugars}g`, indent: true },
                      { label: 'Fibra', value: `${product.nutritionalInfo.fiber}g` },
                      { label: 'Proteinas', value: `${product.nutritionalInfo.protein}g` },
                      { label: 'Sal', value: `${product.nutritionalInfo.salt}g`, last: true },
                    ].map((row) => (
                      <tr key={row.label} style={!row.last ? { borderBottom: '1px solid rgba(0,0,0,.06)' } : {}}>
                        <td style={{ padding: '10px 0', color: row.indent ? 'rgba(17,17,17,.4)' : 'rgba(17,17,17,.5)', fontWeight: 300, paddingLeft: row.indent ? '16px' : '0' }}>
                          {row.label}
                        </td>
                        <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 400, color: 'var(--dark)' }}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Collapsible>

            <Collapsible
              title="Alergenos e informacion dietetica"
              icon={<AlertTriangle className="w-5 h-5" />}
            >
              {/* Dietary badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.includes('sin-gluten') && (
                  <span className="inline-flex items-center gap-1.5" style={{ padding: '6px 12px', background: 'rgba(16,185,129,.08)', color: '#047857', fontSize: '12px', fontWeight: 400, borderRadius: '100px', border: '1px solid rgba(16,185,129,.2)' }}>
                    <WheatOff className="w-4 h-4" />
                    Sin gluten
                  </span>
                )}
                {product.isVegan && (
                  <span className="inline-flex items-center gap-1.5" style={{ padding: '6px 12px', background: 'rgba(34,197,94,.08)', color: '#15803d', fontSize: '12px', fontWeight: 400, borderRadius: '100px', border: '1px solid rgba(34,197,94,.2)' }}>
                    <Leaf className="w-4 h-4" />
                    Vegano
                  </span>
                )}
                {product.hasHoney && (
                  <span className="inline-flex items-center gap-1.5" style={{ padding: '6px 12px', background: 'rgba(245,158,11,.08)', color: '#b45309', fontSize: '12px', fontWeight: 400, borderRadius: '100px', border: '1px solid rgba(245,158,11,.2)' }}>
                    Con miel
                  </span>
                )}
              </div>

              {/* Allergen warning */}
              <div className="p-4" style={{ background: 'rgba(245,158,11,.06)', border: '1px solid rgba(245,158,11,.15)' }}>
                <p style={{ color: '#92400e', fontWeight: 400, marginBottom: '4px', fontSize: '14px' }}>Informacion sobre alergenos</p>
                <p style={{ color: '#a16207', fontSize: '13px', fontWeight: 300 }}>{product.allergens}</p>
              </div>
            </Collapsible>

            <Collapsible
              title="Frescura y envío"
              icon={<Clock className="w-5 h-5" />}
            >
              <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85 }}>
                Tostamos granola cada semana bajo demanda en lotes pequeños, nunca la almacenamos. Eso significa que recibirás tu granola solo unas horas o días tras su elaboración.
              </p>
            </Collapsible>

            <Collapsible
              title="Packaging sostenible"
              icon={<Leaf className="w-5 h-5" />}
            >
              <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85 }}>
                Nuestras granolas se envían en un packaging de papel sostenible y 100% reciclable. Te recomendamos que cuando lleguen a casa las vuelques en un tarro de cristal para conservarla mejor.
              </p>
            </Collapsible>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '32px' }}>
                Tambien te puede gustar
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((p) => (
                  <div key={p.id}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

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
