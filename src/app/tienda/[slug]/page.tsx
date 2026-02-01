'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Truck, RefreshCw, Shield, Plus, Minus, FileText, List, BarChart2, AlertTriangle, Package } from 'lucide-react';
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
      <div className="section">
        <div className="container-custom text-center">
          <h1 className="font-display text-2xl font-medium text-stone-800 mb-6">Producto no encontrado</h1>
          <Link href="/tienda" className="btn-primary">
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
      <div className="section-sm bg-cream-50">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-10" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-stone-400 hover:text-earth-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li className="text-stone-300">/</li>
              <li>
                <Link href="/tienda" className="text-stone-400 hover:text-earth-600 transition-colors">
                  Tienda
                </Link>
              </li>
              <li className="text-stone-300">/</li>
              <li className="text-stone-700 font-medium">{product.name}</li>
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
                {product.tags.includes('ecologico') && (
                  <span className="badge-accent">Ecologico</span>
                )}
              </div>
            </div>

            {/* Product info */}
            <div>
              <div className="mb-8">
                <p className="text-sm text-stone-400 uppercase tracking-wider mb-2">
                  {product.weight}g · SKU: {product.sku}
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-medium text-stone-800 mb-4">
                  {product.name}
                </h1>
                <p className="text-stone-500 text-lg leading-relaxed">{product.shortDescription}</p>
              </div>

              {/* Price display */}
              <div className="bg-white rounded-2xl p-6 mb-8 shadow-soft border border-cream-100">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-display text-earth-600">
                    {formatPrice(packUnitPrice)}
                  </span>
                  <span className="text-stone-400">/unidad</span>
                  {discount > 0 && (
                    <>
                      <span className="text-lg text-stone-300 line-through">
                        {formatPrice(basePrice)}
                      </span>
                      <span className="badge bg-olive-100 text-olive-700">-{Math.round(discount * 100)}%</span>
                    </>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-sm text-olive-600 font-medium">
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
                  className="mt-4 flex items-center gap-2 text-earth-600 hover:text-earth-700 font-medium text-sm transition-colors"
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
                    'w-full p-5 rounded-2xl border-2 transition-all text-left group',
                    isSubscription
                      ? 'border-earth-500 bg-earth-50 shadow-inner-glow'
                      : 'border-cream-200 bg-white hover:border-earth-200 hover:bg-cream-50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                        isSubscription ? 'bg-earth-100' : 'bg-cream-100 group-hover:bg-cream-200'
                      )}>
                        <RefreshCw
                          className={cn(
                            'w-6 h-6 transition-colors',
                            isSubscription ? 'text-earth-600' : 'text-stone-400'
                          )}
                        />
                      </div>
                      <div>
                        <span className="font-medium text-stone-800 block mb-1">
                          Suscripcion mensual (Pack 6)
                        </span>
                        <span className="text-sm text-stone-500">
                          {formatPrice(calculateSubscriptionUnitPrice())}/ud · Envio gratis · Cancela cuando quieras
                        </span>
                      </div>
                    </div>
                    <span className="badge bg-olive-500 text-stone-700">-15%</span>
                  </div>
                </button>
              </div>

              {/* Quantity selector */}
              <div className="mb-8">
                <label className="label mb-4">Cantidad:</label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-white border border-cream-200 rounded-full shadow-soft">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-cream-50 rounded-l-full transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="w-4 h-4 text-stone-500" />
                    </button>
                    <span className="w-14 text-center font-semibold text-stone-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 hover:bg-cream-50 rounded-r-full transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4 text-stone-500" />
                    </button>
                  </div>
                  <span className="text-stone-500">
                    = {totalUnits} {totalUnits === 1 ? 'bolsa' : 'bolsas'}
                  </span>
                </div>
              </div>

              {/* Trust badges - above CTA */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="trust-badge-compact">
                  <Truck className="w-4 h-4 text-earth-500" />
                  <span>Envio 2-4 dias</span>
                </div>
                <div className="trust-badge-compact">
                  <Shield className="w-4 h-4 text-earth-500" />
                  <span>Pago seguro</span>
                </div>
                <div className="trust-badge-compact">
                  <RefreshCw className="w-4 h-4 text-earth-500" />
                  <span>14 dias devolucion</span>
                </div>
              </div>

              {/* Total and add to cart */}
              <div id="main-cta" className="bg-stone-900 text-[#ffffec] rounded-2xl p-6 shadow-soft-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-stone-300">Total:</span>
                  <div className="text-right">
                    <span className="text-3xl font-display">{formatPrice(totalPrice)}</span>
                    {isFreeShipping && (
                      <p className="text-earth-400 text-sm flex items-center gap-2 justify-end mt-1">
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
                    'btn w-full justify-center bg-earth-500 hover:bg-earth-600 text-[#ffffec] text-base py-4',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {isAdding ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <ShoppingBag className="w-5 h-5 mr-2" />
                  )}
                  {isSubscription ? 'Suscribirme ahora' : 'Anadir al carrito'}
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
              <div className="prose-custom">
                {product.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-stone-600 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Collapsible>

            <Collapsible
              title="Ingredientes"
              icon={<List className="w-5 h-5" />}
            >
              <p className="text-stone-600">{product.ingredients}</p>
            </Collapsible>

            <Collapsible
              title="Informacion nutricional"
              icon={<BarChart2 className="w-5 h-5" />}
            >
              <p className="text-sm text-stone-400 mb-4">Por {product.nutritionalInfo.servingSize}</p>
              <div className="bg-cream-50 rounded-xl p-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-cream-200">
                      <td className="py-2.5 text-stone-600">Calorias</td>
                      <td className="py-2.5 text-right font-medium text-stone-800">
                        {product.nutritionalInfo.calories} kcal
                      </td>
                    </tr>
                    <tr className="border-b border-cream-200">
                      <td className="py-2.5 text-stone-600">Grasas</td>
                      <td className="py-2.5 text-right font-medium text-stone-800">
                        {product.nutritionalInfo.fat}g
                      </td>
                    </tr>
                    <tr className="border-b border-cream-200">
                      <td className="py-2.5 text-stone-500 pl-4">- Saturadas</td>
                      <td className="py-2.5 text-right font-medium text-stone-700">
                        {product.nutritionalInfo.saturatedFat}g
                      </td>
                    </tr>
                    <tr className="border-b border-cream-200">
                      <td className="py-2.5 text-stone-600">Carbohidratos</td>
                      <td className="py-2.5 text-right font-medium text-stone-800">
                        {product.nutritionalInfo.carbohydrates}g
                      </td>
                    </tr>
                    <tr className="border-b border-cream-200">
                      <td className="py-2.5 text-stone-500 pl-4">- Azucares</td>
                      <td className="py-2.5 text-right font-medium text-stone-700">
                        {product.nutritionalInfo.sugars}g
                      </td>
                    </tr>
                    <tr className="border-b border-cream-200">
                      <td className="py-2.5 text-stone-600">Fibra</td>
                      <td className="py-2.5 text-right font-medium text-stone-800">
                        {product.nutritionalInfo.fiber}g
                      </td>
                    </tr>
                    <tr className="border-b border-cream-200">
                      <td className="py-2.5 text-stone-600">Proteinas</td>
                      <td className="py-2.5 text-right font-medium text-stone-800">
                        {product.nutritionalInfo.protein}g
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-stone-600">Sal</td>
                      <td className="py-2.5 text-right font-medium text-stone-800">
                        {product.nutritionalInfo.salt}g
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Collapsible>

            <Collapsible
              title="Alergenos"
              icon={<AlertTriangle className="w-5 h-5" />}
            >
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-amber-800">{product.allergens}</p>
              </div>
            </Collapsible>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-medium text-stone-800 mb-8">
                Tambien te puede gustar
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((p, index) => (
                  <div
                    key={p.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
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
