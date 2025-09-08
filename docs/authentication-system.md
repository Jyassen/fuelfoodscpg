# FuelFoods Authentication System

A comprehensive, production-ready authentication system built with React, TypeScript, and Next.js 14 App Router.

## Architecture Overview

The authentication system is built with a modular component architecture that includes:

- **Enhanced Forms**: Login and registration forms with real-time validation
- **Account Dashboard**: Complete account management interface
- **Profile Management**: User profile, security, and notification settings
- **Protected Routes**: Authentication guards and route protection
- **Responsive Design**: Mobile-first design matching FuelFoods branding

## Core Components

### 1. AuthForm Component (`/src/components/auth/AuthForm.tsx`)

Enhanced authentication forms with FuelFoods branding and comprehensive validation.

**Features:**
- Login and registration modes
- Real-time form validation
- Password strength indicator
- Social login support (Google, Facebook)
- Remember me functionality
- Terms and privacy policy integration
- Loading states and error handling

**Props:**
```typescript
interface AuthFormProps {
  mode: 'login' | 'register';
  className?: string;
  onSuccess?: () => void;
  redirectTo?: string;
}
```

### 2. AccountSidebar Component (`/src/components/auth/AccountSidebar.tsx`)

Responsive sidebar navigation for account pages.

**Features:**
- Collapsible navigation groups
- Active state highlighting
- User profile header
- Email verification status
- Badge indicators for counts
- Mobile-responsive design

**Navigation Items:**
- Dashboard
- Orders (with order history, subscriptions, recurring)
- Downloads
- Addresses
- Payment Methods
- Account Details (profile, security, notifications)

### 3. AccountDashboard Component (`/src/components/auth/AccountDashboard.tsx`)

Main account dashboard with overview and quick actions.

**Features:**
- Welcome section with next delivery info
- Statistics cards (orders, subscriptions, savings)
- Active subscriptions management
- Recent orders list
- Quick settings links
- Loading states and empty states

### 4. ProfileManager Component (`/src/components/auth/ProfileManager.tsx`)

Tabbed profile management interface for personal settings.

**Tabs:**
- **Profile**: Personal information and contact details
- **Security**: Password changes with strength validation
- **Notifications**: Email and SMS notification preferences

**Features:**
- Form validation with real-time feedback
- Password strength indicators
- Success and error messaging
- Loading states
- Accessible form design

### 5. AuthContext (`/src/components/auth/AuthContext.tsx`)

React context for authentication state management.

**Features:**
- User state management
- JWT token handling (localStorage/sessionStorage)
- API request utilities
- Authentication hooks
- Protected route components

**Main Hook:**
```typescript
const { 
  user, 
  loading, 
  error, 
  login, 
  register, 
  logout, 
  updateProfile,
  isAuthenticated 
} = useAuth();
```

**Protected Routes:**
```typescript
// Component wrapper
<ProtectedRoute redirectTo="/login">
  <AccountPage />
</ProtectedRoute>

// Hook for manual checks
const { user, loading, isAuthenticated } = useRequireAuth('/login');
```

### 6. Form Validation (`/src/components/auth/validation.ts`)

Comprehensive validation utilities for all authentication forms.

**Validation Functions:**
- `validateEmail()` - Email format with typo detection
- `validatePassword()` - Password strength with security rules
- `validateName()` - Name fields with character restrictions
- `validatePhone()` - Phone number formatting and validation
- `validatePasswordConfirmation()` - Password matching
- `validateAuthForm()` - Complete form validation

**Password Requirements:**
- Minimum 8 characters
- Uppercase and lowercase letters
- Numbers and special characters
- No common patterns or sequential characters
- Strength scoring (weak/medium/strong)

## Integration Guide

### 1. App Layout Setup

Add AuthProvider to your root layout:

```typescript
// src/app/layout.tsx
import { AuthProvider } from '@/components/auth';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FuelFoodsProvider>
          <AuthProvider>
            {/* Your app content */}
          </AuthProvider>
        </FuelFoodsProvider>
      </body>
    </html>
  );
}
```

### 2. Authentication Pages

#### Login Page (`/login`)
```typescript
import { AuthForm } from '@/components/auth';

export default function LoginPage() {
  return <AuthForm mode="login" redirectTo="/my-account" />;
}
```

#### Register Page (`/register`)
```typescript
import { AuthForm } from '@/components/auth';

export default function RegisterPage() {
  return <AuthForm mode="register" redirectTo="/my-account" />;
}
```

### 3. Protected Account Pages

#### Main Account Page (`/my-account`)
```typescript
import { ProtectedRoute, AccountSidebar, AccountDashboard } from '@/components/auth';

export default function MyAccountPage() {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>
          <div className="lg:col-span-3">
            <AccountDashboard />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
```

#### Profile Settings Page (`/my-account/profile`)
```typescript
import { ProtectedRoute, AccountSidebar, ProfileManager } from '@/components/auth';

export default function ProfilePage() {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>
          <div className="lg:col-span-3">
            <ProfileManager activeTab="profile" />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
```

## API Integration

### Backend Requirements

The authentication system expects a RESTful API with these endpoints:

```typescript
// Authentication
POST /auth/login
POST /auth/register
POST /auth/logout
GET  /auth/me

// Profile Management
PATCH /auth/profile
POST  /auth/change-password

// Password Reset
POST /auth/forgot-password
POST /auth/reset-password

// Email Verification
POST /auth/verify-email
POST /auth/resend-verification
```

### Request/Response Format

#### Login Request
```typescript
POST /auth/login
{
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

#### Login Response
```typescript
{
  user: User;
  token: string;
}
```

#### User Object
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  emailVerified: boolean;
  marketingEmails: boolean;
  createdAt: string;
  updatedAt: string;
  subscriptions?: Subscription[];
  addresses?: Address[];
}
```

## Design System Integration

### Color Palette
The authentication components use FuelFoods brand colors:

- **Primary Green**: `#22c55e` (green-500)
- **Success Green**: `#16a34a` (green-600)
- **Background**: `#f9fafb` (gray-50)
- **Text**: `#111827` (gray-900)
- **Secondary Text**: `#6b7280` (gray-500)

### Typography
- **Font Family**: Inter (fallback: system-ui, sans-serif)
- **Headers**: Bold, appropriate sizing
- **Body Text**: Regular weight, readable sizing
- **Form Labels**: Medium weight, gray-700

### Components
All authentication components use the existing FuelFoods UI library:

- Button variants: `brand`, `outline`, `ghost`
- Form fields with validation states
- Cards with consistent shadows and borders
- Loading spinners and skeletons
- Badge components for status indicators

## Security Features

### Client-Side Security
- Input validation and sanitization
- XSS prevention
- CSRF protection ready
- Secure token storage
- Password strength enforcement

### Token Management
- JWT tokens with expiration
- Automatic token refresh (configurable)
- Secure storage (localStorage for "remember me", sessionStorage otherwise)
- Automatic cleanup on logout

### Form Security
- Real-time validation
- Server-side validation expected
- Rate limiting friendly
- Progressive enhancement

## Accessibility Features

### WCAG Compliance
- Proper semantic HTML
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Form Accessibility
- Clear labels and instructions
- Error announcements
- Loading state announcements
- High contrast mode support
- Reduced motion support

## Mobile Responsiveness

### Breakpoints
- **Mobile**: < 768px (full-width forms, stacked navigation)
- **Tablet**: 768px - 1024px (adaptive layouts)
- **Desktop**: > 1024px (sidebar layouts)

### Mobile Features
- Touch-friendly interface
- Responsive form layouts
- Collapsible navigation
- Optimized loading states
- Mobile-first CSS

## Performance Optimization

### Bundle Size
- Tree-shakeable exports
- Lazy loading for non-critical components
- Optimized dependencies
- Code splitting ready

### Loading Performance
- Skeleton loading states
- Progressive form rendering
- Optimized images and icons
- Minimal re-renders

### Caching Strategy
- Token caching
- User data caching
- Form state persistence
- Static asset caching

## Testing Strategy

### Unit Tests
- Form validation functions
- Authentication hooks
- Component rendering
- API utilities

### Integration Tests
- Complete authentication flows
- Protected route behavior
- Form submission handling
- Error state management

### E2E Tests
- Full user registration flow
- Login/logout cycles
- Password reset flow
- Profile management

## Customization Guide

### Theming
The components support customization through:

1. **CSS Custom Properties**
2. **Tailwind Config**
3. **Component Props**
4. **Theme Context**

### Branding Updates
To update branding:

1. Update color values in `globals.css`
2. Replace logo images
3. Update copy and messaging
4. Modify social login providers

### Feature Extensions
Common extensions:

1. **Two-Factor Authentication**
2. **Social Login Providers**
3. **Advanced Profile Fields**
4. **Role-Based Access**
5. **Subscription Management**

## Deployment Considerations

### Environment Variables
```bash
NEXT_PUBLIC_API_URL=https://api.fuelfoods.com
NEXT_PUBLIC_APP_ENV=production
```

### Build Optimization
- SSR/SSG compatibility
- Edge runtime ready
- TypeScript strict mode
- ESLint compliance

### Monitoring
Recommended monitoring:

1. **Authentication Metrics**
2. **Error Tracking**
3. **Performance Monitoring**
4. **User Analytics**

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**
   - Ensure server/client consistency
   - Use suppressHydrationWarning sparingly

2. **Token Expiration**
   - Implement token refresh
   - Handle 401 responses gracefully

3. **Form Validation**
   - Check validation rules
   - Verify error message display

4. **Navigation Issues**
   - Verify protected route setup
   - Check redirect logic

### Debug Mode
Enable debug logging:

```typescript
// Set in development
localStorage.setItem('auth_debug', 'true');
```

## Future Enhancements

### Roadmap
1. **Advanced Security Features**
   - Two-factor authentication
   - Biometric authentication
   - Advanced fraud detection

2. **Enhanced User Experience**
   - Progressive web app features
   - Offline support
   - Advanced animations

3. **Integration Expansions**
   - SSO providers
   - Enterprise authentication
   - Advanced analytics

4. **Performance Improvements**
   - Advanced caching strategies
   - Real-time updates
   - WebSocket integration

---

## Support

For technical support or questions about the authentication system:

1. **Documentation**: This file and inline code comments
2. **Code Review**: All components include comprehensive TypeScript types
3. **Testing**: Run test suites for validation
4. **Issues**: Use GitHub issues for bug reports and feature requests

The authentication system is designed to be production-ready, scalable, and maintainable while providing an excellent user experience consistent with FuelFoods branding.