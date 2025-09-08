'use client';

import { useState, useEffect } from 'react';
import { AuthProvider, useRequireAuth } from '@/components/auth/AuthContext';
import AccountSidebar from '@/components/auth/AccountSidebar';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

// Mock data - replace with real API call
const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'shipping',
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    city: 'Boston',
    state: 'MA',
    postalCode: '02101',
    country: 'US',
    phone: '(555) 123-4567',
    isDefault: true
  },
  {
    id: '2',
    type: 'billing',
    firstName: 'John',
    lastName: 'Doe',
    company: 'FuelFoods Inc',
    address1: '456 Business Ave',
    city: 'Cambridge',
    state: 'MA',
    postalCode: '02139',
    country: 'US',
    isDefault: true
  }
];

function AddressesContent() {
  const { user, loading } = useRequireAuth();
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    type: 'shipping',
    country: 'US',
    isDefault: false
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your addresses...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      type: 'shipping',
      country: 'US',
      isDefault: false
    });
    setShowForm(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowForm(true);
  };

  const handleDelete = async (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would make API call to save the address
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...addr, ...formData } as Address : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString()
      } as Address;
      setAddresses([...addresses, newAddress]);
    }
    setShowForm(false);
    setFormData({ type: 'shipping', country: 'US', isDefault: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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

          {/* Addresses Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    Your Addresses
                  </h2>
                  <Button
                    onClick={handleAddNew}
                    className="bg-green-600 hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </div>
              </div>

              {!showForm && (
                <div className="p-6">
                  {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                          {address.isDefault && (
                            <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              Default
                            </span>
                          )}
                          
                          <div className="mb-3">
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                                {address.type} Address
                              </span>
                            </div>
                            <div className="text-sm text-gray-700 space-y-1">
                              <p className="font-medium">
                                {address.firstName} {address.lastName}
                              </p>
                              {address.company && <p>{address.company}</p>}
                              <p>{address.address1}</p>
                              {address.address2 && <p>{address.address2}</p>}
                              <p>
                                {address.city}, {address.state} {address.postalCode}
                              </p>
                              <p>{address.country}</p>
                              {address.phone && <p>{address.phone}</p>}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(address)}
                              className="flex-1 flex items-center justify-center"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(address.id)}
                              className="flex-1 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses yet</h3>
                      <p className="text-gray-600 mb-6">
                        Add your shipping and billing addresses to make checkout faster.
                      </p>
                      <Button
                        onClick={handleAddNew}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Address
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Add/Edit Address Form */}
              {showForm && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="type">Address Type</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                        required
                      >
                        <option value="shipping">Shipping Address</option>
                        <option value="billing">Billing Address</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address1">Street Address</Label>
                      <Input
                        id="address1"
                        name="address1"
                        value={formData.address1 || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address2">Apartment, suite, etc. (Optional)</Label>
                      <Input
                        id="address2"
                        name="address2"
                        value={formData.address2 || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">ZIP Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        id="isDefault"
                        name="isDefault"
                        type="checkbox"
                        checked={formData.isDefault || false}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <Label htmlFor="isDefault" className="ml-2">
                        Set as default {formData.type} address
                      </Label>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddressesPage() {
  return (
    <AuthProvider>
      <AddressesContent />
    </AuthProvider>
  );
}