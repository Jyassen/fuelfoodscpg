'use client';

import { useState, useEffect } from 'react';
import { AuthProvider, useRequireAuth } from '@/components/auth/AuthContext';
import AccountSidebar from '@/components/auth/AccountSidebar';
import { Package, Calendar, DollarSign, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  trackingNumber?: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

// Mock data - replace with real API call
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#1234',
    date: 'July 31, 2024',
    status: 'delivered',
    items: [
      { name: 'Mega Mix', quantity: 1, price: 14.99 },
      { name: 'Brassica Blend', quantity: 1, price: 12.99 }
    ],
    total: 27.98,
    trackingNumber: 'TRK123456789',
    deliveryAddress: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101'
    }
  },
  {
    id: '2',
    orderNumber: '#1233',
    date: 'July 24, 2024',
    status: 'delivered',
    items: [
      { name: 'Tummies Pet Grass (3-Pack)', quantity: 1, price: 24.99 }
    ],
    total: 24.99,
    trackingNumber: 'TRK123456788',
    deliveryAddress: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101'
    }
  },
  {
    id: '3',
    orderNumber: '#1232',
    date: 'July 17, 2024',
    status: 'delivered',
    items: [
      { name: 'Green Medley', quantity: 1, price: 12.49 },
      { name: 'Mega Mix', quantity: 1, price: 12.49 }
    ],
    total: 24.98,
    trackingNumber: 'TRK123456787',
    deliveryAddress: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101'
    }
  }
];

function OrdersContent() {
  const { user, loading } = useRequireAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Orders List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-green-600" />
                    Your Orders ({orders.length})
                  </h2>
                  <div className="flex items-center space-x-4">
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>All Orders</option>
                      <option>Delivered</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="font-semibold text-gray-900">
                            Order {order.orderNumber}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-3 space-x-6">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {order.date}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ${order.total.toFixed(2)}
                          </div>
                          {order.trackingNumber && (
                            <div className="flex items-center">
                              <Package className="w-4 h-4 mr-1" />
                              {order.trackingNumber}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Items:</p>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm text-gray-700">
                                {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          <p>Delivered to:</p>
                          <p className="text-gray-700">
                            {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Invoice
                        </Button>
                        {order.status === 'delivered' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {orders.length === 0 && (
                <div className="p-12 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">
                    When you place your first order, it will appear here.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthProvider>
      <OrdersContent />
    </AuthProvider>
  );
}