'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@/lib/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="FuelFoods Logo"
                className="h-16 w-16 rounded-full"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {NAVIGATION_ITEMS.slice(0, 5).map(item => (
              <div key={item.title} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-800 hover:text-fuelfoods-green-500 px-3 py-2 text-sm font-semibold transition-colors uppercase tracking-wide"
                >
                  {item.title}
                </Link>
                {(item as any).children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {(item as any).children.map((child: any) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-fuelfoods-green-500"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              aria-label="Cart"
              className="text-gray-800 hover:text-fuelfoods-green-500 px-2 py-2 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <a
              href="/#plans"
              className="bg-fuelfoods-green-500 text-white px-6 py-3 rounded-full hover:bg-fuelfoods-green-600 transition-colors text-sm font-bold uppercase tracking-wide"
            >
              ORDER NOW
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-gray-700 hover:text-fuelfoods-green-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {NAVIGATION_ITEMS.slice(0, 4).map(item => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-fuelfoods-green-500 hover:bg-green-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {(item as any).children && (
                    <div className="pl-6">
                      {(item as any).children.map((child: any) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-fuelfoods-green-500 hover:bg-green-50 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-fuelfoods-green-500 hover:bg-green-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
              </Link>
              <a
                href="/#plans"
                className="block px-3 py-2 text-center bg-fuelfoods-green-500 text-white font-bold rounded-md hover:bg-fuelfoods-green-600 transition-colors uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                ORDER NOW
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
