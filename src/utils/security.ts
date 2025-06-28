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

// Enhanced input sanitization with comprehensive XSS protection
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input.trim().substring(0, maxLength);
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove potentially dangerous HTML tags
  const dangerousTags = [
    'script', 'object', 'embed', 'form', 'input', 'button', 'select', 
    'textarea', 'iframe', 'frame', 'frameset', 'meta', 'link', 'style'
  ];
  
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });
  
  // Remove event handlers (onclick, onload, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^>\s]+/gi, '');
  
  // Remove javascript: and data: URLs
  sanitized = sanitized.replace(/javascript\s*:/gi, '');
  sanitized = sanitized.replace(/data\s*:/gi, '');
  
  // Remove vbscript: URLs
  sanitized = sanitized.replace(/vbscript\s*:/gi, '');
  
  // Encode remaining potentially dangerous characters
  sanitized = sanitized.replace(/[<>]/g, (match) => {
    return match === '<' ? '&lt;' : '&gt;';
  });
  
  return sanitized;
};

// Enhanced file validation with security checks
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { isValid: false, error: 'Plik za duży (max 10MB)' };
  }

  // Allowed MIME types
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Nieprawidłowy typ pliku' };
  }

  // Check file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase();
  const typeExtensionMap: Record<string, string[]> = {
    'application/pdf': ['pdf'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
    'application/msword': ['doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
    'text/plain': ['txt']
  };

  const allowedExtensions = typeExtensionMap[file.type];
  if (!extension || !allowedExtensions?.includes(extension)) {
    return { isValid: false, error: 'Rozszerzenie pliku nie pasuje do typu' };
  }

  // Check for suspicious file names
  const suspiciousPatterns = [
    /\.exe$/i, /\.bat$/i, /\.cmd$/i, /\.scr$/i, /\.com$/i,
    /\.pif$/i, /\.vbs$/i, /\.js$/i, /\.jar$/i, /\.php$/i
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(file.name))) {
    return { isValid: false, error: 'Podejrzany typ pliku' };
  }

  return { isValid: true };
};

// Validate category against allowed values
export const isValidCategory = (category: string, allowedCategories: readonly string[]): boolean => {
  return allowedCategories.includes(category);
};

// Validate language against allowed values
export const isValidLanguage = (language: string, allowedLanguages: readonly string[]): boolean => {
  return allowedLanguages.includes(language);
};

// Enhanced rate limiting with better tracking
export const checkRateLimit = (key: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const windowKey = `rateLimit_${key}_${Math.floor(now / windowMs)}`;
  
  try {
    const stored = localStorage.getItem(windowKey);
    const count = stored ? parseInt(stored, 10) : 0;
    
    if (isNaN(count) || count >= maxRequests) {
      return false;
    }
    
    localStorage.setItem(windowKey, (count + 1).toString());
    
    // Clean up old entries (keep only current and previous window)
    const currentWindow = Math.floor(now / windowMs);
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const storageKey = localStorage.key(i);
      if (storageKey && storageKey.startsWith(`rateLimit_${key}_`)) {
        const windowNumber = parseInt(storageKey.split('_')[2], 10);
        if (!isNaN(windowNumber) && windowNumber < currentWindow - 1) {
          localStorage.removeItem(storageKey);
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Rate limiting error:', error);
    return false; // Fail secure
  }
};

// Security headers validation
export const validateSecurityHeaders = (response: Response): boolean => {
  const contentType = response.headers.get('content-type');
  return contentType ? contentType.includes('application/json') : false;
};

// Log security events (client-side logging)
export const logSecurityEvent = (event: string, details: Record<string, any> = {}): void => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  console.warn('[SECURITY EVENT]', logEntry);
  
  // Store in sessionStorage for debugging (limited storage)
  try {
    const existingLogs = sessionStorage.getItem('securityLogs');
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    logs.push(logEntry);
    
    // Keep only last 50 entries
    if (logs.length > 50) {
      logs.splice(0, logs.length - 50);
    }
    
    sessionStorage.setItem('securityLogs', JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};
