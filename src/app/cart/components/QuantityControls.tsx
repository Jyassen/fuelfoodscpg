'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/form';

interface QuantityControlsProps {
  itemId: string;
  currentQuantity: number;
  disabled?: boolean;
  maxQuantity?: number;
  minQuantity?: number;
}

export default function QuantityControls({
  itemId,
  currentQuantity,
  disabled = false,
  maxQuantity = 10,
  minQuantity = 1,
}: QuantityControlsProps) {
  const { updateQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (disabled || newQuantity < minQuantity || newQuantity > maxQuantity) {
      return;
    }

    setIsUpdating(true);
    try {
      updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const incrementQuantity = () => {
    handleQuantityChange(currentQuantity + 1);
  };

  const decrementQuantity = () => {
    handleQuantityChange(currentQuantity - 1);
  };

  const canDecrement =
    !disabled && currentQuantity > minQuantity && !isUpdating;
  const canIncrement =
    !disabled && currentQuantity < maxQuantity && !isUpdating;

  return (
    <div className="flex items-center space-x-3">
      <Button
        variant="outline"
        size="icon"
        onClick={decrementQuantity}
        disabled={!canDecrement}
        className="h-8 w-8 rounded-full"
        aria-label="Decrease quantity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </Button>

      <div className="flex items-center justify-center min-w-[60px]">
        <span
          className={`text-center font-medium ${
            disabled ? 'text-gray-400' : 'text-gray-900'
          }`}
        >
          {currentQuantity}
        </span>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={incrementQuantity}
        disabled={!canIncrement}
        className="h-8 w-8 rounded-full"
        aria-label="Increase quantity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </Button>
    </div>
  );
}
