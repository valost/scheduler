export const formatPhoneNumber = (input: string): string => {
  const digits = input.replace(/\D/g, '').replace(/^380/, '');

  let formatted = '+380';

  if (digits.length > 0) {
    formatted += digits.substring(0, 2);
  }
  if (digits.length >= 2) {
    formatted += ') ';
    formatted += digits.substring(2, 5);
  }
  if (digits.length >= 5) {
    formatted += '-';
    formatted += digits.substring(5, 7);
  }
  if (digits.length >= 7) {
    formatted += '-';
    formatted += digits.substring(7, 9);
  }

  return formatted;
};
