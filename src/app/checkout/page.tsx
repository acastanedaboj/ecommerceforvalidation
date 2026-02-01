'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, CreditCard, Truck, Shield, Lock } from 'lucide-react';
import { useCartStore, isCartBundleItem } from '@/store/cart-store';
import { generateBundleSummary } from '@/lib/bundle';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { formatPrice, cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const spanishProvinces = [
  { value: 'A Coruña', label: 'A Coruña' },
  { value: 'Álava', label: 'Álava' },
  { value: 'Albacete', label: 'Albacete' },
  { value: 'Alicante', label: 'Alicante' },
  { value: 'Almería', label: 'Almería' },
  { value: 'Asturias', label: 'Asturias' },
  { value: 'Ávila', label: 'Ávila' },
  { value: 'Badajoz', label: 'Badajoz' },
  { value: 'Barcelona', label: 'Barcelona' },
  { value: 'Burgos', label: 'Burgos' },
  { value: 'Cáceres', label: 'Cáceres' },
  { value: 'Cádiz', label: 'Cádiz' },
  { value: 'Cantabria', label: 'Cantabria' },
  { value: 'Castellón', label: 'Castellón' },
  { value: 'Ciudad Real', label: 'Ciudad Real' },
  { value: 'Córdoba', label: 'Córdoba' },
  { value: 'Cuenca', label: 'Cuenca' },
  { value: 'Girona', label: 'Girona' },
  { value: 'Granada', label: 'Granada' },
  { value: 'Guadalajara', label: 'Guadalajara' },
  { value: 'Guipúzcoa', label: 'Guipúzcoa' },
  { value: 'Huelva', label: 'Huelva' },
  { value: 'Huesca', label: 'Huesca' },
  { value: 'Illes Balears', label: 'Illes Balears' },
  { value: 'Jaén', label: 'Jaén' },
  { value: 'La Rioja', label: 'La Rioja' },
  { value: 'Las Palmas', label: 'Las Palmas' },
  { value: 'León', label: 'León' },
  { value: 'Lleida', label: 'Lleida' },
  { value: 'Lugo', label: 'Lugo' },
  { value: 'Madrid', label: 'Madrid' },
  { value: 'Málaga', label: 'Málaga' },
  { value: 'Murcia', label: 'Murcia' },
  { value: 'Navarra', label: 'Navarra' },
  { value: 'Ourense', label: 'Ourense' },
  { value: 'Palencia', label: 'Palencia' },
  { value: 'Pontevedra', label: 'Pontevedra' },
  { value: 'Salamanca', label: 'Salamanca' },
  { value: 'Santa Cruz de Tenerife', label: 'Santa Cruz de Tenerife' },
  { value: 'Segovia', label: 'Segovia' },
  { value: 'Sevilla', label: 'Sevilla' },
  { value: 'Soria', label: 'Soria' },
  { value: 'Tarragona', label: 'Tarragona' },
  { value: 'Teruel', label: 'Teruel' },
  { value: 'Toledo', label: 'Toledo' },
  { value: 'Valencia', label: 'Valencia' },
  { value: 'Valladolid', label: 'Valladolid' },
  { value: 'Vizcaya', label: 'Vizcaya' },
  { value: 'Zamora', label: 'Zamora' },
  { value: 'Zaragoza', label: 'Zaragoza' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const cartTotal = getCartTotal();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash_on_delivery'>('card');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="section">
        <div className="container-custom text-center">
          <h1 className="text-2xl mb-4">Tu carrito está vacío</h1>
          <p className="text-neutral-600 mb-6">
            Añade algunos productos antes de continuar con el checkout.
          </p>
          <Link href="/tienda" className="btn-primary">
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.phone) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.address) newErrors.address = 'La dirección es obligatoria';
    if (!formData.city) newErrors.city = 'La ciudad es obligatoria';
    if (!formData.province) newErrors.province = 'La provincia es obligatoria';
    if (!formData.postalCode) newErrors.postalCode = 'El código postal es obligatorio';
    else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Código postal no válido';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'Debes aceptar las condiciones de venta';
    }
    if (!acceptedPrivacy) {
      newErrors.privacy = 'Debes aceptar la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }

    setIsLoading(true);

    try {
      // For card payment, create Stripe checkout session
      if (paymentMethod === 'card') {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((item) => {
              if (isCartBundleItem(item)) {
                return {
                  productId: item.bundleId,
                  productName: item.bundleName,
                  productDescription: generateBundleSummary(item.flavors),
                  quantity: item.quantity,
                  packSize: item.packSize,
                  isSubscription: item.isSubscription,
                  priceInCents: item.priceInCents,
                  isBundle: true,
                  flavors: item.flavors,
                };
              }
              return {
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                packSize: item.packSize,
                isSubscription: item.isSubscription,
                priceInCents: item.priceInCents,
              };
            }),
            customer: formData,
            paymentMethod,
          }),
        });

        const data = await response.json();

        if (data.url) {
          // Redirect to Stripe Checkout
          window.location.href = data.url;
        } else {
          throw new Error(data.error || 'Error al procesar el pago');
        }
      } else {
        // Cash on delivery - create order directly
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((item) => {
              if (isCartBundleItem(item)) {
                return {
                  productId: item.bundleId,
                  productName: item.bundleName,
                  productDescription: generateBundleSummary(item.flavors),
                  quantity: item.quantity,
                  packSize: item.packSize,
                  isSubscription: item.isSubscription,
                  priceInCents: item.priceInCents,
                  isBundle: true,
                  flavors: item.flavors,
                };
              }
              return {
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                packSize: item.packSize,
                isSubscription: item.isSubscription,
                priceInCents: item.priceInCents,
              };
            }),
            customer: formData,
            paymentMethod,
            totals: cartTotal,
          }),
        });

        const data = await response.json();

        if (data.success) {
          clearCart();
          router.push(`/checkout/confirmacion?order=${data.orderNumber}`);
        } else {
          throw new Error(data.error || 'Error al crear el pedido');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section-sm bg-neutral-50 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tienda"
            className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver a la tienda
          </Link>
          <h1 className="text-3xl font-display text-neutral-900">
            Finalizar compra
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact info */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl text-neutral-900 mb-4">
                  Información de contacto
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="tu@email.com"
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre completo"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Teléfono"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      placeholder="+34 600 000 000"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Shipping address */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl text-neutral-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary-600" />
                  Dirección de envío
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    placeholder="Calle, número, piso..."
                    required
                  />
                  <Input
                    label="Información adicional (opcional)"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Apartamento, portal, etc."
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input
                      label="Ciudad"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      required
                    />
                    <Select
                      label="Provincia"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      error={errors.province}
                      options={spanishProvinces}
                      placeholder="Selecciona..."
                      required
                    />
                    <Input
                      label="Código postal"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      error={errors.postalCode}
                      placeholder="28001"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl text-neutral-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  Método de pago
                </h2>
                <div className="space-y-3">
                  <label
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors',
                      paymentMethod === 'card'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    )}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                        paymentMethod === 'card'
                          ? 'border-primary-500'
                          : 'border-neutral-300'
                      )}
                    >
                      {paymentMethod === 'card' && (
                        <div className="w-3 h-3 rounded-full bg-primary-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-neutral-900">
                        Tarjeta de crédito/débito
                      </span>
                      <p className="text-sm text-neutral-500">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-neutral-100 rounded text-xs">Visa</span>
                      <span className="px-2 py-1 bg-neutral-100 rounded text-xs">MC</span>
                    </div>
                  </label>

                  <label
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors',
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    )}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={paymentMethod === 'cash_on_delivery'}
                      onChange={() => setPaymentMethod('cash_on_delivery')}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                        paymentMethod === 'cash_on_delivery'
                          ? 'border-primary-500'
                          : 'border-neutral-300'
                      )}
                    >
                      {paymentMethod === 'cash_on_delivery' && (
                        <div className="w-3 h-3 rounded-full bg-primary-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-neutral-900">
                        Pago contra reembolso
                      </span>
                      <p className="text-sm text-neutral-500">
                        Paga al recibir tu pedido (+2,00€)
                      </p>
                    </div>
                  </label>
                </div>
              </section>

              {/* Terms and conditions */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl text-neutral-900 mb-4">
                  Condiciones legales
                </h2>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-600">
                      He leído y acepto las{' '}
                      <Link href="/legal/condiciones-venta" className="text-primary-600 hover:underline">
                        Condiciones de venta
                      </Link>{' '}
                      *
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-red-600 ml-7">{errors.terms}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedPrivacy}
                      onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-600">
                      He leído y acepto la{' '}
                      <Link href="/legal/privacidad" className="text-primary-600 hover:underline">
                        Política de privacidad
                      </Link>{' '}
                      *
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="text-sm text-red-600 ml-7">{errors.privacy}</p>
                  )}
                </div>
              </section>
            </div>

            {/* Right column - Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl text-neutral-900 mb-4">
                  Resumen del pedido
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => {
                    const isBundle = isCartBundleItem(item);
                    const itemKey = isBundle
                      ? item.bundleId
                      : `${item.productId}-${item.packSize}-${item.isSubscription}`;
                    const itemName = isBundle ? item.bundleName : item.productName;
                    const itemImage = isBundle
                      ? item.flavors[0]?.productImage || '/images/placeholder-product.jpg'
                      : item.productImage || '/images/placeholder-product.jpg';
                    const itemId = isBundle ? item.bundleId : item.productId;
                    const lineTotal = cartTotal.items.find(
                      (i) =>
                        i.productId === itemId &&
                        i.packSize === item.packSize &&
                        i.isSubscription === item.isSubscription
                    )?.lineTotalCents || 0;

                    return (
                      <div key={itemKey} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={itemImage}
                            alt={itemName}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-neutral-900 text-sm line-clamp-1">
                            {itemName}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {isBundle
                              ? generateBundleSummary(item.flavors)
                              : `${item.packSize > 1 ? `Pack ${item.packSize}` : '1 ud'} x ${item.quantity}`}
                            {item.isSubscription && ' (Suscripcion)'}
                          </p>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(lineTotal)}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span>{formatPrice(cartTotal.subtotalCents)}</span>
                  </div>
                  {cartTotal.discountCents > 0 && (
                    <div className="flex justify-between text-accent-600">
                      <span>Descuento</span>
                      <span>-{formatPrice(cartTotal.discountCents)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Envío</span>
                    <span>
                      {cartTotal.isFreeShipping ? (
                        <span className="text-accent-600">Gratis</span>
                      ) : (
                        formatPrice(cartTotal.shippingCents)
                      )}
                    </span>
                  </div>
                  {paymentMethod === 'cash_on_delivery' && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Contrareembolso</span>
                      <span>{formatPrice(200)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>IVA incluido (10%)</span>
                    <span>{formatPrice(cartTotal.taxCents)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-neutral-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-2xl font-bold">
                      {formatPrice(
                        cartTotal.totalCents +
                          (paymentMethod === 'cash_on_delivery' ? 200 : 0)
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  isLoading={isLoading}
                  leftIcon={<Lock className="w-4 h-4" />}
                >
                  {paymentMethod === 'card' ? 'Pagar ahora' : 'Confirmar pedido'}
                </Button>

                {/* Trust badges */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-500">
                  <Shield className="w-4 h-4" />
                  <span>Pago 100% seguro con Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
