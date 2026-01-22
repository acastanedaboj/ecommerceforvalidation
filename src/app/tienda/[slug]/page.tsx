'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart, Share2, Check, Truck, RefreshCw, Shield, ChevronLeft, Plus, Minus } from 'lucide-react';
import { getProductBySlug, getRetailProducts } from '@/data/products';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { calculatePackUnitPrice, calculateSubscriptionUnitPrice, getPackDiscount } from '@/lib/pricing';
import { PRICING, SHIPPING } from '@/lib/constants';
import { ProductCard } from '@/components/product/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  if (!product) {
    return (
      <div className="section">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
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

    toggleCart();
  };

  // Related products
  const relatedProducts = getRetailProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="section-sm">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-neutral-500 hover:text-primary-600">
                Inicio
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li>
              <Link href="/tienda" className="text-neutral-500 hover:text-primary-600">
                Tienda
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li className="text-neutral-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product main section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
              <Image
                src={product.images[selectedImage] || '/images/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.tags.includes('sin-gluten') && (
                  <span className="badge bg-white/90 text-neutral-800 shadow-sm">
                    Sin gluten
                  </span>
                )}
                {product.tags.includes('ecologico') && (
                  <span className="badge bg-accent-500 text-white">Ecológico</span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-transparent hover:border-neutral-300'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - imagen ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <div className="mb-6">
              <p className="text-sm text-neutral-500 uppercase tracking-wide mb-1">
                {product.weight}g · SKU: {product.sku}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>
              <p className="text-neutral-600">{product.shortDescription}</p>
            </div>

            {/* Price display */}
            <div className="bg-neutral-50 rounded-xl p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-neutral-900">
                  {formatPrice(packUnitPrice)}
                </span>
                <span className="text-neutral-500">/unidad</span>
                {discount > 0 && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">
                      {formatPrice(basePrice)}
                    </span>
                    <span className="badge-accent">-{Math.round(discount * 100)}%</span>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="text-sm text-accent-600 font-medium">
                  Ahorras {formatPrice(savings)} en este pedido
                </p>
              )}
            </div>

            {/* Pack selection */}
            <div className="mb-6">
              <label className="label mb-3">Elige tu pack:</label>
              <div className="grid grid-cols-4 gap-3">
                {[1, 3, 4, 6].map((pack) => {
                  const packPrice = calculatePackUnitPrice(pack);
                  const packDiscount = getPackDiscount(pack);
                  return (
                    <button
                      key={pack}
                      type="button"
                      onClick={() => {
                        setSelectedPack(pack);
                        setIsSubscription(false);
                      }}
                      className={cn(
                        'py-3 px-2 rounded-lg border-2 transition-all text-center',
                        selectedPack === pack && !isSubscription
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      )}
                    >
                      <span className="block font-semibold text-neutral-900">
                        {pack === 1 ? '1 ud' : `Pack ${pack}`}
                      </span>
                      <span className="block text-sm text-neutral-500">
                        {formatPrice(packPrice)}/ud
                      </span>
                      {packDiscount > 0 && (
                        <span className="block text-xs text-accent-600 mt-1">
                          -{Math.round(packDiscount * 100)}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subscription option */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsSubscription(!isSubscription);
                  if (!isSubscription) setSelectedPack(6);
                }}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all text-left',
                  isSubscription
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw
                      className={cn(
                        'w-5 h-5',
                        isSubscription ? 'text-primary-600' : 'text-neutral-400'
                      )}
                    />
                    <div>
                      <span className="font-semibold text-neutral-900 block">
                        Suscripción mensual (Pack 6)
                      </span>
                      <span className="text-sm text-neutral-500">
                        {formatPrice(calculateSubscriptionUnitPrice())}/ud · Envío gratis · Cancela cuando quieras
                      </span>
                    </div>
                  </div>
                  <span className="badge-accent">-15%</span>
                </div>
              </button>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="label mb-3">Cantidad:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                    aria-label="Reducir cantidad"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-neutral-500">
                  = {totalUnits} {totalUnits === 1 ? 'bolsa' : 'bolsas'}
                </span>
              </div>
            </div>

            {/* Total and add to cart */}
            <div className="bg-neutral-900 text-white rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-neutral-300">Total:</span>
                <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
              </div>
              {isFreeShipping && (
                <p className="text-accent-400 text-sm mb-4 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  ¡Envío gratis incluido!
                </p>
              )}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn w-full justify-center bg-primary-500 hover:bg-primary-600 text-white"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {isSubscription ? 'Suscribirme ahora' : 'Añadir al carrito'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-5 h-5 text-primary-600" />
                <span className="text-neutral-600">Envío 2-4 días</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="text-neutral-600">Pago seguro</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary-600" />
                <span className="text-neutral-600">14 días devolución</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product details tabs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
              Descripción
            </h2>
            <div className="prose-custom">
              {product.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-neutral-600 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Ingredients & nutrition */}
          <div className="space-y-6">
            {/* Ingredients */}
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-semibold text-neutral-900 mb-3">Ingredientes</h3>
              <p className="text-sm text-neutral-600">{product.ingredients}</p>
            </div>

            {/* Allergens */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3">Información de alérgenos</h3>
              <p className="text-sm text-amber-700">{product.allergens}</p>
            </div>

            {/* Nutritional info */}
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-semibold text-neutral-900 mb-3">
                Información nutricional ({product.nutritionalInfo.servingSize})
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-600">Calorías</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.calories} kcal
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-600">Grasas</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.fat}g
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-600 pl-4">- Saturadas</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.saturatedFat}g
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-600">Carbohidratos</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.carbohydrates}g
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-600 pl-4">- Azúcares</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.sugars}g
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-600">Fibra</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.fiber}g
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-600">Proteínas</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.protein}g
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-600">Sal</td>
                    <td className="py-2 text-right font-medium">
                      {product.nutritionalInfo.salt}g
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
              También te puede gustar
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
