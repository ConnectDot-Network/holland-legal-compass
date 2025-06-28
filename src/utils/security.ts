
export const validateWebhookUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url.trim()) {
    return { isValid: false, error: "URL nie może być pusty" };
  }

  try {
    const urlObj = new URL(url);
    
    // Only allow HTTPS URLs
    if (urlObj.protocol !== 'https:') {
      return { isValid: false, error: "Dozwolone są tylko URL-e HTTPS" };
    }

    // Block localhost and private IP ranges
    const hostname = urlObj.hostname.toLowerCase();
    if (hostname === 'localhost' || 
        hostname === '127.0.0.1' || 
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')) {
      return { isValid: false, error: "Lokalne i prywatne adresy IP są zabronione" };
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: "Nieprawidłowy format URL" };
  }
};

export const sanitizeInput = (input: string, maxLength: number = 5000): string => {
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

export const isValidCategory = (category: string, validCategories: string[]): boolean => {
  return validCategories.includes(category);
};

export const isValidLanguage = (language: string, validLanguages: string[]): boolean => {
  return validLanguages.includes(language);
};
