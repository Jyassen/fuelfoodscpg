'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/form';

export default function CartHeader() {
  const { itemCount, clearCart, hasItems } = useCart();

  const handleClearCart = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your cart? This action cannot be undone.'
      )
    ) {
      clearCart();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        {hasItems() && (
          <p className="text-gray-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        )}
      </div>

      {hasItems() && (
        <div className="mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCart}
            className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}
