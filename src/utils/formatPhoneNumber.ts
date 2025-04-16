export const formatPhoneNumber = (input: string): string => {
  const digits = input.replace(/\D/g, '');

  // Remove +380 if user manually typed it
  const nationalNumber = digits.replace(/^380/, '');

  let formatted = '+380(';

  if (nationalNumber.length > 0) {
    formatted += nationalNumber.substring(0, 2);
  }
  if (nationalNumber.length >= 2) {
    formatted += ') ';
    formatted += nationalNumber.substring(2, 5);
  }
  if (nationalNumber.length >= 5) {
    formatted += '-';
    formatted += nationalNumber.substring(5, 7);
  }
  if (nationalNumber.length >= 7) {
    formatted += '-';
    formatted += nationalNumber.substring(7, 9);
  }

  return formatted;
};
