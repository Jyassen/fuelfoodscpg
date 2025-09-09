'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Save, 
  Shield, 
  Bell, 
  Eye, 
  EyeOff, 
  Check,
  X,
  AlertCircle,
  Lock,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormField } from '@/components/form/FormField';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from './AuthContext';
import type { User as AuthUser } from '@/types/auth';
import { validateEmail, validateName, validatePhone, validatePassword } from './validation';

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingEmails: boolean;
}

export interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  orderUpdates: boolean;
  deliveryReminders: boolean;
  marketingEmails: boolean;
  promotions: boolean;
  weeklyDigest: boolean;
  smsNotifications: boolean;
}

export interface ProfileManagerProps {
  className?: string;
  activeTab?: 'profile' | 'security' | 'notifications';
  onTabChange?: (tab: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({
  className,
  activeTab = 'profile',
  onTabChange
}) => {
  const { user, updateProfile, changePassword } = useAuth();
  
  // Profile form state
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    marketingEmails: false
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  
  // Security form state
  const [securityData, setSecurityData] = useState<SecurityFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [securityErrors, setSecurityErrors] = useState<Record<string, string>>({});
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securitySuccess, setSecuritySuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  
  // Notifications state
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    deliveryReminders: true,
    marketingEmails: false,
    promotions: false,
    weeklyDigest: false,
    smsNotifications: false
  });
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsSuccess, setNotificationsSuccess] = useState(false);
  
  const [currentTab, setCurrentTab] = useState<'profile' | 'security' | 'notifications'>(activeTab);

  // Initialize form data from user
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        marketingEmails: user.marketingEmails || false
      });
      
      setNotificationSettings(prev => ({
        ...prev,
        marketingEmails: user.marketingEmails || false
      }));
    }
  }, [user]);

  // Handle tab changes
  const handleTabChange = (tab: 'profile' | 'security' | 'notifications') => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
    
    // Clear success messages when switching tabs
    setProfileSuccess(false);
    setSecuritySuccess(false);
    setNotificationsSuccess(false);
  };

  // Profile form handlers
  const handleProfileChange = (field: keyof ProfileFormData, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (profileErrors[field]) {
      setProfileErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateProfileForm = (): boolean => {
    const errors: Record<string, string> = {};

    // First name validation
    const firstNameValidation = validateName(profileData.firstName, 'First name');
    if (!firstNameValidation.isValid) {
      errors.firstName = firstNameValidation.error || 'Invalid first name';
    }

    // Last name validation
    const lastNameValidation = validateName(profileData.lastName, 'Last name');
    if (!lastNameValidation.isValid) {
      errors.lastName = lastNameValidation.error || 'Invalid last name';
    }

    // Email validation
    const emailValidation = validateEmail(profileData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || 'Invalid email';
    }

    // Phone validation
    if (profileData.phone) {
      const phoneValidation = validatePhone(profileData.phone);
      if (!phoneValidation.isValid) {
        errors.phone = phoneValidation.error || 'Invalid phone number';
      }
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }

    setProfileLoading(true);
    setProfileSuccess(false);

    try {
      await updateProfile(profileData);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error: any) {
      setProfileErrors({ general: error.message || 'Failed to update profile' });
    } finally {
      setProfileLoading(false);
    }
  };

  // Security form handlers
  const handleSecurityChange = (field: keyof SecurityFormData, value: string) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (securityErrors[field]) {
      setSecurityErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time password strength validation
    if (field === 'newPassword') {
      const strength = validatePassword(value).strength;
      setPasswordStrength(strength || null);
    }
  };

  const validateSecurityForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Current password validation
    if (!securityData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    // New password validation
    const passwordValidation = validatePassword(securityData.newPassword);
    if (!passwordValidation.isValid) {
      errors.newPassword = passwordValidation.errors?.[0] || 'Invalid password';
    }

    // Confirm password validation
    if (securityData.newPassword !== securityData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Same password check
    if (securityData.currentPassword === securityData.newPassword) {
      errors.newPassword = 'New password must be different from current password';
    }

    setSecurityErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSecurityForm()) {
      return;
    }

    setSecurityLoading(true);
    setSecuritySuccess(false);

    try {
      await changePassword({
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword
      });
      
      // Clear form on success
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSecuritySuccess(true);
      setTimeout(() => setSecuritySuccess(false), 3000);
    } catch (error: any) {
      setSecurityErrors({ general: error.message || 'Failed to change password' });
    } finally {
      setSecurityLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Notifications handlers
  const handleNotificationChange = (setting: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleNotificationsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setNotificationsLoading(true);
    setNotificationsSuccess(false);

    try {
      // Update marketing emails in profile if changed
      if (notificationSettings.marketingEmails !== user?.marketingEmails) {
        await updateProfile({ marketingEmails: notificationSettings.marketingEmails });
      }
      
      // Here you would typically save other notification preferences to the backend
      // For now, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotificationsSuccess(true);
      setTimeout(() => setNotificationsSuccess(false), 3000);
    } catch (error: any) {
      console.error('Failed to update notifications:', error);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const renderPasswordStrengthIndicator = () => {
    if (!securityData.newPassword) return null;

    const strengthColors = {
      weak: 'bg-red-500',
      medium: 'bg-yellow-500',
      strong: 'bg-green-500'
    };

    const strengthLabels = {
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong'
    };

    return (
      <div className="mt-2">
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                passwordStrength && strengthColors[passwordStrength]
              )}
              style={{
                width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%'
              }}
            />
          </div>
          <span className={cn(
            'text-xs font-medium',
            passwordStrength === 'weak' && 'text-red-500',
            passwordStrength === 'medium' && 'text-yellow-500',
            passwordStrength === 'strong' && 'text-green-500'
          )}>
            {passwordStrength && strengthLabels[passwordStrength]}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details
                  </CardDescription>
                </div>
                {!user?.emailVerified && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Email not verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {profileErrors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {profileErrors.general}
                  </div>
                )}

                {profileSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Profile updated successfully!
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="First Name"
                    required
                    value={profileData.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    error={profileErrors.firstName}
                    disabled={profileLoading}
                  />
                  <FormField
                    label="Last Name"
                    required
                    value={profileData.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    error={profileErrors.lastName}
                    disabled={profileLoading}
                  />
                </div>

                <FormField
                  label="Email Address"
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  error={profileErrors.email}
                  disabled={profileLoading}
                  helperText={!user?.emailVerified ? "Please verify your email address" : undefined}
                />

                <FormField
                  label="Phone Number"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  error={profileErrors.phone}
                  disabled={profileLoading}
                  placeholder="(555) 123-4567"
                  helperText="Optional - used for delivery notifications"
                />

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing-emails"
                      name="marketing-emails"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                      checked={profileData.marketingEmails}
                      onChange={(e) => handleProfileChange('marketingEmails', e.target.checked)}
                      disabled={profileLoading}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing-emails" className="text-gray-700">
                      I would like to receive marketing emails about new products and special offers
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={profileLoading}
                    className="flex items-center gap-2"
                  >
                    {profileLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {profileLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Change your password and manage account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecuritySubmit} className="space-y-6">
                {securityErrors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {securityErrors.general}
                  </div>
                )}

                {securitySuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Password changed successfully!
                  </div>
                )}

                <div className="relative">
                  <FormField
                    label="Current Password"
                    type={showPasswords.current ? 'text' : 'password'}
                    required
                    value={securityData.currentPassword}
                    onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                    error={securityErrors.currentPassword}
                    disabled={securityLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 transform translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="relative">
                  <FormField
                    label="New Password"
                    type={showPasswords.new ? 'text' : 'password'}
                    required
                    value={securityData.newPassword}
                    onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                    error={securityErrors.newPassword}
                    disabled={securityLoading}
                    helperText="Password must be at least 8 characters with uppercase, lowercase, number, and special character"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 transform translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {renderPasswordStrengthIndicator()}
                </div>

                <div className="relative">
                  <FormField
                    label="Confirm New Password"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    required
                    value={securityData.confirmPassword}
                    onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                    error={securityErrors.confirmPassword}
                    disabled={securityLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 transform translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={securityLoading}
                    className="flex items-center gap-2"
                  >
                    {securityLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    {securityLoading ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationsSubmit} className="space-y-6">
                {notificationsSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Notification preferences updated successfully!
                  </div>
                )}

                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email Notifications
                    </h3>
                    <div className="space-y-3 pl-7">
                      {[
                        { key: 'orderUpdates', label: 'Order status updates', description: 'Get notified when your order status changes' },
                        { key: 'deliveryReminders', label: 'Delivery reminders', description: 'Reminders about upcoming deliveries' },
                        { key: 'marketingEmails', label: 'Marketing emails', description: 'Product updates, promotions, and special offers' },
                        { key: 'promotions', label: 'Exclusive promotions', description: 'Early access to sales and special deals' },
                        { key: 'weeklyDigest', label: 'Weekly digest', description: 'Weekly summary of your account activity' }
                      ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={key}
                              name={key}
                              type="checkbox"
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                              checked={notificationSettings[key as keyof NotificationSettings]}
                              onChange={(e) => handleNotificationChange(key as keyof NotificationSettings, e.target.checked)}
                              disabled={notificationsLoading}
                            />
                          </div>
                          <div className="ml-3">
                            <label htmlFor={key} className="text-sm font-medium text-gray-700">
                              {label}
                            </label>
                            <p className="text-sm text-gray-500">{description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      SMS Notifications
                    </h3>
                    <div className="space-y-3 pl-7">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="smsNotifications"
                            name="smsNotifications"
                            type="checkbox"
                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            checked={notificationSettings.smsNotifications}
                            onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                            disabled={notificationsLoading || !profileData.phone}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-700">
                            SMS delivery notifications
                          </label>
                          <p className="text-sm text-gray-500">
                            {profileData.phone 
                              ? 'Get SMS updates for delivery status'
                              : 'Add a phone number to enable SMS notifications'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={notificationsLoading}
                    className="flex items-center gap-2"
                  >
                    {notificationsLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {notificationsLoading ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { ProfileManager };
export default ProfileManager;