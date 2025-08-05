# shadcn/ui Setup for FuelFoods CPG

## Overview
This document outlines the installation and configuration of shadcn/ui components for the FuelFoods CPG ecommerce website.

## Installation Summary

### Core Dependencies Installed
- `tailwindcss-animate` - Animation utilities for Tailwind CSS
- `class-variance-authority` - For component variants
- `lucide-react` - Icon library
- `@radix-ui/react-slot` - Base slot component
- `@radix-ui/react-dialog` - Dialog/modal primitives
- `@radix-ui/react-navigation-menu` - Navigation menu primitives
- `@radix-ui/react-tabs` - Tabs component primitives
- `@radix-ui/react-select` - Select dropdown primitives
- `@radix-ui/react-label` - Label component primitives
- `@radix-ui/react-separator` - Separator component primitives
- `@radix-ui/react-dropdown-menu` - Dropdown menu primitives
- `embla-carousel-react` - Carousel component
- `sonner` - Toast notification library

### Components Installed
The following shadcn/ui components have been installed and configured:

1. **Button** (`/src/components/ui/button.tsx`)
   - Multiple variants: default, destructive, outline, secondary, ghost, link
   - Size options: default, sm, lg, icon

2. **Card** (`/src/components/ui/card.tsx`)
   - CardHeader, CardFooter, CardTitle, CardDescription, CardContent
   - Perfect for product displays and feature sections

3. **Input** (`/src/components/ui/input.tsx`)
   - Styled form input component

4. **Badge** (`/src/components/ui/badge.tsx`)
   - For labels, tags, and status indicators
   - Variants: default, secondary, destructive, outline

5. **Dialog** (`/src/components/ui/dialog.tsx`)
   - Modal dialogs and overlays
   - Includes DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger

6. **Navigation Menu** (`/src/components/ui/navigation-menu.tsx`)
   - Complex navigation menus with dropdowns
   - Includes NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink

7. **Tabs** (`/src/components/ui/tabs.tsx`)
   - Tabbed content interface
   - Includes TabsContent, TabsList, TabsTrigger

8. **Carousel** (`/src/components/ui/carousel.tsx`)
   - Image/content carousel with Embla Carousel
   - Includes CarouselContent, CarouselItem, CarouselPrevious, CarouselNext

9. **Select** (`/src/components/ui/select.tsx`)
   - Dropdown select component
   - Includes SelectContent, SelectItem, SelectTrigger, SelectValue

10. **Label** (`/src/components/ui/label.tsx`)
    - Form label component

11. **Separator** (`/src/components/ui/separator.tsx`)
    - Horizontal and vertical dividers

12. **Sonner** (`/src/components/ui/sonner.tsx`)
    - Toast notifications (modern replacement for deprecated toast)

13. **Dropdown Menu** (`/src/components/ui/dropdown-menu.tsx`)
    - Context menus and dropdown actions
    - Full suite of dropdown components

## Theme Configuration

### Custom FuelFoods Theme
A custom theme has been configured specifically for the health food/CPG industry:

#### Color Palette
- **Primary**: Fresh green (#22c55e) - represents health, growth, and nature
- **Secondary**: Warm cream/yellow (#fef3c7) - adds warmth and natural feel
- **Accent Colors**: 
  - Success: #10b981 (green)
  - Warning: #f59e0b (amber)
  - Error: #ef4444 (red)
  - Info: #3b82f6 (blue)

#### CSS Variables (in `/src/app/globals.css`)
```css
:root {
  --primary: 142 76% 36%; /* Fresh green */
  --secondary: 48 96% 89%; /* Light yellow/cream */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... additional theme variables */
}
```

### Dark Mode Support
- Configured with class-based dark mode
- Earthy tones for dark theme that maintain brand consistency

## File Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── index.ts              # Barrel export file
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── tabs.tsx
│   │   ├── carousel.tsx
│   │   ├── select.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   ├── sonner.tsx
│   │   └── dropdown-menu.tsx
│   └── examples/
│       └── ShadcnShowcase.tsx    # Example usage component
├── lib/
│   ├── utils.ts                  # Contains cn() utility
│   └── theme.ts                  # FuelFoods theme configuration
└── app/
    └── globals.css               # Theme CSS variables
```

## Configuration Files

### `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### `tailwind.config.ts`
- Configured with shadcn/ui requirements
- Extended color palette for health food branding
- Custom animations and border radius
- Dark mode support

## Usage Examples

### Basic Button Usage
```tsx
import { Button } from '@/components/ui/button';

<Button>Click me</Button>
<Button variant="outline">Outline Button</Button>
<Button size="lg">Large Button</Button>
```

### Product Card Example
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

<Card>
  <CardHeader>
    <CardTitle>Organic Microgreens</CardTitle>
    <CardDescription>Fresh, nutrient-dense superfoods</CardDescription>
  </CardHeader>
  <CardContent>
    <Badge variant="secondary">Organic</Badge>
    <p className="text-2xl font-bold text-primary">$29.99</p>
  </CardContent>
</Card>
```

### Importing Components
Use the barrel export for clean imports:
```tsx
import { Button, Card, CardContent, Badge } from '@/components/ui';
```

## Integration with Existing Components
- The home page (`/src/app/page.tsx`) has been updated to demonstrate shadcn/ui integration
- Components use the custom FuelFoods color scheme
- Icons from Lucide React enhance the visual design

## Benefits for FuelFoods CPG
1. **Consistent Design**: Professional, cohesive UI components
2. **Accessibility**: Built on Radix UI primitives with excellent a11y
3. **Performance**: Optimized components with minimal bundle impact
4. **Flexibility**: Easy to customize and extend
5. **Developer Experience**: TypeScript support, great documentation
6. **Brand Alignment**: Custom theme reflects health/organic food industry

## Next Steps
1. Implement product listing pages using Card components
2. Create forms using Input, Label, and Select components
3. Build navigation using NavigationMenu component
4. Add shopping cart functionality with Dialog components
5. Implement product carousels for featured items
6. Set up toast notifications for user feedback

## Maintenance
- Components are self-contained and can be updated individually
- Theme can be customized by modifying CSS variables in `globals.css`
- New components can be added using `npx shadcn@latest add [component-name]`