'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Check,
  Truck,
  MapPin,
} from 'lucide-react';
import { useCartStore, isCartBundleItem } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { SHIPPING } from '@/lib/constants';
import { BundleCartItem } from '@/components/bundle';
import { useSession } from 'next-auth/react';

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    getCartTotal,
    localDelivery,
    localDeliveryEmail,
    setLocalDelivery,
    setLocalDeliveryEmail,
  } = useCartStore();
  const { data: session } = useSession();
  const [localEmailError, setLocalEmailError] = useState('');

  // Auto-fill email from session when local delivery is enabled
  useEffect(() => {
    if (localDelivery && session?.user?.email && !localDeliveryEmail) {
      setLocalDeliveryEmail(session.user.email);
    }
  }, [localDelivery, session, localDeliveryEmail, setLocalDeliveryEmail]);
  const cartTotal = getCartTotal();

  // Calculate how much more for free shipping
  const amountForFreeShipping = cartTotal.isFreeShipping
    ? 0
    : Math.max(0, SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS - cartTotal.subtotalCents);

  const progressPercentage = Math.min(
    100,
    (cartTotal.subtotalCents / SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS) * 100
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 transition-all duration-400',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        style={{ background: 'rgba(17,17,17,.5)', backdropFilter: 'blur(4px)' }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col transition-transform duration-400',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{
          background: 'var(--white)',
          boxShadow: isOpen ? '-20px 0 60px rgba(0,0,0,.1)' : 'none',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
        >
          <h2
            className="flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--dark)' }}
          >
            <ShoppingBag className="h-5 w-5" style={{ color: 'var(--brown)' }} />
            Tu carrito
            {items.length > 0 && (
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  color: 'rgba(17,17,17,.4)',
                }}
              >
                ({cartTotal.itemCount} {cartTotal.itemCount === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2.5 transition-colors hover:opacity-50"
            style={{ background: 'none', border: 'none' }}
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" style={{ color: 'rgba(17,17,17,.4)' }} />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && !cartTotal.isFreeShipping && (
          <div
            className="px-6 py-4"
            style={{ background: 'var(--off)', borderBottom: '1px solid rgba(0,0,0,.05)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4" style={{ color: 'var(--brown)' }} />
              <p style={{ fontSize: '13px', color: 'var(--dark)', fontWeight: 300 }}>
                Te faltan{' '}
                <strong style={{ fontWeight: 700 }}>{formatPrice(amountForFreeShipping)}</strong>{' '}
                para envio gratis
              </p>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        )}

        {items.length > 0 && cartTotal.isFreeShipping && (
          <div
            className="px-6 py-4"
            style={{
              background: 'rgba(243,238,148,.15)',
              borderBottom: '1px solid rgba(243,238,148,.3)',
            }}
          >
            <p
              className="flex items-center gap-2"
              style={{ fontSize: '13px', color: 'var(--dark)', fontWeight: 700 }}
            >
              <Check className="h-4 w-4" />
              Genial! Tu pedido tiene envio gratis
            </p>
          </div>
        )}

        {/* Cart items */}
        <div className="scrollbar-custom flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div
                className="mb-6 flex h-20 w-20 items-center justify-center"
                style={{ background: 'var(--off)' }}
              >
                <ShoppingBag className="h-10 w-10" style={{ color: 'rgba(17,17,17,.15)' }} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--dark)',
                  marginBottom: '8px',
                }}
              >
                Tu carrito esta vacio
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(17,17,17,.4)',
                  fontWeight: 300,
                  marginBottom: '32px',
                }}
              >
                Anade algunos productos deliciosos
              </p>
              <Link href="/tienda" onClick={() => setIsOpen(false)} className="btn-pill">
                Ver productos
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none' }}>
              {items.map((item) => {
                // Check if this is a bundle item
                if (isCartBundleItem(item)) {
                  return (
                    <li
                      key={item.bundleId}
                      className="px-6"
                      style={{ borderBottom: '1px solid rgba(0,0,0,.05)' }}
                    >
                      <BundleCartItem item={item} />
                    </li>
                  );
                }

                // Regular single product item
                return (
                  <li
                    key={`${item.productId}-${item.packSize}-${item.isSubscription}`}
                    className="px-6 py-5 transition-colors"
                    style={{ borderBottom: '1px solid rgba(0,0,0,.05)' }}
                  >
                    <div className="flex gap-4">
                      {/* Product image */}
                      <Link
                        href={`/tienda/${item.productSlug}`}
                        onClick={() => setIsOpen(false)}
                        className="group relative h-20 w-20 flex-shrink-0 overflow-hidden"
                        style={{ background: 'var(--off)' }}
                      >
                        <Image
                          src={item.productImage || '/images/placeholder-product.jpg'}
                          alt={item.productName}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="80px"
                        />
                      </Link>

                      {/* Product details */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/tienda/${item.productSlug}`}
                          onClick={() => setIsOpen(false)}
                          className="line-clamp-1 transition-colors"
                          style={{
                            fontWeight: 700,
                            fontSize: '14px',
                            color: 'var(--dark)',
                            textDecoration: 'none',
                          }}
                        >
                          {item.productName}
                        </Link>

                        {/* Pack/Subscription info */}
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {item.packSize > 1 && (
                            <span className="badge-secondary">Pack {item.packSize}</span>
                          )}
                          {item.isSubscription && (
                            <span
                              className="badge"
                              style={{ background: 'rgba(243,238,148,.3)', color: 'var(--dark)' }}
                            >
                              Suscripcion
                            </span>
                          )}
                        </div>

                        {/* Price and quantity */}
                        <div className="mt-3 flex items-center justify-between">
                          <div
                            className="flex items-center"
                            style={{ border: '1px solid rgba(0,0,0,.1)', borderRadius: '100px' }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.packSize,
                                  item.isSubscription,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 transition-colors hover:bg-off"
                              style={{
                                borderRadius: '100px 0 0 100px',
                                background: 'none',
                                border: 'none',
                              }}
                              aria-label="Reducir cantidad"
                            >
                              <Minus
                                className="h-3.5 w-3.5"
                                style={{ color: 'rgba(17,17,17,.4)' }}
                              />
                            </button>
                            <span
                              style={{
                                width: '32px',
                                textAlign: 'center',
                                fontSize: '13px',
                                fontWeight: 700,
                                color: 'var(--dark)',
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.packSize,
                                  item.isSubscription,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 transition-colors hover:bg-off"
                              style={{
                                borderRadius: '0 100px 100px 0',
                                background: 'none',
                                border: 'none',
                              }}
                              aria-label="Aumentar cantidad"
                            >
                              <Plus
                                className="h-3.5 w-3.5"
                                style={{ color: 'rgba(17,17,17,.4)' }}
                              />
                            </button>
                          </div>

                          <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--dark)' }}>
                            {formatPrice(
                              cartTotal.items.find(
                                (i) =>
                                  i.productId === item.productId &&
                                  i.packSize === item.packSize &&
                                  i.isSubscription === item.isSubscription
                              )?.lineTotalCents || 0
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.packSize, item.isSubscription)
                        }
                        className="self-start p-2 transition-all hover:opacity-50"
                        style={{ color: 'rgba(17,17,17,.2)', background: 'none', border: 'none' }}
                        aria-label={`Eliminar ${item.productName} del carrito`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div
            className="px-6 py-5"
            style={{ borderTop: '1px solid rgba(0,0,0,.07)', background: 'var(--white)' }}
          >
            {/* Local delivery option */}
            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={localDelivery}
                  onChange={(e) => {
                    setLocalDelivery(e.target.checked);
                    setLocalEmailError('');
                  }}
                  className="mt-0.5 accent-stone-700"
                  style={{ width: '16px', height: '16px' }}
                />
                <div className="flex-1">
                  <span
                    className="flex items-center gap-1.5"
                    style={{ fontSize: '13px', fontWeight: 700, color: 'var(--dark)' }}
                  >
                    <MapPin className="h-3.5 w-3.5" style={{ color: 'var(--brown)' }} />
                    Entrega gratuita en el centro de Málaga
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'rgba(17,17,17,.45)',
                      fontWeight: 300,
                      display: 'block',
                      marginTop: '2px',
                    }}
                  >
                    Nos pondremos en contacto para concertar la entrega
                  </span>
                </div>
              </label>

              {localDelivery && !session?.user?.email && (
                <div className="ml-7 mt-3">
                  <input
                    type="email"
                    value={localDeliveryEmail}
                    onChange={(e) => {
                      setLocalDeliveryEmail(e.target.value);
                      if (localEmailError) setLocalEmailError('');
                    }}
                    placeholder="Tu email de contacto"
                    className="w-full rounded-lg px-3 py-2 text-sm transition-colors"
                    style={{
                      border: localEmailError ? '1px solid #e53e3e' : '1px solid rgba(0,0,0,.12)',
                      fontSize: '13px',
                      outline: 'none',
                      background: 'var(--off)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--brown)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = localEmailError ? '#e53e3e' : 'rgba(0,0,0,.12)';
                    }}
                  />
                  {localEmailError && (
                    <p style={{ fontSize: '11px', color: '#e53e3e', marginTop: '4px' }}>
                      {localEmailError}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Subtotals */}
            <div className="space-y-2.5" style={{ fontSize: '13px' }}>
              <div className="flex justify-between">
                <span style={{ color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>Subtotal</span>
                <span style={{ color: 'var(--dark)', fontWeight: 300 }}>
                  {formatPrice(cartTotal.subtotalCents)}
                </span>
              </div>

              {cartTotal.discountCents > 0 && (
                <div className="flex justify-between" style={{ color: 'var(--blue)' }}>
                  <span>Descuento</span>
                  <span>-{formatPrice(cartTotal.discountCents)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span style={{ color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>
                  {localDelivery ? 'Entrega en Málaga' : 'Envío'}
                </span>
                <span>
                  {localDelivery ? (
                    <span style={{ color: 'var(--brown)', fontWeight: 700 }}>Gratis</span>
                  ) : cartTotal.isFreeShipping ? (
                    <span style={{ color: 'var(--brown)', fontWeight: 700 }}>Gratis</span>
                  ) : (
                    <span style={{ color: 'var(--dark)', fontWeight: 300 }}>
                      {formatPrice(cartTotal.shippingCents)}
                    </span>
                  )}
                </span>
              </div>

              <div
                className="flex justify-between"
                style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)' }}
              >
                <span>IVA incluido (10%)</span>
                <span>{formatPrice(cartTotal.taxCents)}</span>
              </div>
            </div>

            {/* Total */}
            <div
              className="mt-5 flex items-center justify-between pt-5"
              style={{ borderTop: '1px solid rgba(0,0,0,.07)' }}
            >
              <span style={{ fontWeight: 300, color: 'rgba(17,17,17,.5)', fontSize: '14px' }}>
                Total
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: 'var(--dark)',
                }}
              >
                {formatPrice(cartTotal.totalCents)}
              </span>
            </div>

            {/* Savings callout */}
            {cartTotal.discountCents > 0 && (
              <p
                className="mt-2 text-right"
                style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 300 }}
              >
                Has ahorrado {formatPrice(cartTotal.discountCents)}
              </p>
            )}

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={(e) => {
                if (localDelivery) {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!localDeliveryEmail.trim()) {
                    e.preventDefault();
                    setLocalEmailError('Introduce tu email para concertar la entrega');
                    return;
                  }
                  if (!emailRegex.test(localDeliveryEmail.trim())) {
                    e.preventDefault();
                    setLocalEmailError('Email no válido');
                    return;
                  }
                }
                setIsOpen(false);
              }}
              className="btn-primary mt-5 w-full justify-center py-4"
            >
              Finalizar compra
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            {/* Continue shopping */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn-ghost mt-2 w-full justify-center"
              style={{ fontSize: '13px' }}
            >
              seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
