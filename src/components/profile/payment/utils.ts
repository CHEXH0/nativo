
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
