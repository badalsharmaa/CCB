/**
 * Escapes HTML to prevent XSS attacks.
 */
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Checks if a string is "readable" or looks like gibberish.
 * Checks for consonant clusters, vowel presence, and random typing patterns.
 */
export const isReadable = (text: string): boolean => {
  if (!text || text.length < 3) return true;

  // 1. Check for vowels (simple heuristic)
  const hasVowels = /[aeiouyAEIOUY]/.test(text);
  if (!hasVowels && text.length > 5) return false;

  // 2. Check for long consonant clusters (e.g., "sdfghjkl")
  const maxConsonants = 5;
  const consonantClusters = text.match(/[^aeiouyAEIOUY\s]{5,}/g);
  if (consonantClusters) return false;

  // 3. Check for repeating characters (e.g., "aaaaaaa")
  const repeatingChars = /(.)\1{4,}/.test(text);
  if (repeatingChars) return false;

  // 4. Check for random-looking patterns (e.g., "asdf", "qwerty")
  const commonPatterns = ["asdf", "qwerty", "zxcv", "1234"];
  if (commonPatterns.some(p => text.toLowerCase().includes(p))) return false;

  return true;
};

/**
 * Validates an email address.
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validates name length.
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

/**
 * Validates message length.
 */
export const isValidMessage = (message: string): boolean => {
  return message.trim().length >= 20 && message.trim().length <= 500;
};
