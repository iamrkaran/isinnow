// Function to validate an ISIN
export const validateISIN = (isin: string): boolean => {
  if (!/^[A-Z]{2}[A-Z0-9]{9}[0-9]$/.test(isin)) return false;

  const converted = isin
    .slice(0, -1)
    .replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString())
    .split("")
    .reverse();

  const checkSum = converted.reduce((sum, char, index) => {
    let num = parseInt(char, 10);
    if (index % 2 === 0) num *= 2;
    return sum + (num > 9 ? num - 9 : num);
  }, 0);

  const checkDigit = parseInt(isin.slice(-1), 10);
  return (checkSum + checkDigit) % 10 === 0;
};

// Function to fix an ISIN
export const fixISIN = (isin: string): string | null => {
  if (!/^[A-Z]{2}[A-Z0-9]{9}[0-9]?$/.test(isin)) return null;

  const base = isin
    .slice(0, 11)
    .replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString())
    .split("")
    .reverse();

  const total = base.reduce((sum, char, index) => {
    let num = parseInt(char, 10);
    if (index % 2 === 0) num *= 2;
    return sum + (num > 9 ? num - 9 : num);
  }, 0);

  const checkDigit = (10 - (total % 10)) % 10;
  return isin.slice(0, 11) + checkDigit;
};

export const generateISIN = (countryCode: string, securityType: string): string => {
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new Error('Invalid country code');
  }

  // Generate random alphanumeric string for the security identifier
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let identifier = securityType.substring(0, 1).toUpperCase();
  
  for (let i = 0; i < 8; i++) {
    identifier += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const baseISIN = `${countryCode}${identifier}`;
  return fixISIN(baseISIN + '0') || baseISIN + '0'; // Add temporary check digit for fixing
};