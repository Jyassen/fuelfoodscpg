/**
 * FuelFoods Brand Theme Configuration
 * Health-focused color palette and design tokens
 */

export const fuelFoodsTheme = {
  colors: {
    // Primary brand colors - Fresh, healthy greens
    primary: {
      50: '#f0fdf4',   // Very light green
      100: '#dcfce7',  // Light green
      200: '#bbf7d0',  // Lighter green
      300: '#86efac',  // Light-medium green
      400: '#4ade80',  // Medium green
      500: '#22c55e',  // Primary brand green
      600: '#16a34a',  // Darker green
      700: '#15803d',  // Dark green
      800: '#166534',  // Very dark green
      900: '#14532d',  // Deepest green
    },
    
    // Secondary colors - Warm, natural tones
    secondary: {
      50: '#fffdf7',   // Cream
      100: '#fffbeb',  // Light cream
      200: '#fef3c7',  // Light yellow
      300: '#fde68a',  // Yellow
      400: '#fcd34d',  // Amber
      500: '#f59e0b',  // Orange
      600: '#d97706',  // Dark orange
      700: '#b45309',  // Brown
      800: '#92400e',  // Dark brown
      900: '#78350f',  // Deep brown
    },
    
    // Neutral colors - Clean, modern grays
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Accent colors for specific use cases
    accent: {
      success: '#10b981',  // Green for success states
      warning: '#f59e0b',  // Amber for warnings
      error: '#ef4444',    // Red for errors
      info: '#3b82f6',     // Blue for info
    }
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    }
  },
  
  // Spacing scale
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  }
} as const;

export type FuelFoodsTheme = typeof fuelFoodsTheme;