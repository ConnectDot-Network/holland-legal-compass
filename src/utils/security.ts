
// URL validation for webhook endpoints
export const validateWebhookUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL jest wymagany' };
  }

  // Trim whitespace
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) {
    return { isValid: false, error: 'URL nie może być pusty' };
  }

  try {
    const parsedUrl = new URL(trimmedUrl);
    
    // Only allow HTTPS
    if (parsedUrl.protocol !== 'https:') {
      return { isValid: false, error: 'Tylko URL HTTPS są dozwolone' };
    }

    // Block private IP ranges
    const hostname = parsedUrl.hostname;
    if (isPrivateIP(hostname)) {
      return { isValid: false, error: 'Prywatne adresy IP nie są dozwolone' };
    }

    // Block localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return { isValid: false, error: 'Localhost nie jest dozwolony' };
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Nieprawidłowy format URL' };
  }
};

// Check if IP is in private ranges
const isPrivateIP = (hostname: string): boolean => {
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./,
    /^::1$/,
    /^fc00:/,
    /^fe80:/
  ];

  return privateRanges.some(range => range.test(hostname));
};

// Input sanitization
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>]/g, ''); // Basic XSS prevention
};

// Validate category against allowed values
export const isValidCategory = (category: string, allowedCategories: readonly string[]): boolean => {
  return allowedCategories.includes(category);
};

// Validate language against allowed values
export const isValidLanguage = (language: string, allowedLanguages: readonly string[]): boolean => {
  return allowedLanguages.includes(language);
};

// Rate limiting helper (client-side tracking)
export const checkRateLimit = (key: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const windowKey = `${key}_${Math.floor(now / windowMs)}`;
  
  const stored = localStorage.getItem(windowKey);
  const count = stored ? parseInt(stored) : 0;
  
  if (count >= maxRequests) {
    return false;
  }
  
  localStorage.setItem(windowKey, (count + 1).toString());
  
  // Clean up old entries
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`${key.split('_')[0]}_`)) {
      const timestamp = parseInt(key.split('_')[1]);
      if (now - timestamp * windowMs > windowMs * 2) {
        localStorage.removeItem(key);
      }
    }
  }
  
  return true;
};
