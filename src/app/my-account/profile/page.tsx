'use client';

import { useState, useEffect } from 'react';
import { AuthProvider, useRequireAuth, useAuth } from '@/components/auth/AuthContext';
import AccountSidebar from '@/components/auth/AccountSidebar';
import { Settings, User, Lock, Bell, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  sms: boolean;
}

function ProfileContent() {
  const { user, loading, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [securityData, setSecurityData] = useState<SecurityFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: false,
    newsletter: false,
    sms: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const result = await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
      });

      if (result.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (securityData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }

    setIsSaving(true);

    try {
      const result = await updateProfile({
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword,
      });

      if (result.success) {
        toast.success('Password updated successfully');
        setSecurityData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast.error(result.error || 'Failed to update password');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // In a real app, you would save these to your backend
    setTimeout(() => {
      toast.success('Notification preferences updated');
      setIsSaving(false);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-green-600" />
                  Account Settings
                </h2>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                          activeTab === tab.id
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) =>
                              setProfileData({ ...profileData, firstName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) =>
                              setProfileData({ ...profileData, lastName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Email cannot be changed. Contact support if you need to update your email.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700 flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <form onSubmit={handleSecuritySubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={securityData.currentPassword}
                            onChange={(e) =>
                              setSecurityData({ ...securityData, currentPassword: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={securityData.newPassword}
                            onChange={(e) =>
                              setSecurityData({ ...securityData, newPassword: e.target.value })
                            }
                            required
                            minLength={8}
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Password must be at least 8 characters long.
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={securityData.confirmPassword}
                            onChange={(e) =>
                              setSecurityData({ ...securityData, confirmPassword: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700 flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </form>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <form onSubmit={handleNotificationSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            id="orderUpdates"
                            type="checkbox"
                            checked={notifications.orderUpdates}
                            onChange={(e) =>
                              setNotifications({ ...notifications, orderUpdates: e.target.checked })
                            }
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <div className="ml-3">
                            <Label htmlFor="orderUpdates" className="text-sm font-medium text-gray-700">
                              Order Updates
                            </Label>
                            <p className="text-sm text-gray-500">
                              Get notified about your order status, shipping updates, and delivery confirmations.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="promotions"
                            type="checkbox"
                            checked={notifications.promotions}
                            onChange={(e) =>
                              setNotifications({ ...notifications, promotions: e.target.checked })
                            }
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <div className="ml-3">
                            <Label htmlFor="promotions" className="text-sm font-medium text-gray-700">
                              Promotions & Discounts
                            </Label>
                            <p className="text-sm text-gray-500">
                              Receive emails about special offers, promotions, and exclusive discounts.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="newsletter"
                            type="checkbox"
                            checked={notifications.newsletter}
                            onChange={(e) =>
                              setNotifications({ ...notifications, newsletter: e.target.checked })
                            }
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <div className="ml-3">
                            <Label htmlFor="newsletter" className="text-sm font-medium text-gray-700">
                              Newsletter
                            </Label>
                            <p className="text-sm text-gray-500">
                              Stay updated with our latest news, recipes, and growing tips.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        SMS Notifications
                      </h3>
                      <div className="flex items-center">
                        <input
                          id="sms"
                          type="checkbox"
                          checked={notifications.sms}
                          onChange={(e) =>
                            setNotifications({ ...notifications, sms: e.target.checked })
                          }
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <Label htmlFor="sms" className="text-sm font-medium text-gray-700">
                            SMS Updates
                          </Label>
                          <p className="text-sm text-gray-500">
                            Get text messages for important delivery updates and reminders.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700 flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthProvider>
      <ProfileContent />
    </AuthProvider>
  );
}