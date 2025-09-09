'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/form/FormField';
import { cn } from '@/lib/utils';
import { useAuth } from './AuthContext';
import { validatePassword, validateEmail } from './validation';

export interface AuthFormProps {
  mode: 'login' | 'register';
  className?: string;
  onSuccess?: () => void;
  redirectTo?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
  marketingEmails?: boolean;
  rememberMe?: boolean;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  className,
  onSuccess,
  redirectTo = '/my-account'
}) => {
  const { login, register, loading } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
    agreeToTerms: false,
    marketingEmails: false,
    rememberMe: false
  });
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  const isLogin = mode === 'login';
  const isRegister = mode === 'register';

  const handleInputChange = (field: keyof AuthFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[field as keyof AuthFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Real-time password strength validation
    if (field === 'password' && typeof value === 'string') {
      const strength = validatePassword(value).strength;
      setPasswordStrength(strength ?? null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: AuthFormErrors = {};

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (isRegister) {
      // First name validation
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }

      // Last name validation
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }

      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Terms agreement validation
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms of Service';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        });
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName!,
          lastName: formData.lastName!,
          phone: formData.phone,
          marketingEmails: formData.marketingEmails
        });
      }

      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = redirectTo;
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'An error occurred. Please try again.' });
    }
  };

  const renderPasswordStrengthIndicator = () => {
    if (!formData.password || isLogin) return null;

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
    <div className={cn('min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8', className)}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="FuelFoods CPG"
              width={120}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Header */}
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-green-600 hover:text-green-500">
                Create one here
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                Sign in here
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          <CardContent className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Fields */}
              {isRegister && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    label="First name"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={errors.firstName}
                    placeholder="First name"
                    disabled={loading}
                  />
                  <FormField
                    label="Last name"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={errors.lastName}
                    placeholder="Last name"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Email Field */}
              <FormField
                label="Email address"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                placeholder="Enter your email"
                disabled={loading}
              />

              {/* Phone Field (Registration only) */}
              {isRegister && (
                <FormField
                  label="Phone number"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  placeholder="(555) 123-4567"
                  disabled={loading}
                />
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <FormField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={errors.password}
                    placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 transform translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {renderPasswordStrengthIndicator()}
              </div>

              {/* Confirm Password Field (Registration only) */}
              {isRegister && (
                <div className="relative">
                  <FormField
                    label="Confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    error={errors.confirmPassword}
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 transform translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Remember Me (Login) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              )}

              {/* Terms and Marketing (Registration) */}
              {isRegister && (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketing"
                        name="marketing"
                        type="checkbox"
                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        checked={formData.marketingEmails}
                        onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketing" className="text-gray-700">
                        I would like to receive marketing emails about new products and special offers
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className={cn(
                          'focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded',
                          errors.agreeToTerms && 'border-red-500'
                        )}
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-700">
                        I agree to the{' '}
                        <Link href="/terms-of-service" className="text-green-600 hover:text-green-500">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy-policy" className="text-green-600 hover:text-green-500">
                          Privacy Policy
                        </Link>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="brand"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Social Login (Registration only) */}
            {isRegister && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-center py-2 px-4"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-center py-2 px-4"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section (Registration only) */}
      {isRegister && (
        <div className="mt-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Join FuelFoods CPG?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fresh Weekly Deliveries</h4>
              <p className="text-sm text-gray-600">Get fresh microgreens delivered to your door every week</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Save Money</h4>
              <p className="text-sm text-gray-600">Subscriber discounts and flexible delivery</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-sm text-gray-600">Organic, locally grown microgreens with guaranteed freshness</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { AuthForm };