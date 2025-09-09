'use client';

import React from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: Date;
  itemCount: number;
  itemNames: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'text-fuelfoods-green-600 bg-fuelfoods-green-100';
    case 'shipped':
    case 'processing':
      return 'text-blue-600 bg-blue-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const OrderCard = ({ order }: { order: Order }) => {
  const statusColorClass = getStatusColor(order.status);
  
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <h3 className="font-medium text-gray-900">#{order.orderNumber}</h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColorClass}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {formatDate(order.createdAt)}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}: {order.itemNames}
        </p>
      </div>
      
      <div className="text-right ml-4">
        <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
        <button className="text-sm text-fuelfoods-green-600 hover:text-fuelfoods-green-700 mt-1 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Orders
          </h2>
          {orders.length > 0 && (
            <Link
              href="#orders"
              className="text-sm text-fuelfoods-green-600 hover:text-fuelfoods-green-700 font-medium transition-colors"
            >
              View All
            </Link>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {orders.length > 0 ? (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="#orders"
                className="inline-flex items-center text-fuelfoods-green-600 hover:text-fuelfoods-green-700 font-medium transition-colors"
              >
                View All Orders
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              When you place your first order, it will appear here.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-fuelfoods-green-600 hover:bg-fuelfoods-green-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}