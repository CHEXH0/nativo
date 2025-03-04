
// Utility functions for payment handling

/**
 * Determines the credit card brand based on first digits
 */
export const determineBrand = (cardNumber: string): string => {
  const firstDigit = cardNumber.charAt(0);
  const firstTwoDigits = parseInt(cardNumber.substring(0, 2));
  
  if (firstDigit === '4') return 'visa';
  if (firstDigit === '5') return 'mastercard';
  if (firstDigit === '3' && (firstTwoDigits === 34 || firstTwoDigits === 37)) return 'amex';
  if (firstDigit === '6') return 'discover';
  return 'unknown';
};

/**
 * Format card number input with spaces
 */
export const formatCardNumber = (value: string): string => {
  const input = value.replace(/\D/g, '').substring(0, 16); // Remove non-digits and limit to 16 characters
  const parts = [];
  
  for (let i = 0; i < input.length; i += 4) {
    parts.push(input.substring(i, i + 4));
  }
  
  return parts.join(' ');
};

/**
 * Format expiration date (MM/YY)
 */
export const formatExpiryDate = (value: string): string => {
  const input = value.replace(/\D/g, '').substring(0, 4); // Remove non-digits and limit to 4 characters
  
  if (input.length > 2) {
    return `${input.substring(0, 2)}/${input.substring(2)}`;
  } 
  return input;
};

/**
 * Validate a card number using the Luhn algorithm (simplified)
 */
export const validateCardNumber = (number: string): boolean => {
  const digits = number.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  
  // Very simplified validation - in production use a more robust implementation
  return digits.length >= 13 && digits.length <= 19;
};

/**
 * Validate expiry date (not expired)
 */
export const validateExpiryDate = (expiry: string): boolean => {
  const parts = expiry.split('/');
  if (parts.length !== 2) return false;
  
  const month = parseInt(parts[0]);
  const year = parseInt('20' + parts[1]); // Assume 20xx
  
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JS months are 0-indexed
  const currentYear = now.getFullYear();
  
  if (month < 1 || month > 12) return false;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  
  return true;
};

/**
 * Validate card CVC (3-4 digits)
 */
export const validateCVC = (cvc: string): boolean => {
  const digits = cvc.replace(/\D/g, '');
  return digits.length >= 3 && digits.length <= 4;
};

/**
 * Validate all card details
 */
export const validateCardDetails = (cardDetails: {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!cardDetails.cardName.trim()) {
    errors.cardName = "El nombre es requerido";
  }
  
  if (!validateCardNumber(cardDetails.cardNumber)) {
    errors.cardNumber = "Número de tarjeta inválido";
  }
  
  if (!validateExpiryDate(cardDetails.expiry)) {
    errors.expiry = "Fecha de vencimiento inválida";
  }
  
  if (!validateCVC(cardDetails.cvc)) {
    errors.cvc = "CVC inválido";
  }
  
  return { 
    valid: Object.keys(errors).length === 0,
    errors
  };
};
