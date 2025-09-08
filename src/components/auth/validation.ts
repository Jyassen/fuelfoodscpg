/**
 * Authentication form validation utilities
 * Provides comprehensive validation for email, password, and other auth fields
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errors?: string[];
  strength?: 'weak' | 'medium' | 'strong';
}

/**
 * Validates email address format and common patterns
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!email.trim()) {
    return { isValid: false, error: 'Email cannot be empty' };
  }

  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Check for common typos
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (domain) {
    const typoPatterns = [
      { pattern: 'gmial.com', suggestion: 'gmail.com' },
      { pattern: 'gmai.com', suggestion: 'gmail.com' },
      { pattern: 'yahooo.com', suggestion: 'yahoo.com' },
      { pattern: 'hotmial.com', suggestion: 'hotmail.com' }
    ];
    
    const typo = typoPatterns.find(t => t.pattern === domain);
    if (typo) {
      return {
        isValid: false,
        error: `Did you mean ${email.replace(domain, typo.suggestion)}?`
      };
    }
  }

  return { isValid: true };
};

/**
 * Validates password strength and security requirements
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Common password patterns to avoid
  const commonPatterns = [
    'password',
    '12345678',
    'qwertyui',
    'asdfghjk',
    'zxcvbnmk',
    '11111111',
    '00000000'
  ];

  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    errors.push('Password contains common patterns that are easily guessed');
  }

  // Sequential characters check
  let hasSequential = false;
  for (let i = 0; i < password.length - 2; i++) {
    const char1 = password.charCodeAt(i);
    const char2 = password.charCodeAt(i + 1);
    const char3 = password.charCodeAt(i + 2);
    
    if (char2 === char1 + 1 && char3 === char2 + 1) {
      hasSequential = true;
      break;
    }
  }
  
  if (hasSequential) {
    errors.push('Avoid sequential characters (e.g., abc, 123)');
  }

  // Determine password strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  if (password.length >= 16) score++;
  if (!hasSequential && !commonPatterns.some(p => password.toLowerCase().includes(p))) score++;

  if (score >= 6) {
    strength = 'strong';
  } else if (score >= 4) {
    strength = 'medium';
  }

  if (errors.length > 0) {
    return { isValid: false, errors, strength };
  }

  return { isValid: true, strength };
};

/**
 * Validates phone number format
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: true }; // Phone is optional
  }

  // Remove all non-digits
  const digitsOnly = phone.replace(/\D/g, '');
  
  // US phone number should be 10 digits (not including country code)
  if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
    return { isValid: false, error: 'Phone number must be 10 digits' };
  }

  // If 11 digits, first digit should be 1 (US country code)
  if (digitsOnly.length === 11 && !digitsOnly.startsWith('1')) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  return { isValid: true };
};

/**
 * Validates name fields (first name, last name)
 */
export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  if (!name || !name.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.trim().length < 1) {
    return { isValid: false, error: `${fieldName} must be at least 1 character` };
  }

  if (name.length > 50) {
    return { isValid: false, error: `${fieldName} must be less than 50 characters` };
  }

  // Only allow letters, spaces, hyphens, and apostrophes
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }

  return { isValid: true };
};

/**
 * Validates password confirmation
 */
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Password confirmation is required' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true };
};

/**
 * Formats phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  
  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    const tenDigits = digitsOnly.slice(1);
    return `+1 (${tenDigits.slice(0, 3)}) ${tenDigits.slice(3, 6)}-${tenDigits.slice(6)}`;
  }
  
  return phone;
};

/**
 * Sanitizes user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Comprehensive form validation
 */
export const validateAuthForm = (formData: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
}, isRegistration: boolean = false): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  // Email validation
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error || 'Invalid email';
  }
  
  // Password validation
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors?.[0] || 'Invalid password';
  }
  
  if (isRegistration) {
    // First name validation
    if (formData.firstName !== undefined) {
      const firstNameValidation = validateName(formData.firstName, 'First name');
      if (!firstNameValidation.isValid) {
        errors.firstName = firstNameValidation.error || 'Invalid first name';
      }
    }
    
    // Last name validation
    if (formData.lastName !== undefined) {
      const lastNameValidation = validateName(formData.lastName, 'Last name');
      if (!lastNameValidation.isValid) {
        errors.lastName = lastNameValidation.error || 'Invalid last name';
      }
    }
    
    // Phone validation
    if (formData.phone !== undefined) {
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.isValid) {
        errors.phone = phoneValidation.error || 'Invalid phone number';
      }
    }
    
    // Password confirmation validation
    if (formData.confirmPassword !== undefined) {
      const confirmValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword);
      if (!confirmValidation.isValid) {
        errors.confirmPassword = confirmValidation.error || 'Passwords do not match';
      }
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the Terms of Service';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};