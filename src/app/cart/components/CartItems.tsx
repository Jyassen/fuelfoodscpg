'use client';

import React from 'react';
import Image from 'next/image';
import { CheckoutCartItem } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/form';
import { formatCurrency } from '@/lib/utils';
import QuantityControls from './QuantityControls';
import SubscriptionDetails from './SubscriptionDetails';

interface CartItemsProps {
  items: CheckoutCartItem[];
}

export default function CartItems({ items }: CartItemsProps) {
  const { removeItem } = useCart();

  const handleRemoveItem = (itemId: string, itemName: string) => {
    if (window.confirm(`Remove ${itemName} from your cart?`)) {
      removeItem(itemId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Cart Items</h2>
        
        <div className="space-y-6">
          {items.map((item) => (
            <CartItemRow 
              key={item.id}
              item={item}
              onRemove={() => handleRemoveItem(item.id, item.product.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CartItemRowProps {
  item: CheckoutCartItem;
  onRemove: () => void;
}

function CartItemRow({ item, onRemove }: CartItemRowProps) {
  const { product, quantity, type, totalPrice, packageConfiguration, subscriptionFrequency } = item;
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const normalize = (u?: string) => {
    if (!u) return '/images/placeholder.png';
    if (u.startsWith('http') || u.startsWith('data:')) return u;
    return u.startsWith('/') ? u : `/${u}`;
  };

  // Prefer homepage choice images for clarity and consistency
  const resolveDisplayImage = (): { src: string; alt: string } => {
    // Subscription plan images
    if (type === 'subscription' && packageConfiguration) {
      const plan = packageConfiguration.planType;
      if (plan === 'starter') return { src: '/images/imgpsh_fullsize_anim-3-1-1.png', alt: 'Starter Plan' };
      if (plan === 'pro') return { src: '/images/image-2-4.png', alt: 'Pro Plan' };
      if (plan === 'elite') return { src: '/images/5-pack1.webp', alt: 'Elite Plan' };
    }
    // Individual variety images (match homepage showcase)
    const idOrSlug = (product.slug || product.id || '').toLowerCase();
    const nameLower = (product.name || '').toLowerCase();
    if (idOrSlug.includes('mega') || nameLower.includes('mega')) {
      return { src: '/images/megamixsidebyside.jpg', alt: 'Mega Mix' };
    }
    if (idOrSlug.includes('brassica') || nameLower.includes('brassica')) {
      return { src: '/images/brassicablendsidebyside.jpg', alt: 'Brassica Blend' };
    }
    if (idOrSlug.includes('sunn') || nameLower.includes('sunn')) {
      return { src: '/images/sunniessidebyside.jpg', alt: 'Sunnies Snacks' };
    }
    // Fallback to product image
    return { src: normalize(primaryImage?.url), alt: primaryImage?.alt || product.name };
  };
  const displayImage = resolveDisplayImage();

  return (
    <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6 py-6 border-b border-gray-200 last:border-b-0">
      {/* Product Image - profile tab style */}
      <div className="flex-shrink-0">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
          <Image
            src={normalize(displayImage.src)}
            alt={displayImage.alt}
            width={128}
            height={128}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {product.shortDescription || product.description}
          </p>
          
          {/* Type Badge */}
          <div className="flex items-center space-x-2 mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              type === 'subscription' 
                ? 'bg-fuelfoods-green-100 text-fuelfoods-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {type === 'subscription' ? 'Subscription' : 'Individual Pack'}
            </span>
            
            {subscriptionFrequency && (
              <span className="text-xs text-gray-500">
                {subscriptionFrequency.replace('-', ' ')} delivery
              </span>
            )}
          </div>

          {/* Subscription Configuration Details */}
          {type === 'subscription' && packageConfiguration && (
            <SubscriptionDetails configuration={packageConfiguration} />
          )}
        </div>

        {/* Mobile Price Display */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Unit Price:</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(item.unitPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="font-semibold text-lg text-gray-900">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-center space-y-4">
        <QuantityControls 
          itemId={item.id}
          currentQuantity={quantity}
          disabled={type === 'subscription'} // Subscription quantities are fixed based on plan
        />
        
        {type === 'subscription' && (
          <p className="text-xs text-gray-500 text-center">
            Subscription quantity is fixed by plan
          </p>
        )}
      </div>

      {/* Desktop Price and Remove */}
      <div className="hidden lg:flex lg:flex-col lg:items-end lg:space-y-3 lg:min-w-[120px]">
        <div className="text-right">
          <div className="text-sm text-gray-600 mb-1">
            {formatCurrency(item.unitPrice)} each
          </div>
          <div className="font-semibold text-lg text-gray-900">
            {formatCurrency(totalPrice)}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Remove
        </Button>
      </div>

      {/* Mobile Remove Button */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          fullWidth
          className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
        >
          Remove from Cart
        </Button>
      </div>
    </div>
  );
}