// Export all auth components for easy importing
export { AuthProvider, useAuth, useRequireAuth } from './AuthContext';
export { default as AccountSidebar } from './AccountSidebar';
export { default as AccountDashboard } from './AccountDashboard';
export { AuthForm } from './AuthForm';
export { default as ProfileManager } from './ProfileManager';
export { default as ProtectedRoute } from './ProtectedRoute';

// Types
export type { User, Address, Subscription, RegisterData } from './AuthContext';