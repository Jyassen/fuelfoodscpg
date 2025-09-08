'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Download, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/my-account',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'Orders',
    href: '/my-account/orders',
    icon: Package,
  },
  {
    name: 'Downloads',
    href: '/my-account/downloads',
    icon: Download,
  },
  {
    name: 'Addresses',
    href: '/my-account/addresses',
    icon: MapPin,
  },
  {
    name: 'Payment methods',
    href: '/my-account/payment-methods',
    icon: CreditCard,
  },
  {
    name: 'Account Details',
    href: '/my-account/profile',
    icon: Settings,
  },
];

export default function AccountSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const isActive = (item: typeof navigationItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-40 bg-white rounded-lg shadow-lg">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobileMenu}
          className="p-2"
          aria-label="Toggle account menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto
        bg-white rounded-lg shadow-sm border border-gray-200 
        w-80 lg:w-full max-w-sm
        transform transition-transform duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-200">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Hello {user?.firstName || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
              {!user?.emailVerified && (
                <p className="text-xs text-amber-600 font-medium">
                  Email not verified
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`
                      group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${active 
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`
                        h-5 w-5 transition-colors duration-200
                        ${active ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}
                      `} />
                      <span>{item.name}</span>
                    </div>
                    {!active && (
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity duration-200" />
                    )}
                  </Link>
                </li>
              );
            })}

            {/* Logout Button */}
            <li className="pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={handleLogout}
                className="group flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            </li>
          </ul>
        </nav>

        {/* Account Stats (Mobile Only) */}
        <div className="lg:hidden p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-green-600">
                {user?.totalOrders || 0}
              </div>
              <div className="text-xs text-gray-600">Total Orders</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">
                {user?.subscriptions?.filter(s => s.status === 'active').length || 0}
              </div>
              <div className="text-xs text-gray-600">Active Plans</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}