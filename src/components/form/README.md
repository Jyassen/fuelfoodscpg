# FuelFoods Form Components

A comprehensive set of reusable form components designed specifically for the FuelFoods checkout system. These components match the existing FuelFoods design language with green color scheme (`#178641`), rounded buttons, and professional accessibility features.

## Components Overview

### 🎯 FormField

Versatile input component supporting text, email, tel, select, and textarea fields.

**Features:**

- Multiple input types (text, email, tel, password, etc.)
- Select dropdowns with custom options
- Textarea with configurable rows
- Built-in validation states (error, success)
- Loading states with spinner
- Required field indicators
- Accessible ARIA labels and descriptions
- Helper text support

**Usage:**

```tsx
import { FormField } from '@/components/form';

// Basic text input
<FormField
  label="Full Name"
  placeholder="Enter your name"
  required
  helperText="This will appear on your delivery"
/>

// Email with validation
<FormField
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  success={email && !errors.email ? 'Valid email' : ''}
  required
/>

// Select dropdown
<FormField
  label="State"
  fieldType="select"
  value={state}
  onChange={(e) => setState(e.target.value)}
  options={[
    { value: '', label: 'Select a state' },
    { value: 'NY', label: 'New York' },
    { value: 'CA', label: 'California' }
  ]}
  required
/>

// Textarea
<FormField
  label="Special Instructions"
  fieldType="textarea"
  rows={4}
  placeholder="Any delivery notes..."
  helperText="Optional delivery preferences"
/>
```

### 🔘 Button

Enhanced button component with multiple variants and loading states.

**Variants:**

- `primary` - FuelFoods green primary button
- `secondary` - Gray secondary button
- `outline` - Green outline button
- `destructive` - Red destructive button
- `ghost` - Transparent ghost button
- `orange` - Orange accent button
- `yellow` - Yellow accent button

**Features:**

- Loading states with spinner
- Icon support (left/right)
- Multiple sizes (sm, default, lg, xl)
- Full width option
- Hover animations and focus states
- Disabled states

**Usage:**

```tsx
import { Button } from '@/components/form';
import { ShoppingCart } from 'lucide-react';

// Primary button
<Button variant="primary" size="lg">
  Order Now
</Button>

// Loading state
<Button
  loading={isSubmitting}
  loadingText="Processing..."
  onClick={handleSubmit}
>
  Complete Order
</Button>

// With icons
<Button
  leftIcon={<ShoppingCart />}
  variant="outline"
>
  Add to Cart
</Button>

// Full width
<Button fullWidth variant="secondary">
  Cancel
</Button>
```

### 📋 FormSection

Wrapper component for organizing form sections with headers.

**Features:**

- Multiple visual variants (default, elevated, minimal, card)
- Optional icons and header actions
- Required field indicators
- Flexible header styling
- Responsive design

**Usage:**

```tsx
import { FormSection } from '@/components/form';
import { User, CreditCard } from 'lucide-react';

<FormSection
  variant="elevated"
  title="Personal Information"
  description="Tell us about yourself"
  icon={<User />}
  required
  headerVariant="accent"
>
  {/* Form fields go here */}
  <FormField label="Name" required />
  <FormField label="Email" type="email" required />
</FormSection>

<FormSection
  title="Payment Details"
  icon={<CreditCard />}
  headerAction={
    <Button variant="ghost" size="sm">Edit</Button>
  }
>
  {/* Payment fields */}
</FormSection>
```

### ✅ ValidationMessage

Accessible validation and feedback messages.

**Types:**

- `error` - Red error messages
- `success` - Green success messages
- `warning` - Orange warning messages
- `info` - Blue informational messages

**Features:**

- Icons for each message type
- Custom icon support
- Multiple variants (default, minimal, inline)
- ARIA live regions for screen readers

**Usage:**

```tsx
import { ValidationMessage } from '@/components/form';

<ValidationMessage
  type="error"
  message="Please enter a valid email address"
/>

<ValidationMessage
  type="success"
  message="Email address verified successfully"
/>

<ValidationMessage
  type="info"
  message="We'll never share your information"
  variant="minimal"
/>
```

### ⏳ LoadingSpinner

Flexible loading indicators for async operations.

**Features:**

- Multiple sizes (sm, default, lg, xl)
- Color variants (default, white, gray, current)
- Full-screen overlay option
- Preset components for common use cases

**Usage:**

```tsx
import {
  LoadingSpinner,
  ButtonSpinner,
  PageSpinner,
  InlineSpinner
} from '@/components/form';

// Basic spinner
<LoadingSpinner size="lg" />

// Full-screen loading
<PageSpinner label="Loading checkout..." />

// Inline with text
<div className="flex items-center gap-2">
  <InlineSpinner />
  Processing payment...
</div>

// In buttons (automatically handled by Button component)
<Button loading>Submit</Button>
```

## Design System Integration

### Colors

The components use the FuelFoods color palette defined in `tailwind.config.ts`:

```tsx
fuelfoods: {
  green: {
    50: '#f0fdf4',   // Light backgrounds
    100: '#dcfce7',  // Subtle highlights
    500: '#178641',  // Primary brand color
    600: '#136834',  // Hover states
    700: '#0f5429',  // Active states
  }
}
```

### Typography

- Font weights: medium (500), semibold (600), bold (700)
- Consistent sizing: xs (12px), sm (14px), base (16px), lg (18px)
- Proper line heights for readability

### Spacing

- Consistent gap patterns: 2, 3, 4, 6, 8
- Form field heights: sm (32px), default (40px), lg (48px)
- Padding: internal (12px-24px), external (16px-32px)

## Accessibility Features

### ARIA Support

- Proper labeling with `aria-label` and `aria-labelledby`
- Error states with `aria-invalid`
- Live regions for dynamic content with `aria-live`
- Descriptive text with `aria-describedby`

### Keyboard Navigation

- Full keyboard support for all interactive elements
- Logical tab order
- Escape key support for dismissible components
- Enter/Space activation for buttons

### Screen Reader Support

- Semantic HTML structure
- Meaningful alternative text
- Status announcements for state changes
- Clear error messaging

### Visual Accessibility

- High contrast ratios (4.5:1 minimum)
- Focus indicators on all interactive elements
- No color-only information conveyance
- Readable font sizes and line heights

## Best Practices

### Form Validation

```tsx
// Real-time validation with debouncing
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = useCallback(
  debounce((value: string) => {
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }, 300),
  []
);

useEffect(() => {
  validateEmail(email);
}, [email, validateEmail]);

<FormField
  label="Email"
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  error={emailError}
  success={email && !emailError ? 'Valid email' : ''}
  required
/>;
```

### Loading States

```tsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await submitOrder();
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};

<Button
  loading={loading}
  loadingText="Processing order..."
  onClick={handleSubmit}
>
  Complete Purchase
</Button>;
```

### Form Structure

```tsx
<form onSubmit={handleSubmit}>
  <FormSection title="Contact Information" required>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="First Name" required />
      <FormField label="Last Name" required />
    </div>
    <FormField label="Email" type="email" required />
  </FormSection>

  <FormSection title="Delivery Address" required>
    <FormField label="Street Address" required />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <FormField label="City" required />
      <FormField label="State" fieldType="select" options={states} />
      <FormField label="ZIP Code" required />
    </div>
  </FormSection>

  <div className="flex justify-end gap-4">
    <Button variant="secondary" type="button">
      Cancel
    </Button>
    <Button type="submit" loading={submitting}>
      Place Order
    </Button>
  </div>
</form>
```

## Testing

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from '@/components/form';

test('displays error message when validation fails', () => {
  render(<FormField label="Email" error="Invalid email" />);

  expect(screen.getByText('Invalid email')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});
```

### Integration Testing

```tsx
test('form submission flow', async () => {
  render(<CheckoutForm />);

  // Fill in required fields
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });

  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  // Verify loading state
  expect(screen.getByText(/processing/i)).toBeInTheDocument();
});
```

## File Structure

```
src/components/form/
├── index.ts                 # Main exports
├── FormField.tsx           # Multi-purpose input component
├── Button.tsx              # Enhanced button component
├── FormSection.tsx         # Section wrapper component
├── ValidationMessage.tsx   # Validation feedback component
├── LoadingSpinner.tsx      # Loading indicators
└── README.md              # This documentation
```

## TypeScript Support

All components are fully typed with TypeScript, providing:

- IntelliSense autocompletion
- Type checking for props
- Generic support where applicable
- Proper event handler typing

```tsx
interface FormData {
  email: string;
  name: string;
  subscription: 'starter' | 'pro' | 'elite';
}

const [formData, setFormData] = useState<FormData>({
  email: '',
  name: '',
  subscription: 'pro',
});

// Type-safe form handling
const handleFieldChange = <K extends keyof FormData>(
  field: K,
  value: FormData[K]
) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

This comprehensive form component library provides everything needed to build consistent, accessible, and professional checkout experiences that match the FuelFoods brand identity.
